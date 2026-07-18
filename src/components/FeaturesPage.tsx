import { Zap, Shield, TrendingUp, BarChart, Users, Globe, Smartphone, Lock } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface FeaturesPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function FeaturesPage({ onBack, onGetStarted, theme, setTheme }: FeaturesPageProps) {
    const features = [
        {
            icon: TrendingUp,
            title: 'Real Human Traffic',
            description: 'No bots or fake clicks. Our community-driven platform ensures that every visit comes from a real person interested in your content.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: Shield,
            title: 'Advanced Anti-Fraud',
            description: 'We employ strict anti-cheat mechanisms and IP logging to ensure the traffic you receive is high quality and legitimate.',
            color: 'from-blue-600 to-pink-500'
        },
        {
            icon: BarChart,
            title: 'Detailed Analytics',
            description: 'Track your campaigns in real-time. See exactly where your clicks are coming from, when they occurred, and how your points are being spent.',
            color: 'from-amber-500 to-orange-500'
        },
        {
            icon: Users,
            title: 'Targeted Demographics',
            description: 'Optionally target specific regions or user interests to ensure your content reaches the audience most likely to engage with it.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Globe,
            title: 'Global Reach',
            description: 'Connect with a massive worldwide audience. Our network spans across 150+ countries, giving your content an international boost.',
            color: 'from-indigo-500 to-blue-500'
        },
        {
            icon: Smartphone,
            title: 'Cross-Device Compatibility',
            description: 'Whether your audience is on a desktop, tablet, or mobile phone, NexusFlow delivers seamless experiences across all platforms.',
            color: 'from-rose-500 to-blue-500'
        }
    ];

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
                <h1 className="text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight leading-[1.2] md:leading-[1.1]">Powerful Features to<br className="hidden sm:block" /> Fuel Your Growth</h1>
                <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed font-medium">
                    Our platform is engineered with precision to provide the most effective traffic exchange experience in the industry.
                </p>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 hover:border-blue-500/30 transition-all shadow-xl dark:shadow-none">
                                <div className={`size-14 md:size-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg mb-6 md:mb-10 group-hover:scale-110 transition-transform`}>
                                    <Icon className="size-6 md:size-8 text-white" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">{feature.title}</h3>
                                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Security Note */}
            <div className="max-w-4xl mx-auto px-6 mt-24">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 shadow-xl dark:shadow-none">
                    <div className="size-24 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center flex-shrink-0 border border-zinc-100 dark:border-zinc-700 shadow-inner">
                        <Lock className="size-12 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black mb-4 tracking-tight">Enterprise-Grade Security</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed font-medium">
                            Your data and campaigns are secured with industry-standard encryption. We never sell your personal information, and our exchange system is completely transparent.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="max-w-4xl mx-auto px-6 mt-24 text-center">
                <h2 className="text-4xl font-black mb-8 tracking-tight">Ready to experience these features?</h2>
                <button
                    onClick={onGetStarted}
                    className="bg-blue-600 hover:bg-blue-50 px-12 py-5 rounded-2xl font-black text-lg text-white transition-all shadow-2xl shadow-blue-600/25 hover:scale-105 active:scale-95"
                >
                    Create Free Account
                </button>
            </div>
        </div>
    );
}
