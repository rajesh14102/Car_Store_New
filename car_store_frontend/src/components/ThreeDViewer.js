import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense, useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

const modelCache = new Map();

const Loader = () => (
  <Html center>
    <div style={{ color: '#bd8c44', fontFamily: 'Tagesschrift, sans-serif' }}>Loading 3D Model...</div>
  </Html>
);

const ThreeDViewer = ({ modelUrl, small }) => {
  const [model, setModel] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const loadModel = async () => {
      if (modelCache.has(modelUrl)) {
        setModel(modelCache.get(modelUrl));
        return;
      }

      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          if (!mountedRef.current) return;

          const scene = gltf.scene;

          // Center the model
          const box = new THREE.Box3().setFromObject(scene);
          const size = new THREE.Vector3();
          const center = new THREE.Vector3();
          box.getSize(size);
          box.getCenter(center);
          scene.position.sub(center);

          // Scale the model
          const maxDimension = Math.max(size.x, size.y, size.z);
          const scaleFactor = small ? 4 / maxDimension : 6 / maxDimension;
          scene.scale.setScalar(scaleFactor);
          scene.position.y = -0.5;

          // Rotate the model
          scene.rotation.y = small ? Math.PI / 2 : Math.PI / 0.6;

          modelCache.set(modelUrl, scene);
          setModel(scene);
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );
    };

    loadModel();

    return () => {
      mountedRef.current = false;
    };
  }, [modelUrl, small]);

  return (
    <Canvas
      camera={{ position: [0, 1.5, small ? 6 : 8], fov: 40 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <Suspense fallback={<Loader />}>
        <Environment preset="city" />
        {model && <primitive object={model} />}
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate />
    </Canvas>
  );
};

export default ThreeDViewer;
