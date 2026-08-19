'use client'
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
let lenisInstance: Lenis | null = null;
export function initLenis() {
    if (lenisInstance) return lenisInstance;
    lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenisInstance?.raf(time * 1000);
    })
    gsap.ticker.lagSmoothing(0);
    return lenisInstance;
}
