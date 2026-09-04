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

type Node = { lat: number; lng: number; color: string; radius: number };

const NODE_COUNT = 46;
const NEIGHBORS_PER_NODE = 2;

const NODE_COLORS = ['#ffffff', '#a5b4fc', '#7dd3fc', '#c4b5fd', '#60a5fa'];
const ARC_COLORS: Array<[string, string]> = [
  ['#818cf8', '#38bdf8'],
  ['#c4b5fd', '#818cf8'],
  ['#7dd3fc', '#a5b4fc'],
];

const toRad = Math.PI / 180;

/**
 * Fibonacci-sphere distribution: evenly spreads nodes over the globe with no
 * clustering and — critically — no Math.random, so the composition is identical
 * for every visitor and every render.
 */
function buildNodes(): Node[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: NODE_COUNT }, (_, i) => {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    const x = Math.cos(theta) * ringRadius;
    const z = Math.sin(theta) * ringRadius;

    return {
      lat: Math.asin(y) / toRad,
      lng: Math.atan2(z, x) / toRad,
      color: NODE_COLORS[i % NODE_COLORS.length],
      // Deterministic size variation so the mesh reads as depth, not noise.
      radius: 0.2 + ((i * 7) % 5) * 0.055,
    };
  });
}

function unitVector({ lat, lng }: Node) {
  const phi = lat * toRad;
  const lambda = lng * toRad;
  return [Math.cos(phi) * Math.cos(lambda), Math.sin(phi), Math.cos(phi) * Math.sin(lambda)];
}

/** Links each node to its nearest neighbours, so the arcs read as a real network rather than random chords. */
function buildArcs(nodes: Node[]) {
  const vectors = nodes.map(unitVector);
  const seen = new Set<string>();
  const arcs: Array<{
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    color: [string, string];
    dashInitialGap: number;
  }> = [];

  nodes.forEach((node, i) => {
    const distances = nodes
      .map((_, j) => ({
        j,
        dot: vectors[i][0] * vectors[j][0] + vectors[i][1] * vectors[j][1] + vectors[i][2] * vectors[j][2],
      }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => b.dot - a.dot)
      .slice(0, NEIGHBORS_PER_NODE);

    distances.forEach(({ j }) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) return;
      seen.add(key);
      arcs.push({
        startLat: node.lat,
        startLng: node.lng,
        endLat: nodes[j].lat,
        endLng: nodes[j].lng,
        color: ARC_COLORS[arcs.length % ARC_COLORS.length],
        // Staggered so the dashes don't all travel in lockstep.
        dashInitialGap: (arcs.length % 9) / 9,
      });
    });
  });

  return arcs;
}

export default function GlobeCanvas({ size }: { size: number }) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined);

  const nodes = useMemo(buildNodes, []);
  const arcs = useMemo(() => buildArcs(nodes), [nodes]);

  // Lit blue sphere rather than a photographic earth — the arc mesh and
  // atmosphere carry the visual, the surface just gives them something to sit on.
  const globeMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: new THREE.Color('#0b2a7a'),
        emissive: new THREE.Color('#1e3a8a'),
        emissiveIntensity: 0.85,
        transparent: true,
        opacity: 0.95,
        shininess: 14,
        specular: new THREE.Color('#3b82f6'),
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
    controls.autoRotateSpeed = 0.5;

    // Close enough to fill its box like the reference, but not so close that
    // the atmosphere glow reaches the square canvas edge and clips.
    globe.pointOfView({ lat: 12, lng: 20, altitude: 2.05 });
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
      atmosphereColor="#4f7cff"
      atmosphereAltitude={0.3}
      arcsData={arcs}
      arcColor="color"
      arcAltitudeAutoScale={0.52}
      arcStroke={0.32}
      arcDashLength={0.5}
      arcDashGap={0.22}
      arcDashInitialGap="dashInitialGap"
      arcDashAnimateTime={5200}
      pointsData={nodes}
      pointColor="color"
      pointAltitude={0.015}
      pointRadius="radius"
      pointResolution={8}
      ringsData={nodes.filter((_, i) => i % 6 === 0)}
      ringColor={() => (t: number) => `rgba(147, 197, 253, ${1 - t})`}
      ringMaxRadius={5}
      ringPropagationSpeed={1.2}
      ringRepeatPeriod={2800}
    />
  );
}
