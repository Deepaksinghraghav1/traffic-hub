import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onClaim: () => void;
    campaignTitle: string;
    rewardPoints: number;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ 
    isOpen, 
    onClose, 
    onClaim, 
    campaignTitle,
    rewardPoints
}) => {
    const [timer, setTimer] = useState(15);
    const [canClaim, setCanClaim] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        
        setTimer(15);
        setCanClaim(false);

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanClaim(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 p-8 sm:p-10 space-y-6 text-center">
                <div className="size-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20 shadow-lg">
                    <Zap className={`size-10 text-blue-500 ${!canClaim ? 'animate-pulse' : 'animate-bounce'}`} />
                </div>
                
                <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Verifying Link Visit</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                        Campaign: <span className="font-extrabold text-zinc-900 dark:text-white">{campaignTitle}</span>
                    </p>
                </div>

                {!canClaim ? (
                    <div className="space-y-4">
                        <div className="text-4xl font-black text-blue-600 animate-pulse">{timer}s</div>
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Please keep the window open. Checking progress...</p>
                        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
                                style={{ width: `${((15 - timer) / 15) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 animate-in fade-in duration-350">
                        <div className="text-emerald-500 font-black text-sm uppercase bg-emerald-500/10 py-2 rounded-xl border border-emerald-500/20">
                            Visit Verified! Ready to Claim
                        </div>
                        <button
                            onClick={onClaim}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
                        >
                            Claim {rewardPoints} Points
                        </button>
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 text-xs font-black uppercase tracking-widest pt-2 block mx-auto transition-colors"
                >
                    Cancel & Close
                </button>
            </div>
        </div>
    );
};
