import { Zap, UserPlus, MousePointerClick, Coins, Link2, TrendingUp, Shield, Award } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface HowItWorksPageProps {
    onGetStarted: () => void;
    onBack: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function HowItWorksPage({ onGetStarted, onBack, theme, setTheme }: HowItWorksPageProps) {
    const steps = [
        {
            number: 1,
            icon: UserPlus,
            title: 'Create Your Account',
            description: 'Sign up for free in less than 60 seconds. No credit card required.',
            details: [
                'Quick email verification',
                'Set up your profile',
                'Get 100 welcome points',
            ]
        },
        {
            number: 2,
            icon: MousePointerClick,
            title: 'Complete Tasks & Earn',
            description: 'Browse available tasks and visit links to earn points instantly.',
            details: [
                'Visit YouTube videos',
                'Check out websites',
                'Follow social profiles',
            ]
        },
        {
            number: 3,
            icon: Link2,
            title: 'Create Your Campaigns',
            description: 'Submit your own links and set your cost-per-click rate.',
            details: [
                'Add unlimited links',
                'Set custom CPC rates',
                'Target specific audiences',
            ]
        },
        {
            number: 4,
            icon: TrendingUp,
            title: 'Watch Your Traffic Grow',
            description: 'Real users visit your content and your traffic increases organically.',
            details: [
                'Real-time analytics',
                'Quality traffic sources',
                'Boost engagement',
            ]
        }
    ];

    const benefits = [
        {
            icon: Shield,
            title: 'Safe & Secure',
            description: 'All links are moderated to ensure quality and safety'
        },
        {
            icon: Coins,
            title: 'Fair Point System',
            description: 'Transparent earning rates with no hidden fees'
        },
        {
            icon: Award,
            title: 'Quality Traffic',
            description: 'Real human visitors, not bots or fake clicks'
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
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
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                    <Shield className="size-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">Safe & Transparent</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">How NexusFlow Works</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                    A simple, fair system to grow your online presence through community exchange
                </p>
            </div>

            {/* Steps */}
            <div className="max-w-5xl mx-auto px-6 pb-24">
                <div className="space-y-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 hover:border-blue-500/30 dark:hover:border-zinc-700 transition-all shadow-sm dark:shadow-none"
                            >
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative flex-shrink-0">
                                        <div className="size-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
                                            <Icon className="size-10 text-white" />
                                        </div>
                                        <div className="absolute -top-3 -right-3 size-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg border-4 border-white dark:border-zinc-900">
                                            {step.number}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black mb-4 tracking-tight">{step.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-6 leading-relaxed font-medium">{step.description}</p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {step.details.map((detail, idx) => (
                                                <div key={idx} className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                                    <div className="size-2 bg-blue-500 rounded-full"></div>
                                                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">{detail}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Benefits Grid */}
                <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div key={index} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-sm dark:shadow-none group hover:border-blue-500/30 transition-all">
                                <div className="size-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <Icon className="size-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-black text-xl mb-3 tracking-tight">{benefit.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-[3rem] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-5xl font-black mb-6 text-white tracking-tight">Ready to Get Started?</h2>
                        <p className="text-blue-100 mb-10 text-lg sm:text-xl font-medium">Join thousands of users growing their traffic today</p>
                        <button
                            onClick={onGetStarted}
                            className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl hover:scale-105 active:scale-95 w-full sm:w-auto"
                        >
                            Create Free Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}