"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape({ position, color, speed, args, type }: any) {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = t * speed;
        mesh.current.rotation.y = t * speed * 0.5;
        mesh.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={mesh} position={position}>
                {type === "sphere" && <sphereGeometry args={args} />}
                {type === "torus" && <torusGeometry args={args} />}
                {type === "icosahedron" && <icosahedronGeometry args={args} />}
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4} // Strength, 0 disables the effect (default=1)
                    speed={2} // Speed (default=1)
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function Scene3DProfile() {
    return (
        <div className="absolute inset-0 -z-10 h-[50vh] w-full overflow-hidden pointer-events-none opacity-60">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <AnimatedShape
                    position={[-2, 0, 0]}
                    color="#4f46e5"
                    speed={0.2}
                    args={[0.8, 0.3, 16, 100]}
                    type="torus"
                />
                <AnimatedShape
                    position={[2, 0.5, 0]}
                    color="#8b5cf6"
                    speed={0.3}
                    args={[0.8, 0]}
                    type="icosahedron"
                />
                <AnimatedShape
                    position={[0, -1, -2]}
                    color="#06b6d4"
                    speed={0.1}
                    args={[0.6, 32, 32]}
                    type="sphere"
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
