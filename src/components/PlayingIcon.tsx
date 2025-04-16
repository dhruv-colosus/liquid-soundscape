import { motion } from 'framer-motion';

interface PlayingIconProps {
    className?: string;
}

export const PlayingIcon = ({ className = '' }: PlayingIconProps) => {
    return (
        <div className={`flex items-center gap-1 ${className}`}>
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-white rounded-full"
                    animate={{
                        height: ['1.5rem', '0.5rem', '1.5rem'],
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                    }}
                />
            ))}
        </div>
    );
}; 