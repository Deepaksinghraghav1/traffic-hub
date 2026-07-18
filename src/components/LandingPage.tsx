import {
    Zap,
    MousePointerClick,
    TrendingUp,
    Shield,
    Globe,
    ArrowRight,
    Check,
    Sparkles,
    Activity,
    Layers,
    Rocket
} from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface LandingPageProps {
    onGetStarted: () => void;
    onHowItWorks: () => void;
    onPricing: () => void;
    onFeatures: () => void;
    onAbout: () => void;
    onBlog: () => void;
    onContact: () => void;
    onPrivacy: () => void;
    onTerms: () => void;
    onSupport: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function LandingPage({
    onGetStarted,
    onHowItWorks,
    onPricing,
    onFeatures,
    onAbout,
    onBlog,
    onContact,
    onPrivacy,
    onTerms,
    onSupport,
    theme,
    setTheme
}: LandingPageProps) {
    const features = [
        {
            icon: MousePointerClick,
            title: 'Quality Visits',
            description: 'Get real human traffic from active community members.',
            color: 'from-blue-500 to-indigo-500',
            glow: 'shadow-blue-500/20'
        },
        {
            icon: TrendingUp,
            title: 'Earn & Scale',
            description: 'Accumulate points effortlessly and scale your presence.',
            color: 'from-amber-500 to-orange-500',
            glow: 'shadow-amber-500/20'
        },
        {
            icon: Sparkles,
            title: 'Instant Boost',
            description: 'Deploy your campaigns and see results in real-time.',
            color: 'from-purple-500 to-pink-500',
            glow: 'shadow-purple-500/20'
        }
    ];

    const stats = [
        { value: '50K+', label: 'Active Creators', icon: Activity },
        { value: '2M+', label: 'Clicks Delivered', icon: Layers },
        { value: '99.9%', label: 'Success Rate', icon: Shield },
        { value: '24/7', label: 'Live Support', icon: Globe }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300">
            {/* Mesh Gradient Backgrounds */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[20%] -left-[10%] size-[800px] bg-blue-600/5 dark:bg-blue-600/10 blur-[120px] rounded-full animate-float"></div>
                <div className="absolute top-[20%] -right-[10%] size-[600px] bg-purple-600/5 dark:bg-purple-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-2s' }}></div>
                <div className="absolute -bottom-[20%] left-[20%] size-[700px] bg-indigo-600/5 dark:bg-indigo-600/10 blur-[120px] rounded-full animate-float" style={{ animationDelay: '-4s' }}></div>
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 px-2 sm:px-6 py-4 sm:py-6">
                <div className="max-w-7xl mx-auto px-2 sm:px-8 py-2 sm:py-4 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/10 rounded-2xl sm:rounded-3xl shadow-sm">
                    <div className="flex items-center justify-between">
                        <PlatformBranding onClick={onFeatures} />

                        <div className="hidden lg:flex items-center gap-10">
                            {[
                                { label: 'Features', action: onFeatures },
                                { label: 'Pricing', action: onPricing },
                                { label: 'How it Works', action: onHowItWorks },
                                { label: 'About', action: onAbout }
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={item.action}
                                    className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-white transition-colors relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1.5 sm:gap-4">
                            <ThemeToggle theme={theme} setTheme={setTheme} />
                            <button
                                onClick={onGetStarted}
                                className="hidden md:block text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white px-4 transition-colors"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={onGetStarted}
                                className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95"
                            >
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-52 pb-20 md:pb-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 md:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">Next-Gen Traffic Exchange</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 md:mb-8 leading-[1.1] md:leading-[1.05] tracking-tight text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        Amplify Your Digital<br className="hidden md:block" /> Presence Instantly
                    </h1>

                    <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-medium animate-in fade-in slide-in-from-bottom-12 duration-1000 px-4">
                        Connect with real creators, exchange high-quality visits, and watch your platform grow with the most transparent traffic ecosystem.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000">
                        <button
                            onClick={onGetStarted}
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] font-black text-lg md:text-base text-white transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95"
                        >
                            <Rocket className="size-5 md:size-6" />
                            Start Earning Now
                        </button>
                        <button
                            onClick={onHowItWorks}
                            className="w-full sm:w-auto bg-white dark:bg-zinc-900/50 backdrop-blur-md hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] font-black text-lg md:text-base transition-all border border-zinc-200 dark:border-white/5 flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-sm dark:shadow-none"
                        >
                            See How it Works
                            <ArrowRight className="size-5 md:size-6" />
                        </button>
                    </div>

                    {/* Floating Stats */}
                    <div className="flex lg:grid overflow-x-auto lg:overflow-visible scrollbar-hide snap-x snap-mandatory gap-4 md:gap-8 max-w-5xl mx-auto mt-16 md:mt-40 -mx-4 px-4 md:mx-auto md:px-0 lg:grid-cols-4 animate-in fade-in duration-1000 delay-500">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={i} className="min-w-[65vw] sm:min-w-[250px] lg:min-w-0 snap-center group p-4 md:p-8 bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl md:rounded-[2.5rem] hover:border-blue-500/30 transition-all shadow-sm">
                                    <div className="size-8 md:size-12 bg-blue-500/10 rounded-lg md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 mx-auto group-hover:scale-110 transition-transform">
                                        <Icon className="size-4 md:size-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="text-2xl md:text-4xl font-black mb-1 tracking-tighter">{stat.value}</div>
                                    <div className="text-[8px] md:text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-24 px-4 md:px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">Engineered for Success</h2>
                        <p className="text-zinc-500 text-lg md:text-base font-medium">Simple steps to massive growth</p>
                    </div>

                    <div className="flex md:grid overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory gap-6 md:gap-10 pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 md:grid-cols-3">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="min-w-[80vw] sm:min-w-[400px] md:min-w-0 snap-center group relative">
                                    <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/5 rounded-2xl p-8 md:p-10 hover:border-blue-500/30 transition-all h-full relative shadow-sm dark:shadow-none">
                                        <div className="size-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-8">
                                            <Icon className="size-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">{feature.title}</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8">{feature.description}</p>
                                        <div className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:gap-3 transition-all cursor-pointer">
                                            Learn more <ArrowRight className="size-4" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Visual Demo Section */}
            <section className="py-20 md:py-24 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 relative overflow-hidden shadow-sm dark:shadow-none">
                        <div className="absolute top-0 right-0 size-[500px] bg-blue-600/5 blur-[120px]"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] tracking-tight text-zinc-900 dark:text-white">
                                    Trust & Transparency In Every Click
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-base mb-10 md:mb-12 leading-relaxed font-medium">
                                    Our proprietary algorithm ensures that every visit is genuine. No bots, no fake traffic—just real human engagement across all major platforms.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        'Encrypted visit verification system',
                                        'Advanced anti-bot protection layer',
                                        'Detailed analytics for every campaign',
                                        'Tiered reward system for power users'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-5">
                                            <div className="size-7 bg-blue-500/10 rounded-full flex items-center justify-center shadow-inner">
                                                <Check className="size-4 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span className="font-bold text-zinc-700 dark:text-zinc-300 text-lg">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="relative bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-3xl md:rounded-[2.5rem] p-5 md:p-8 shadow-sm">
                                    <div className="flex items-center justify-between mb-6 md:mb-10 pb-4 md:pb-6 border-b border-zinc-200 dark:border-white/10">
                                        <div className="font-black text-lg md:text-2xl tracking-tight text-zinc-900 dark:text-white">Real-time Feed</div>
                                        <div className="flex items-center gap-2">
                                            <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                            <span className="text-[8px] md:text-[10px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest">Live System</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 md:space-y-5">
                                        {[
                                            { user: 'Rahul.eth', action: 'Earned 15 pts', platform: 'YouTube', color: 'bg-red-500' },
                                            { user: 'Sanya_M', action: 'Boosted Campaign', platform: 'Website', color: 'bg-blue-500' },
                                            { user: 'John_D', action: 'Earned 20 pts', platform: 'Instagram', color: 'bg-pink-500' }
                                        ].map((log, i) => (
                                            <div key={i} className="flex flex-col xs:flex-row xs:items-center justify-between p-4 md:p-5 bg-white dark:bg-white/5 rounded-2xl md:rounded-3xl border border-zinc-100 dark:border-transparent hover:border-blue-500/30 transition-all shadow-sm dark:shadow-none group/item gap-3 xs:gap-0">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className={`size-10 md:size-12 ${log.color}/10 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-xs ${log.color.replace('bg-', 'text-')}`}>
                                                        {log.user[0]}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-black text-sm truncate">{log.user}</div>
                                                        <div className="text-[9px] md:text-[10px] text-zinc-400 dark:text-zinc-500 font-black uppercase tracking-widest">{log.platform}</div>
                                                    </div>
                                                </div>
                                                <div className="text-[9px] md:text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest xs:group-hover/item:translate-x-[-4px] transition-transform">{log.action}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-24 px-4 md:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none group">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 tracking-tight text-zinc-900 dark:text-white">
                                Scale your digital footprint.
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                                Join 50,000+ creators who are already growing their audience with NexusFlow. Start your journey today.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <button
                                    onClick={onGetStarted}
                                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20"
                                >
                                    Get Started for Free
                                </button>
                                <button
                                    onClick={onHowItWorks}
                                    className="w-full sm:w-auto bg-transparent hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10 px-8 py-3.5 rounded-xl font-bold text-sm transition-all"
                                >
                                    Documentation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-32 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-950 px-6 transition-colors">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
                        <div className="md:col-span-1">
                            <PlatformBranding />
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                                Building the world's most transparent and high-performance traffic exchange network.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-zinc-900 dark:text-zinc-300">Product</h4>
                            <ul className="space-y-5 text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                                <li><button onClick={onFeatures} className="hover:text-blue-600 dark:hover:text-white transition-colors">Features</button></li>
                                <li><button onClick={onPricing} className="hover:text-blue-600 dark:hover:text-white transition-colors">Pricing</button></li>
                                <li><button onClick={onHowItWorks} className="hover:text-blue-600 dark:hover:text-white transition-colors">How it Works</button></li>
                                <li><button onClick={onAbout} className="hover:text-blue-600 dark:hover:text-white transition-colors">About Us</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-zinc-900 dark:text-zinc-300">Resources</h4>
                            <ul className="space-y-5 text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                                <li><button onClick={onBlog} className="hover:text-blue-600 dark:hover:text-white transition-colors">Insights Blog</button></li>
                                <li><button onClick={onSupport} className="hover:text-blue-600 dark:hover:text-white transition-colors">Help Center</button></li>
                                <li><button onClick={onContact} className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact Support</button></li>
                                <li><button onClick={onSupport} className="hover:text-blue-600 dark:hover:text-white transition-colors">Community</button></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black uppercase tracking-widest text-xs mb-8 text-zinc-900 dark:text-zinc-300">Legal</h4>
                            <ul className="space-y-5 text-zinc-500 dark:text-zinc-400 font-bold text-sm">
                                <li><button onClick={onPrivacy} className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</button></li>
                                <li><button onClick={onTerms} className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms of Service</button></li>
                                <li><button onClick={onPrivacy} className="hover:text-blue-600 dark:hover:text-white transition-colors">Cookie Policy</button></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-zinc-500 dark:text-zinc-500 font-bold text-sm">
                            © 2026 NexusFlow Inc. Crafted with passion for creators worldwide.
                        </div>
                        <div className="flex items-center gap-10">
                            {['Twitter', 'GitHub', 'Discord'].map((social) => (
                                <button key={social} className="text-zinc-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-white transition-colors font-black uppercase tracking-widest text-[10px]">{social}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}