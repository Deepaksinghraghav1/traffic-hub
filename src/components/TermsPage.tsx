import { Zap } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface TermsPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function TermsPage({ onBack, onGetStarted, theme, setTheme }: TermsPageProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 pb-20">
            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="size-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="size-6 text-white" />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hidden sm:block">NexusFlow</span>
                    </button>
                    <div className="flex items-center gap-4">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <button
                            onClick={onGetStarted}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-4xl mx-auto px-6 pt-20 pb-16">
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Terms of Service</h1>
                    <p className="text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Last updated: May 1, 2026</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-14 shadow-xl dark:shadow-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">1. Agreement to Terms</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            By accessing or using NexusFlow, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">2. Use License</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 font-medium text-lg">
                            Permission is granted to temporarily use NexusFlow for personal or commercial purposes, subject to the following restrictions:
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                            {[
                                'You must not use bots, scripts, or automated tools to generate traffic.',
                                'You must not promote illegal, harmful, or explicitly adult content.',
                                'You must not attempt to decompile or reverse engineer any software.',
                                'You must not transfer the materials to another person or mirror them.'
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-5 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                    <div className="size-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                    <span className="font-bold text-zinc-600 dark:text-zinc-300">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mt-8 font-medium italic text-sm">
                            This license shall automatically terminate if you violate any of these restrictions and may be terminated by NexusFlow at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">3. Disclaimer</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            The materials on NexusFlow are provided on an 'as is' basis. NexusFlow makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">4. Limitations</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            In no event shall NexusFlow or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NexusFlow.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">5. Account Termination</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
