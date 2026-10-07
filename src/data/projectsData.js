export const projectsData = [
  {
    id: "dimensional-router",
    title: "Dimensional Router",
    subtitle: "(C++ Network Engine)",
    tag: "C++20 / Networking",
    type: "engine",
    description: "High-throughput asynchronous packet routing engine built for low-latency drift navigation across parallel subnetworks. Features custom lock-free memory pools and SIMD-accelerated serialization.",
    code: `// DimensionalRouter.cpp
#include <iostream>
#include <vector>
#include <memory>
#include <chrono>

namespace DriftEngine {
    struct DimensionPacket {
        uint64_t packet_id;
        int32_t origin_dimension;
        int32_t target_dimension;
        float curvature_flux;
        char payload[256];
    };

    class DimensionalRouter {
    private:
        std::vector<DimensionPacket> routing_queue;
        bool zero_gravity_mode = true;

    public:
        void dispatch(const DimensionPacket& pkt) {
            std::cout << "[ROUTER] Transmitting packet #" << pkt.packet_id 
                      << " -> Dimension " << pkt.target_dimension 
                      << " (Flux: " << pkt.curvature_flux << ")" << std::endl;
        }

        void synchronizeState() {
            std::cout << "[SYNC] Reality consensus reached. 0 packets dropped." << std::endl;
        }
    };
}

int main() {
    DriftEngine::DimensionalRouter router;
    router.dispatch({1042, 0, 404, 0.982f, "NAGARA_TELEMETRY"});
    router.synchronizeState();
    return 0;
}`,
    logs: [
      "[INIT] Binding socket 0.0.0.0:8042 (Zero-G Mode: ACTIVE)",
      "[DIMENSION] Connected to Subnet-04 (Curvature: +1.42)",
      "[ROUTING] Packet #1042 dispatched -> Target: DIM_404",
      "[LATENCY] RTT 0.14ms | Memory alloc: 0 heap churn",
      "[STATUS] Dimensional convergence stable. Anti-gravity nominal."
    ]
  },
  {
    id: "compass-cli",
    title: "Compass CLI",
    subtitle: "(Python Engine)",
    tag: "Python 3.12 / CLI",
    type: "compass",
    description: "Algorithmic orientation tool for navigating the void. Reads magnetic distortion, calculates gravitational drift vectors, and guides developers back to reality using AST analysis.",
    code: `# compass_nav.py
import math
import time
import sys

class DriftCompass:
    def __init__(self, anchor_lat=26.9124, anchor_lon=75.7873):
        # Anchor set to Jaipur, India (JECRC University)
        self.anchor = (anchor_lat, anchor_lon)
        self.current_flux = 0.0
        
    def calculate_bearing(self, current_dim="VOID_01"):
        theta = math.sin(time.time() * 0.5) * 45.0
        bearing = (360.0 + theta) % 360.0
        return f"DIM: {current_dim} | BEARING: {bearing:.1f}° NNE | DRIFT: STABLE"

if __name__ == "__main__":
    compass = DriftCompass()
    print("=== NAGARA COMPASS CLI ===")
    print(compass.calculate_bearing())
    print(">> Seeking home coordinates: Jaipur (26.9124° N, 75.7873° E)...")`,
    logs: [
      "[CLI] Scanning dimensional flux...",
      "[SENSOR] Anomaly detected at vector [X: 12.4, Y: -89.1, Z: 0.0]",
      "[BEARING] Calibrated to True North (Magnetic declination: -0.4°)",
      "[LOCK] Home anchor locked: JECRC Jaipur Campus",
      "[COMPASS] Needle oriented. Safe trajectory computed."
    ]
  },
  {
    id: "drift-consensus",
    title: "Drift Consensus",
    subtitle: "(Distributed Sync)",
    tag: "Distributed Systems / Go",
    type: "consensus",
    description: "Byzantine fault-tolerant consensus state machine that maintains data consistency even when cluster nodes drift across disconnected parallel realities.",
    code: `// drift_raft.go
package main

import (
    "fmt"
    "time"
)

type NodeState int
const (
    Follower NodeState = iota
    Candidate
    Leader
    Drifting
)

type ConsensusEngine struct {
    Term       int
    State      NodeState
    QuorumSize int
}

func (e *ConsensusEngine) ElectLeader() {
    e.State = Leader
    e.Term++
    fmt.Printf("[RAFT] Node elected LEADER for Term %d across 4 dimensions\\n", e.Term)
}

func main() {
    engine := &ConsensusEngine{Term: 1, State: Candidate, QuorumSize: 3}
    engine.ElectLeader()
}`,
    logs: [
      "[QUORUM] 3/4 dimensional nodes responding",
      "[RAFT] Heartbeat broadcasted at interval 150ms",
      "[ELECTION] Term 4 validated with cryptographic proofs",
      "[DRIFT] Zero split-brain state anomalies detected"
    ]
  },
  {
    id: "void-log",
    title: "Void Dev Log",
    subtitle: "(Personal Portfolio)",
    tag: "React / Matter.js / C Basics",
    type: "portfolio",
    description: "Self-documenting engineering log created by Mohammad Rehan (1st Year B.Tech CSE at JECRC University). Built with anti-gravity physics, hand-drawn anime aesthetic, and real programming foundations.",
    code: `// VoidPortfolio.jsx
import { Engine, World, Bodies } from 'matter-js';

export function createZeroGravityDimension() {
    const engine = Engine.create({
        gravity: { x: 0, y: 0, scale: 0 } // Sonny Boy Anti-Gravity!
    });
    
    console.log("Welcome to Mohammad Rehan's Dev Dimension.");
    return engine;
}`,
    logs: [
      "[MOUNT] Anti-gravity physics engine initialized",
      "[STUDENT] Mohammad Rehan | 1st Year B.Tech CSE",
      "[ACADEMIC] JECRC University, Jaipur (2026 - Present)",
      "[STUDIES] C Programming, Logic, Algorithms, AI Foundations"
    ]
  }
];
