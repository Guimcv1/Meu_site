import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Eye, Maximize2, Minimize2, RefreshCw, Loader2 } from 'lucide-react';

const ThreeViewer = ({ 
  stlUrl, 
  height = '350px', 
  color = '#3b82f6', 
  autoRotateDefault = true,
  title = 'Modelo 3D Interativo' 
}) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [autoRotate, setAutoRotate] = useState(autoRotateDefault);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);

  const sceneRef = useRef(null);
  const controlsRef = useRef(null);
  const materialsRef = useRef([]);
  const cameraRef = useRef(null);
  const initialCameraPos = useRef(new THREE.Vector3(0, 0, 5));

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const heightPx = container.clientHeight || 350;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 1000);
    camera.position.set(0, 0, 100);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear existing children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(50, 50, 50);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x3b82f6, 1.8);
    dirLight2.position.set(-50, -30, -50);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf43f5e, 2, 200);
    pointLight.position.set(0, 50, 20);
    scene.add(pointLight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.5;
    controlsRef.current = controls;

    materialsRef.current = [];
    setLoading(true);
    setError(null);

    const isGlb = stlUrl && (stlUrl.endsWith('.glb') || stlUrl.endsWith('.gltf'));

    if (isGlb) {
      const loader = new GLTFLoader();
      loader.load(
        stlUrl,
        (gltf) => {
          const model = gltf.scene;
          const bbox = new THREE.Box3().setFromObject(model);
          const center = bbox.getCenter(new THREE.Vector3());
          model.position.sub(center);

          const size = bbox.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDim;
          model.scale.set(scale, scale, scale);

          model.traverse((child) => {
            if (child.isMesh) {
              if (child.material) {
                materialsRef.current.push(child.material);
              }
            }
          });

          scene.add(model);
          camera.position.set(4, 3, 6);
          initialCameraPos.current.copy(camera.position);
          camera.lookAt(0, 0, 0);
          controls.target.set(0, 0, 0);
          controls.update();

          setLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) setProgress(Math.round((xhr.loaded / xhr.total) * 100));
        },
        (err) => {
          console.error('Erro ao carregar GLTF:', err);
          setError('Erro ao carregar modelo 3D');
          setLoading(false);
        }
      );
    } else {
      // STL Loader
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.45,
        roughness: 0.35,
        wireframe: isWireframe,
        side: THREE.DoubleSide
      });
      materialsRef.current.push(material);

      const loader = new STLLoader();
      loader.load(
        stlUrl,
        (geometry) => {
          geometry.computeVertexNormals();
          geometry.center();

          geometry.computeBoundingBox();
          const bbox = geometry.boundingBox;
          const size = new THREE.Vector3();
          bbox.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);

          const scale = 5 / maxDim;
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(scale, scale, scale);
          mesh.rotation.x = -Math.PI / 2;
          scene.add(mesh);

          camera.position.set(4, 3, 6);
          initialCameraPos.current.copy(camera.position);
          camera.lookAt(0, 0, 0);
          controls.target.set(0, 0, 0);
          controls.update();

          setLoading(false);
        },
        (xhr) => {
          if (xhr.total > 0) {
            setProgress(Math.round((xhr.loaded / xhr.total) * 100));
          }
        },
        (err) => {
          console.error('Erro ao carregar STL:', err);
          setError('Erro ao carregar modelo 3D');
          setLoading(false);
        }
      );
    }

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometryDispose(scene);
    };
  }, [stlUrl, isFullscreen]);

  const geometryDispose = (obj) => {
    if (!obj) return;
    if (obj.children) {
      obj.children.forEach(child => geometryDispose(child));
    }
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  };

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  useEffect(() => {
    materialsRef.current.forEach(mat => {
      if (mat) mat.wireframe = isWireframe;
    });
  }, [isWireframe]);

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.copy(initialCameraPos.current);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <div className={`relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden group/viewer shadow-xl transition-all duration-300 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none w-screen h-screen flex flex-col' : 'w-full'
    }`}>
      {/* Top Overlay Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-white rounded-full flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {title}
        </span>

        <div className="flex gap-2 pointer-events-auto">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pausar rotação' : 'Girar automaticamente'}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-md ${
              autoRotate 
                ? 'bg-blue-600/80 text-white border-blue-400' 
                : 'bg-black/60 text-gray-300 border-white/10 hover:bg-black/80 hover:text-white'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          <button
            onClick={() => setIsWireframe(!isWireframe)}
            title={isWireframe ? 'Modo Sólido' : 'Modo Wireframe (Estrutura)'}
            className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-md ${
              isWireframe 
                ? 'bg-salmon/80 text-white border-salmon' 
                : 'bg-black/60 text-gray-300 border-white/10 hover:bg-black/80 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetCamera}
            title="Resetar Câmera"
            className="p-2 rounded-xl bg-black/60 text-gray-300 border border-white/10 hover:bg-black/80 hover:text-white backdrop-blur-md transition-all shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Sair da tela cheia' : 'Expandir para Tela Cheia'}
            className="p-2 rounded-xl bg-black/60 text-gray-300 border border-white/10 hover:bg-black/80 hover:text-white backdrop-blur-md transition-all shadow-md"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-950/90 text-white gap-3 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-xs font-mono text-gray-300">Carregando modelo 3D ({progress}%)...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* 3D Canvas Mount Point */}
      <div 
        ref={mountRef} 
        style={{ height: isFullscreen ? '100vh' : height }} 
        className="w-full cursor-grab active:cursor-grabbing"
      />

      {/* Bottom Controls Info */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex justify-between items-center text-[10px] text-gray-400 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm border border-white/5">
        <span>Arraste para girar • Scroll para zoom</span>
        <span className="font-mono text-blue-400">Viewer 3D (STL / GLTF)</span>
      </div>
    </div>
  );
};

export default ThreeViewer;
