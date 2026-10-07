import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import SceneryBackdrop from './SceneryBackdrop';
import ProjectCard from './ProjectCard';
import SkillBadge from './SkillBadge';
import SchoolChair from './SchoolChair';
import PaperAirplane from './PaperAirplane';
import ContactTerminal from './ContactTerminal';
import { projectsData } from '../data/projectsData';
import { driftAudio } from '../utils/audioSynth';

export default function SonnyScene({ 
  onInspectProject, 
  onRunProject,
  zeroGEnabled,
  scatterTrigger,
  recallTrigger,
  onOpenAbout
}) {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const itemsRef = useRef({}); // maps id -> { body, el, initialPos }
  const dragRef = useRef({ activeId: null, startX: 0, startY: 0, hasMoved: false, history: [] });

  // Skill items with colors and icons matching the Sonny Boy aesthetic
  const skills = [
    { id: 'skill-python', name: 'Python', icon: '🐍', color: 'bg-[#FEF08A]' },
    { id: 'skill-js', name: 'JavaScript', icon: '🌐', color: 'bg-[#FDE047]' },
    { id: 'skill-cpp', name: 'C++', icon: '🛠️', color: 'bg-[#E2E8F0]' },
    { id: 'skill-linux', name: 'Linux', icon: '🐧', color: 'bg-[#FFFDF7]' },
    { id: 'skill-sql', name: 'SQL', icon: '💾', color: 'bg-[#BAE6FD]' },
    { id: 'skill-git', name: 'Git', icon: '🎋', color: 'bg-[#BBF7D0]' },
  ];

  useEffect(() => {
    const { Engine, World, Bodies, Body } = Matter;
    const engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0 } // Sonny Boy Anti-Gravity!
    });
    engineRef.current = engine;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Viewport Boundaries (Elastic Bounce Walls)
    const wallOptions = { isStatic: true, restitution: 0.85, friction: 0.1 };
    const pad = 80;
    const walls = [
      Bodies.rectangle(width / 2, -pad, width * 2, pad * 2, wallOptions),
      Bodies.rectangle(width / 2, height + pad, width * 2, pad * 2, wallOptions),
      Bodies.rectangle(-pad, height / 2, pad * 2, height * 2, wallOptions),
      Bodies.rectangle(width + pad, height / 2, pad * 2, height * 2, wallOptions),
    ];
    World.add(engine.world, walls);

    // Initial Anchor Coordinates matching the user's reference image
    const initialConfig = {
      // Project Cards
      'card-dimensional-router': { x: width * 0.36, y: height * 0.38, w: 235, h: 290, angle: -0.07 },
      'card-compass-cli': { x: width * 0.63, y: height * 0.42, w: 235, h: 290, angle: 0.05 },
      'card-drift-consensus': { x: width * 0.90, y: height * 0.42, w: 230, h: 290, angle: 0.09 },
      'card-void-log': { x: width * 0.24, y: height * 0.82, w: 230, h: 290, angle: -0.12 },

      // School Chairs
      'chair-1': { x: width * 0.15, y: height * 0.34, w: 100, h: 130, angle: -0.22 },
      'chair-2': { x: width * 0.19, y: height * 0.58, w: 100, h: 130, angle: 0.14 },
      'chair-3': { x: width * 0.82, y: height * 0.53, w: 100, h: 130, angle: -0.18 },

      // Paper Airplane
      'airplane': { x: width * 0.77, y: height * 0.20, w: 100, h: 70, angle: -0.25 },

      // Skill Badges with coiled springs
      'skill-python': { x: width * 0.51, y: height * 0.26, w: 110, h: 75, angle: 0.04 },
      'skill-js': { x: width * 0.39, y: height * 0.67, w: 125, h: 75, angle: -0.06 },
      'skill-cpp': { x: width * 0.48, y: height * 0.73, w: 100, h: 75, angle: 0.02 },
      'skill-linux': { x: width * 0.58, y: height * 0.73, w: 105, h: 75, angle: -0.03 },
      'skill-sql': { x: width * 0.31, y: height * 0.87, w: 95, h: 75, angle: 0.08 },
      'skill-git': { x: width * 0.66, y: height * 0.82, w: 95, h: 75, angle: -0.07 },

      // Contact Terminal
      'contact-terminal': { x: width * 0.84, y: height * 0.84, w: 280, h: 320, angle: 0.02 }
    };

    // Instantiate Matter.js Bodies for all interactive objects
    Object.keys(initialConfig).forEach((id) => {
      const cfg = initialConfig[id];
      const body = Bodies.rectangle(cfg.x, cfg.y, cfg.w, cfg.h, {
        angle: cfg.angle,
        restitution: 0.88,
        frictionAir: 0.007,
        friction: 0.05,
        density: 0.001,
      });

      World.add(engine.world, body);
      itemsRef.current[id] = {
        body,
        initialPos: { ...cfg },
      };
    });

    // Main Physics Animation & DOM Synchronization Loop
    let animationFrameId;
    let time = 0;

    const renderLoop = () => {
      time += 0.02;
      Engine.update(engine, 1000 / 60);

      // Apply subtle ambient Sonny Boy zero-g drift forces
      if (zeroGEnabled) {
        Object.keys(itemsRef.current).forEach((id, idx) => {
          const { body } = itemsRef.current[id];
          if (dragRef.current.activeId === id) return;

          // Harmonic floating waves
          const fx = Math.sin(time * 0.8 + idx * 1.5) * 0.00018;
          const fy = Math.cos(time * 0.6 + idx * 1.2) * 0.00018;
          const torque = Math.sin(time * 0.4 + idx) * 0.00004;

          Body.applyForce(body, body.position, { x: fx, y: fy });
          body.torque += torque;
        });
      }

      // Sync DOM elements to Matter.js bodies
      Object.keys(itemsRef.current).forEach((id) => {
        const item = itemsRef.current[id];
        if (!item || !item.el) return;

        const { position, angle } = item.body;
        const cfg = initialConfig[id] || { w: 100, h: 100 };
        const left = position.x - cfg.w / 2;
        const top = position.y - cfg.h / 2;

        item.el.style.transform = `translate3d(${left}px, ${top}px, 0) rotate(${angle}rad)`;
      });

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // Resize Handler: Keep walls and objects within new boundaries
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      Body.setPosition(walls[0], { x: newW / 2, y: -pad });
      Body.setPosition(walls[1], { x: newW / 2, y: newH + pad });
      Body.setPosition(walls[2], { x: -pad, y: newH / 2 });
      Body.setPosition(walls[3], { x: newW + pad, y: newH / 2 });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  // Water-like Pointer Repulsion Disturbance
  const handlePointerMoveDisturbance = (e) => {
    if (dragRef.current.activeId) return; // Don't disturb during active grab
    const mx = e.clientX;
    const my = e.clientY;

    Object.keys(itemsRef.current).forEach((id) => {
      const { body } = itemsRef.current[id];
      const dx = body.position.x - mx;
      const dy = body.position.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // If pointer is within 160px, apply smooth repellent fluid force
      if (dist < 160 && dist > 1) {
        const force = ((160 - dist) / 160) * 0.0006;
        const nx = dx / dist;
        const ny = dy / dist;
        Matter.Body.applyForce(body, body.position, {
          x: nx * force,
          y: ny * force
        });
      }
    });
  };

  // Drag & Fling Physics Interactions
  const startDrag = (id, e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined) return;

    dragRef.current = {
      activeId: id,
      startX: clientX,
      startY: clientY,
      hasMoved: false,
      history: [{ x: clientX, y: clientY, t: performance.now() }]
    };
  };

  useEffect(() => {
    const onPointerMove = (e) => {
      const { activeId, startX, startY, history } = dragRef.current;
      if (!activeId || !itemsRef.current[activeId]) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX === undefined) return;

      const dx = clientX - startX;
      const dy = clientY - startY;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragRef.current.hasMoved = true;
      }

      // Record velocity sample
      const now = performance.now();
      history.push({ x: clientX, y: clientY, t: now });
      if (history.length > 5) history.shift();

      const { body } = itemsRef.current[activeId];
      // Move body towards pointer with immediate responsiveness
      Matter.Body.setPosition(body, { x: clientX, y: clientY });
      Matter.Body.setVelocity(body, { x: 0, y: 0 });
    };

    const onPointerUp = () => {
      const { activeId, hasMoved, history } = dragRef.current;
      if (!activeId || !itemsRef.current[activeId]) {
        dragRef.current.activeId = null;
        return;
      }

      const { body } = itemsRef.current[activeId];

      if (hasMoved && history.length >= 2) {
        // Calculate fling momentum from the last 2 samples
        const last = history[history.length - 1];
        const prev = history[0];
        const dt = Math.max(last.t - prev.t, 16);
        const vx = ((last.x - prev.x) / dt) * 12;
        const vy = ((last.y - prev.y) / dt) * 12;

        Matter.Body.setVelocity(body, {
          x: Math.max(-25, Math.min(25, vx)),
          y: Math.max(-25, Math.min(25, vy))
        });
        driftAudio.playSpringBoing();
      }

      dragRef.current.activeId = null;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  // Handle Scatter Trigger (Burst of Zero-G Chaos)
  useEffect(() => {
    if (!scatterTrigger || !engineRef.current) return;
    driftAudio.playSpringBoing();

    Object.keys(itemsRef.current).forEach((id) => {
      const { body } = itemsRef.current[id];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 6;
      Matter.Body.setVelocity(body, {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3);
    });
  }, [scatterTrigger]);

  // Handle Recall Trigger (Smooth alignment back to showcase grid)
  useEffect(() => {
    if (!recallTrigger || !engineRef.current) return;
    driftAudio.playBlip(540, 'triangle', 0.2);

    Object.keys(itemsRef.current).forEach((id) => {
      const item = itemsRef.current[id];
      if (!item) return;

      const target = item.initialPos;
      // Animate smoothly to target
      Matter.Body.setPosition(item.body, { x: target.x, y: target.y });
      Matter.Body.setVelocity(item.body, { x: 0, y: 0 });
      Matter.Body.setAngle(item.body, target.angle);
      Matter.Body.setAngularVelocity(item.body, 0);
    });
  }, [recallTrigger]);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handlePointerMoveDisturbance}
      className="relative w-screen h-screen overflow-hidden select-none"
    >
      {/* Background Anime Sky, Clouds, Utility Pole, Rooftop Fence */}
      <SceneryBackdrop />

      {/* Physics Objects Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* Project Card 1: Dimensional Router */}
        <div
          ref={(el) => { if (itemsRef.current['card-dimensional-router']) itemsRef.current['card-dimensional-router'].el = el; }}
          onPointerDown={(e) => startDrag('card-dimensional-router', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform"
        >
          <ProjectCard
            project={projectsData[0]}
            onInspect={onInspectProject}
            onRun={onRunProject}
          />
        </div>

        {/* Project Card 2: Compass CLI */}
        <div
          ref={(el) => { if (itemsRef.current['card-compass-cli']) itemsRef.current['card-compass-cli'].el = el; }}
          onPointerDown={(e) => startDrag('card-compass-cli', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform"
        >
          <ProjectCard
            project={projectsData[1]}
            onInspect={onInspectProject}
            onRun={onRunProject}
          />
        </div>

        {/* Project Card 3: Drift Consensus */}
        <div
          ref={(el) => { if (itemsRef.current['card-drift-consensus']) itemsRef.current['card-drift-consensus'].el = el; }}
          onPointerDown={(e) => startDrag('card-drift-consensus', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform"
        >
          <ProjectCard
            project={projectsData[2]}
            onInspect={onInspectProject}
            onRun={onRunProject}
          />
        </div>

        {/* Project Card 4: Void Dev Log */}
        <div
          ref={(el) => { if (itemsRef.current['card-void-log']) itemsRef.current['card-void-log'].el = el; }}
          onPointerDown={(e) => startDrag('card-void-log', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform"
        >
          <ProjectCard
            project={projectsData[3]}
            onInspect={onInspectProject}
            onRun={onRunProject}
          />
        </div>

        {/* School Chairs */}
        <div
          ref={(el) => { if (itemsRef.current['chair-1']) itemsRef.current['chair-1'].el = el; }}
          onPointerDown={(e) => startDrag('chair-1', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing"
        >
          <SchoolChair rotation={-14} />
        </div>

        <div
          ref={(el) => { if (itemsRef.current['chair-2']) itemsRef.current['chair-2'].el = el; }}
          onPointerDown={(e) => startDrag('chair-2', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing"
        >
          <SchoolChair rotation={12} scale={0.92} />
        </div>

        <div
          ref={(el) => { if (itemsRef.current['chair-3']) itemsRef.current['chair-3'].el = el; }}
          onPointerDown={(e) => startDrag('chair-3', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing"
        >
          <SchoolChair rotation={-8} scale={0.88} />
        </div>

        {/* Paper Airplane */}
        <div
          ref={(el) => { if (itemsRef.current['airplane']) itemsRef.current['airplane'].el = el; }}
          onPointerDown={(e) => startDrag('airplane', e)}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing"
        >
          <PaperAirplane rotation={-15} scale={1.05} />
        </div>

        {/* Skill Badges with Coiled Springs */}
        {skills.map((skill) => (
          <div
            key={skill.id}
            ref={(el) => { if (itemsRef.current[skill.id]) itemsRef.current[skill.id].el = el; }}
            onPointerDown={(e) => startDrag(skill.id, e)}
            className="absolute top-0 left-0 pointer-events-auto will-change-transform"
          >
            <SkillBadge
              name={skill.name}
              icon={skill.icon}
              color={skill.color}
              onSpringClick={() => driftAudio.playSpringBoing()}
            />
          </div>
        ))}

        {/* Contact Terminal (Bottom Right, matching image) */}
        <div
          ref={(el) => { if (itemsRef.current['contact-terminal']) itemsRef.current['contact-terminal'].el = el; }}
          onPointerDown={(e) => {
            // Only drag if not interacting with inputs
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
              startDrag('contact-terminal', e);
            }
          }}
          className="absolute top-0 left-0 pointer-events-auto will-change-transform"
        >
          <ContactTerminal onSignalSent={() => {}} />
        </div>
      </div>
    </div>
  );
}
