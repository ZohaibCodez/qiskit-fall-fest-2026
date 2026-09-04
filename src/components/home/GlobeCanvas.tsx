'use client';

import { useMemo, useRef } from 'react';
import Globe, { type GlobeMethods } from 'react-globe.gl';
import * as THREE from 'three';

/**
 * The actual WebGL globe. Kept in its own module so `GlobeVisual` can pull it
 * in with `next/dynamic({ ssr: false })` — that puts three.js *and*
 * react-globe.gl in one lazy chunk instead of the home route's first load,
 * so the hero text paints before the 3D payload arrives.
 */

type Node = { lat: number; lng: number };

// Fixed set (not Math.random) so every visitor sees the same composition and
// the arcs don't reshuffle between renders.
const NODES: Node[] = [
  { lat: 40.71, lng: -74.01 },
  { lat: 51.51, lng: -0.13 },
  { lat: 35.68, lng: 139.69 },
  { lat: -33.87, lng: 151.21 },
  { lat: 37.77, lng: -122.42 },
  { lat: 1.35, lng: 103.82 },
  { lat: 52.52, lng: 13.4 },
  { lat: 19.08, lng: 72.88 },
  { lat: -23.55, lng: -46.63 },
  { lat: 30.04, lng: 31.24 },
  { lat: 55.75, lng: 37.62 },
  { lat: 24.86, lng: 67.01 },
];

const ARC_PAIRS: Array<[number, number]> = [
  [0, 1], [1, 6], [6, 7], [7, 5], [5, 2], [2, 3],
  [4, 0], [8, 0], [9, 1], [10, 6], [11, 5], [7, 9],
];

const ACCENT = '#818cf8';
const ACCENT_2 = '#38bdf8';

export default function GlobeCanvas({ size }: { size: number }) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const arcs = useMemo(
    () =>
      ARC_PAIRS.map(([a, b]) => ({
        startLat: NODES[a].lat,
        startLng: NODES[a].lng,
        endLat: NODES[b].lat,
        endLng: NODES[b].lng,
        color: [ACCENT, ACCENT_2] as [string, string],
      })),
    [],
  );

  // Translucent and self-lit: the graticule grid and arcs read as the surface,
  // rather than a photographic earth, matching the hero's abstract feel.
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color('#0b1030'),
        emissive: new THREE.Color('#221f57'),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.9,
        shininess: 6,
      }),
    [],
  );

  const onReady = () => {
    const globe = globeRef.current;
    if (!globe) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const controls = globe.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !prefersReduced;
    controls.autoRotateSpeed = 0.55;

    globe.pointOfView({ lat: 18, lng: 20, altitude: 2.3 });
  };

  return (
    <Globe
      ref={globeRef}
      onGlobeReady={onReady}
      width={size}
      height={size}
      backgroundColor="rgba(0,0,0,0)"
      globeMaterial={globeMaterial}
      showGlobe
      showGraticules
      showAtmosphere
      atmosphereColor={ACCENT}
      atmosphereAltitude={0.26}
      arcsData={arcs}
      arcColor="color"
      arcAltitudeAutoScale={0.42}
      arcStroke={0.45}
      arcDashLength={0.42}
      arcDashGap={0.6}
      arcDashAnimateTime={3800}
      pointsData={NODES}
      pointColor={() => '#c4b5fd'}
      pointAltitude={0.012}
      pointRadius={0.32}
      ringsData={NODES.filter((_, i) => i % 3 === 0)}
      ringColor={() => (t: number) => `rgba(129, 140, 248, ${1 - t})`}
      ringMaxRadius={4.5}
      ringPropagationSpeed={1.4}
      ringRepeatPeriod={2600}
    />
  );
}
