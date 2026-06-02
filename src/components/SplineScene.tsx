import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: "300px" }}>
          <div className="loader" style={{
            width: "48px",
            height: "48px",
            border: "5px solid var(--accent-cyan)",
            borderBottomColor: "transparent",
            borderRadius: "50%",
            display: "inline-block",
            animation: "rotation 1s linear infinite"
          }}></div>
          <style>{`
            @keyframes rotation {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
