import { useState, useEffect } from 'react';

export const useAdaptiveParallax = (multiplier = 1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window !== 'undefined') {
        // Calculate offset relative to the viewport center (offset scale -10 to 10 by default)
        const x = ((e.clientX / window.innerWidth) - 0.5) * 20 * multiplier;
        const y = ((e.clientY / window.innerHeight) - 0.5) * 20 * multiplier;
        setMousePosition({ x, y });
      }
    };

    const getScreenOrientation = (): number => {
      if (typeof window === 'undefined') return 0;
      if (window.screen && window.screen.orientation) {
        return window.screen.orientation.angle;
      }
      if ('orientation' in window) {
        return (window as any).orientation as number;
      }
      return 0;
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        let screenX = e.gamma;
        let screenY = e.beta;

        const isIOS = typeof navigator !== 'undefined' && (
          /iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        );

        if (!isIOS) {
          // On Android / Chrome, the orientation values are relative to the physical device coordinates.
          // We must rotate them manually based on the current screen orientation angle.
          const angle = getScreenOrientation();
          if (angle !== 0) {
            const angleRad = (angle * Math.PI) / 180;
            const cosAngle = Math.cos(angleRad);
            const sinAngle = Math.sin(angleRad);

            const rawX = e.gamma;
            const rawY = e.beta;

            screenX = rawX * cosAngle + rawY * sinAngle;
            screenY = -rawX * sinAngle + rawY * cosAngle;
          }
        }

        const tiltIntensity = 10 * multiplier; 
        const maxTiltAngle = 20;
        
        let tiltX = (screenX / maxTiltAngle) * tiltIntensity;
        // Assume typical device viewing tilt angle is around 50 degrees relative to screen vertical axis
        const normalizedScreenY = screenY - 50;
        let tiltY = (normalizedScreenY / maxTiltAngle) * tiltIntensity;
        
        // Clamp values safely
        tiltX = Math.min(Math.max(tiltX, -tiltIntensity), tiltIntensity);
        tiltY = Math.min(Math.max(tiltY, -tiltIntensity), tiltIntensity);
        
        setGyroscope({ x: tiltX, y: tiltY });
      }
    };

    const handleTouchMove = () => {
      // Clear mouse position when touch starts to ensure gyroscope takes over on mobile
      setMousePosition({ x: 0, y: 0 });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('deviceorientation', handleOrientation);
      window.addEventListener('touchstart', handleTouchMove);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('touchstart', handleTouchMove);
      }
    };
  }, [multiplier]);

  // Use mouse position if active, fallback smoothly to gyroscope on touch devices
  const activeOffset = (mousePosition.x !== 0 || mousePosition.y !== 0) 
    ? mousePosition 
    : gyroscope;

  return activeOffset;
};
