import React from 'react';

interface PlatformBrandingProps {
    onClick?: () => void;
}

export const PlatformBranding: React.FC<PlatformBrandingProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center gap-3 group cursor-pointer px-2 py-1 select-none">
            <div className="relative flex items-center justify-center">
                {/* Futuristic Cyber Glow Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>

                {/* Geometric Hex Shield with NF Monogram */}
                <svg
                    className="w-10 h-10 transform group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.25)]"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="nfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06B6D4" /> {/* Cyber Cyan */}
                            <stop offset="50%" stopColor="#8B5CF6" /> {/* Vibrant Purple */}
                            <stop offset="100%" stopColor="#D946EF" /> {/* Neon Fuchsia */}
                        </linearGradient>
                    </defs>

                    {/* Clean Tech Hexagon Outer Frame */}
                    <polygon
                        points="50,7 88,29 88,71 50,93 12,71 12,29"
                        stroke="url(#nfGrad)"
                        strokeWidth="5"
                        strokeLinejoin="round"
                        className="opacity-90 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Minimalist Tech Style 'N' and 'F' Monogram */}
                    {/* Letter N */}
                    <path
                        d="M32 68V32L48 54V32"
                        stroke="url(#nfGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Letter F */}
                    <path
                        d="M56 68V32H72M56 48H66"
                        stroke="url(#nfGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Modern Typography with Light/Dark responsive layout */}
            <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-slate-100 group-hover:text-black dark:group-hover:text-white transition-all duration-300">
                Nexus
                <span className="ml-1 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 font-black group-hover:from-cyan-300 group-hover:to-fuchsia-400 transition-all duration-300">
                    Flow
                </span>
            </span>
        </div>
    );
};
