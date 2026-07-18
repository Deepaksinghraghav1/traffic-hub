import React from 'react';

interface PlatformBrandingProps {
    onClick?: () => void;
}

export const PlatformBranding: React.FC<PlatformBrandingProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center gap-3 group cursor-pointer px-2 py-1 select-none">
            <div className="relative flex items-center justify-center">
                {/* Interconnected NF Grid Shield */}
                <svg
                    className="w-10 h-10 transform transition-transform duration-300"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="nfIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06B6D4" /> {/* Cyber Cyan */}
                            <stop offset="100%" stopColor="#3B82F6" /> {/* Electric Blue */}
                        </linearGradient>
                    </defs>

                    {/* Premium Diamond-Cut Outer Border (Solid opacity, no hover glow change) */}
                    <polygon
                        points="50,5 92,40 76,90 24,90 8,40"
                        stroke="url(#nfIceGrad)"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                    />

                    {/* Interconnected Continuous NF Monogram */}
                    <path
                        d="M30 65V35L48 56V35H68M48 48H60"
                        stroke="url(#nfIceGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Corporate Slate & Ice Cyan Typography (Stable, no hover glow changes) */}
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-slate-200 transition-all duration-300">
                Nexus
                <span className="ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-black transition-all duration-300">
                    Flow
                </span>
            </span>
        </div>
    );
};
