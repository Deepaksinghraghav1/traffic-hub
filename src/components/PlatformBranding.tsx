import React from 'react';

interface PlatformBrandingProps {
    onClick?: () => void;
}

export const PlatformBranding: React.FC<PlatformBrandingProps> = ({ onClick }) => {
    return (
        <div onClick={onClick} className="flex items-center gap-3 group cursor-pointer px-2 py-1 select-none">
            <div className="relative flex items-center justify-center">
                {/* Ice-Emerald Tech Glow Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>

                {/* Interconnected NF Grid Shield */}
                <svg
                    className="w-10 h-10 transform group-hover:rotate-2 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="nfIceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10B981" /> {/* Emerald Green */}
                            <stop offset="100%" stopColor="#06B6D4" /> {/* Ice Cyan */}
                        </linearGradient>
                    </defs>

                    {/* Premium Diamond-Cut Outer Border */}
                    <polygon
                        points="50,5 92,40 76,90 24,90 8,40"
                        stroke="url(#nfIceGrad)"
                        strokeWidth="4.5"
                        strokeLinejoin="round"
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Interconnected Continuous NF Monogram */}
                    {/* Ek hi seamless abstract wave me N aur F merge hote hain */}
                    <path
                        d="M30 65V35L48 56V35H68M48 48H60"
                        stroke="url(#nfIceGrad)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Corporate Slate & Emerald Typography with theme support */}
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-all duration-300">
                Nexus
                <span className="ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-black group-hover:from-emerald-300 group-hover:to-cyan-300 transition-all duration-300">
                    Flow
                </span>
            </span>
        </div>
    );
};
