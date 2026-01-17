import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Float, Center, Sparkles } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

interface ThreeViewerProps {
    imageUrl: string
    alt: string
}

function ImagePlane({ imageUrl }: { imageUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Load texture
    // Note: In a real app we would handle loading state better or use useTexture from drei
    // but useLoader(TextureLoader) is standard.
    const texture = useLoader(THREE.TextureLoader, imageUrl)

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        }
    })

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[3, 3]} />
            <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} />
        </mesh>
    )
}

function LoadingSpinner() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="lime" wireframe />
        </mesh>
    )
}

export function ThreeViewer({ imageUrl }: ThreeViewerProps) {
    return (
        <div className="h-[300px] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Suspense fallback={<LoadingSpinner />}>
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Center>
                            <ImagePlane imageUrl={imageUrl} />
                        </Center>
                    </Float>
                </Suspense>

                <Sparkles count={50} scale={5} size={2} speed={0.4} opacity={0.5} color="#BFFF00" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
            <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                <span className="text-xs font-bold px-2 py-1 bg-white/50 rounded-full backdrop-blur-sm">3D VIEW</span>
            </div>
        </div>
    )
}
