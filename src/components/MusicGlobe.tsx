import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { usePlayer } from '@/context/PlayerContext';
import { Album } from '@/data/albums';

interface MusicGlobeProps {
  albums: Album[];
  onSelectAlbum: (album: Album) => void;
}

const MusicGlobe: React.FC<MusicGlobeProps> = ({ albums, onSelectAlbum }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Object3D | null>(null);
  const albumObjectsRef = useRef<THREE.Object3D[]>([]);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const selectedAlbumRef = useRef<number | null>(null);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sphere geometry
    const radius = 2;
    const sphereGeometry = new THREE.SphereGeometry(radius, 32, 32);

    // Create a group to hold our album covers
    const sphere = new THREE.Object3D();
    sphereRef.current = sphere;
    scene.add(sphere);

    // Load album cover textures
    albums.forEach((album, index) => {
      const loader = new THREE.TextureLoader();
      loader.load(album.coverUrl, (texture) => {
        texture.minFilter = THREE.LinearFilter;
        texturesRef.current.push(texture);

        // Create a plane for each album cover
        const planeSize = 0.7;
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true
        });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Position evenly on sphere
        const phi = Math.acos(-1 + (2 * index) / albums.length);
        const theta = Math.sqrt(albums.length * Math.PI) * phi;

        // Convert spherical to Cartesian coordinates
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        plane.position.set(x, y, z);

        // Make plane face outward from center of sphere
        plane.lookAt(0, 0, 0);
        plane.userData = { albumId: album.id };

        // Add to our sphere group
        sphere.add(plane);
        albumObjectsRef.current.push(plane);
      });
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (sphereRef.current && autoRotateRef.current) {
        sphereRef.current.rotation.y += 0.002;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [albums]);

  // Add mouse/touch interaction
  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      autoRotateRef.current = false;
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingRef.current && sphereRef.current) {
        const deltaMove = {
          x: event.clientX - previousMousePositionRef.current.x,
          y: event.clientY - previousMousePositionRef.current.y
        };

        sphereRef.current.rotation.y += deltaMove.x * 0.005;
        sphereRef.current.rotation.x += deltaMove.y * 0.005;

        previousMousePositionRef.current = {
          x: event.clientX,
          y: event.clientY
        };
      }

      // Update mouse position for raycasting
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
        mouseRef.current.y = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      }
    };

    const handleMouseUp = () => {
      if (isDraggingRef.current && cameraRef.current && sceneRef.current) {
        // Check if we clicked on an album
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(albumObjectsRef.current);

        if (intersects.length > 0) {
          const selectedObject = intersects[0].object;
          const albumId = selectedObject.userData.albumId;

          // Find the album in our albums array
          const selectedAlbum = albums.find(album => album.id === albumId);
          if (selectedAlbum) {
            onSelectAlbum(selectedAlbum);
            selectedAlbumRef.current = albumId;
          }
        }
      }

      isDraggingRef.current = false;

      // Resume auto-rotation after a delay
      setTimeout(() => {
        autoRotateRef.current = true;
      }, 3000);
    };

    const handleWheel = (event: WheelEvent) => {
      if (cameraRef.current) {
        // Zoom in/out
        cameraRef.current.position.z += event.deltaY * 0.01;
        // Limit zoom
        cameraRef.current.position.z = Math.max(3, Math.min(8, cameraRef.current.position.z));
      }
    };

    // Touch events for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        autoRotateRef.current = false;
        previousMousePositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isDraggingRef.current && event.touches.length === 1 && sphereRef.current) {
        const deltaMove = {
          x: event.touches[0].clientX - previousMousePositionRef.current.x,
          y: event.touches[0].clientY - previousMousePositionRef.current.y
        };

        sphereRef.current.rotation.y += deltaMove.x * 0.005;
        sphereRef.current.rotation.x += deltaMove.y * 0.005;

        previousMousePositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }

      // Update touch position for raycasting
      if (containerRef.current && event.touches.length === 1) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.x = ((event.touches[0].clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
        mouseRef.current.y = -((event.touches[0].clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      }
    };

    const handleTouchEnd = () => {
      if (isDraggingRef.current && cameraRef.current && sceneRef.current) {
        // Check if we tapped on an album
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(albumObjectsRef.current);

        if (intersects.length > 0) {
          const selectedObject = intersects[0].object;
          const albumId = selectedObject.userData.albumId;

          // Find the album in our albums array
          const selectedAlbum = albums.find(album => album.id === albumId);
          if (selectedAlbum) {
            onSelectAlbum(selectedAlbum);
            selectedAlbumRef.current = albumId;
          }
        }
      }

      isDraggingRef.current = false;

      // Resume auto-rotation after a delay
      setTimeout(() => {
        autoRotateRef.current = true;
      }, 3000);
    };

    // Add event listeners
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    containerRef.current.addEventListener('wheel', handleWheel);

    // Touch events
    containerRef.current.addEventListener('touchstart', handleTouchStart);
    containerRef.current.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousedown', handleMouseDown);
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('wheel', handleWheel);
        containerRef.current.removeEventListener('touchstart', handleTouchStart);
        containerRef.current.removeEventListener('touchmove', handleTouchMove);
      }
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [albums, onSelectAlbum]);

  return (
    <div className="relative w-full h-[500px] my-8">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
        Drag to rotate • Click to select • Scroll to zoom
      </div>
    </div>
  );
};

export default MusicGlobe;
