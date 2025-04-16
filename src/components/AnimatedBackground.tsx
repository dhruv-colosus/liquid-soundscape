import { motion } from 'framer-motion';

// Define keyframe animations in case Framer Motion doesn't work
const addKeyframes = `
@keyframes float-blue {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(100px, 50px) scale(1.1); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float-green {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-100px, -50px) scale(1.1); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes float-white {
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(50px, -50px) scale(1.05); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.blob-blue {
  animation: float-blue 30s ease-in-out infinite;
}

.blob-green {
  animation: float-green 35s ease-in-out infinite;
}

.blob-white {
  animation: float-white 40s ease-in-out infinite;
}
`;

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0  overflow-hidden pointer-events-none">
            {/* Add keyframe animations */}
            <style>{addKeyframes}</style>

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />

            {/* Blue blob - larger and more visible */}
            <motion.div
                className="blob-blue absolute -top-1/3 -left-1/3 w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-3xl"
                animate={{
                    x: [0, 150, 0],
                    y: [0, 75, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
            />

            {/* Green blob - larger and more visible */}
            <motion.div
                className="blob-green absolute -bottom-1/3 -right-1/3 w-[800px] h-[800px] rounded-full bg-blue-400/10 blur-3xl"
                animate={{
                    x: [0, -150, 0],
                    y: [0, -75, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
            />

            {/* White blob - larger and more visible */}
            <motion.div
                className="blob-white absolute top-1/3 left-1/3 w-[700px] h-[700px] rounded-full bg-white/10 blur-3xl"
                animate={{
                    x: [0, 75, 0],
                    y: [0, -75, 0],
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                }}
            />
        </div>
    );
}; 