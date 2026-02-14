'use client';

import { useEffect, useRef, FC } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

import { GrainientProps } from '../types';
import { fragment, vertex } from '../constants';

import styles from './Grainient.module.css';
import clsx from 'clsx';

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 1, 1];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
};

export const Grainient: FC<GrainientProps> = ({
  timeSpeed = 0.25,
  colorBalance = 0.0,
  warpStrength = 1.0,
  warpFrequency = 5.0,
  warpSpeed = 2.0,
  warpAmplitude = 50.0,
  blendAngle = 0.0,
  blendSoftness = 0.05,
  rotationAmount = 500.0,
  noiseScale = 2.0,
  grainAmount = 0.1,
  grainScale = 2.0,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1.0,
  saturation = 1.0,
  centerX = 0.0,
  centerY = 0.0,
  zoom = 0.9,
  color1 = '#FF9FFC',
  color2 = '#5227FF',
  color3 = '#B19EEF',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<Program | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';

    const container = containerRef.current;
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: 0 },
        uColorBalance: { value: 0 },
        uWarpStrength: { value: 0 },
        uWarpFrequency: { value: 0 },
        uWarpSpeed: { value: 0 },
        uWarpAmplitude: { value: 0 },
        uBlendAngle: { value: 0 },
        uBlendSoftness: { value: 0 },
        uRotationAmount: { value: 0 },
        uNoiseScale: { value: 0 },
        uGrainAmount: { value: 0 },
        uGrainScale: { value: 0 },
        uGrainAnimated: { value: 0 },
        uContrast: { value: 0 },
        uGamma: { value: 0 },
        uSaturation: { value: 0 },
        uCenterOffset: { value: new Float32Array([0, 0]) },
        uZoom: { value: 0 },
        uColor1: { value: new Float32Array([0, 0, 0]) },
        uColor2: { value: new Float32Array([0, 0, 0]) },
        uColor3: { value: new Float32Array([0, 0, 0]) },
      },
    });

    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const res = program.uniforms.iResolution.value;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(setSize);
    ro.observe(container);
    setSize();

    let raf = 0;
    const t0 = performance.now();
    const loop = (t: number) => {
      program.uniforms.iTime.value = (t - t0) * 0.001;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    const program = programRef.current;
    if (!program) return;

    program.uniforms.uTimeSpeed.value = timeSpeed;
    program.uniforms.uColorBalance.value = colorBalance;
    program.uniforms.uWarpStrength.value = warpStrength;
    program.uniforms.uWarpFrequency.value = warpFrequency;
    program.uniforms.uWarpSpeed.value = warpSpeed;
    program.uniforms.uWarpAmplitude.value = warpAmplitude;
    program.uniforms.uBlendAngle.value = blendAngle;
    program.uniforms.uBlendSoftness.value = blendSoftness;
    program.uniforms.uRotationAmount.value = rotationAmount;
    program.uniforms.uNoiseScale.value = noiseScale;
    program.uniforms.uGrainAmount.value = grainAmount;
    program.uniforms.uGrainScale.value = grainScale;
    program.uniforms.uGrainAnimated.value = grainAnimated ? 1.0 : 0.0;
    program.uniforms.uContrast.value = contrast;
    program.uniforms.uGamma.value = gamma;
    program.uniforms.uSaturation.value = saturation;
    program.uniforms.uCenterOffset.value[0] = centerX;
    program.uniforms.uCenterOffset.value[1] = centerY;
    program.uniforms.uZoom.value = zoom;
    program.uniforms.uColor1.value.set(hexToRgb(color1));
    program.uniforms.uColor2.value.set(hexToRgb(color2));
    program.uniforms.uColor3.value.set(hexToRgb(color3));
  }, [
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
    color1,
    color2,
    color3,
  ]);

  return <div ref={containerRef} className={clsx(styles.grainientContainer, className)} />;
};
