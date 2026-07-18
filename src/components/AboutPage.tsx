import { Zap, Target, Heart, Award } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface AboutPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function AboutPage({ onBack, onGetStarted, theme, setTheme }: AboutPageProps) {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 pb-20">
            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="size-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="size-6 text-white" />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hidden sm:block">NexusFlow</span>
                    </button>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <button
                            onClick={onGetStarted}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-20 pb-10 md:pb-16 text-center">
                <h1 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-[1.2] md:leading-[1.1]">Our Mission to Democratize<br className="hidden sm:block" /> Online Traffic</h1>
                <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
                    We believe that growing an online audience shouldn't require a massive marketing budget. NexusFlow was built to create a fair, community-driven ecosystem where creators help creators.
                </p>
            </div>

            {/* Stats */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 md:mt-12 mb-16 md:mb-24">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] p-8 sm:p-14 shadow-xl dark:shadow-none">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                        <div>
                            <div className="text-3xl md:text-5xl font-black text-blue-600 dark:text-blue-400 mb-2 md:mb-3 tracking-tighter">2023</div>
                            <div className="text-[10px] md:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Year Founded</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-2 md:mb-3 tracking-tighter">50K+</div>
                            <div className="text-[10px] md:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Active Creators</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-5xl font-black text-amber-500 mb-2 md:mb-3 tracking-tighter">2M+</div>
                            <div className="text-[10px] md:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Monthly Exchanges</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-5xl font-black text-green-500 mb-2 md:mb-3 tracking-tighter">150+</div>
                            <div className="text-[10px] md:text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Countries</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4 tracking-tight">Our Core Values</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">The principles that guide everything we build.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Target, title: 'Transparency', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/10', desc: 'No hidden fees, no fake bots. Our exchange system is built on complete transparency and verifiable interactions.' },
                        { icon: Heart, title: 'Community First', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/10', desc: 'We prioritize the needs of our community members over short-term profits. Your success is our success.' },
                        { icon: Award, title: 'Quality Driven', color: 'text-amber-500', bg: 'bg-amber-500/10', desc: 'We constantly monitor and ban bad actors to ensure that the traffic you receive is always high quality.' }
                    ].map((value, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 p-10 rounded-[2rem] hover:border-blue-500/20 transition-all shadow-sm dark:shadow-none">
                            <div className={`size-14 ${value.bg} rounded-2xl flex items-center justify-center mb-8`}>
                                <value.icon className={`size-8 ${value.color}`} />
                            </div>
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{value.title}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                                {value.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
