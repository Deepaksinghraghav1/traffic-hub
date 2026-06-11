import { Zap, BookOpen, Clock, ArrowRight } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface BlogPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function BlogPage({ onBack, onGetStarted, theme, setTheme }: BlogPageProps) {
    const posts = [
        {
            title: "10 Proven Strategies to Increase Organic Traffic in 2026",
            excerpt: "Discover the latest SEO techniques and content strategies that are driving real, sustainable growth for top creators this year.",
            date: "May 2, 2026",
            readTime: "5 min read",
            category: "SEO",
            image: "bg-gradient-to-br from-blue-500 to-cyan-500"
        },
        {
            title: "Why Community-Driven Traffic Beats Paid Ads",
            excerpt: "An in-depth look at how peer-to-peer traffic exchange platforms like TrafficHub yield higher engagement rates than traditional CPC ads.",
            date: "April 28, 2026",
            readTime: "7 min read",
            category: "Marketing",
            image: "bg-gradient-to-br from-blue-600 to-pink-500"
        },
        {
            title: "Maximizing Your YouTube Views Safely",
            excerpt: "A comprehensive guide to boosting your YouTube algorithm presence without triggering spam filters or violating terms of service.",
            date: "April 15, 2026",
            readTime: "6 min read",
            category: "Social Media",
            image: "bg-gradient-to-br from-amber-500 to-orange-500"
        },
        {
            title: "The Future of Web Traffic Quality Control",
            excerpt: "How AI and machine learning are revolutionizing the way platforms detect bot traffic and ensure high-quality human interactions.",
            date: "March 30, 2026",
            readTime: "4 min read",
            category: "Technology",
            image: "bg-gradient-to-br from-emerald-500 to-teal-500"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 pb-20">
            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="size-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="size-6 text-white" />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hidden sm:block">TrafficHub</span>
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

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                    <BookOpen className="size-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">TrafficHub Insights</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight leading-[1.1]">Learn how to grow<br className="hidden sm:block" /> your audience</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                    Expert tips, growth hacks, and platform updates from the TrafficHub team.
                </p>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.map((post, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer flex flex-col shadow-sm dark:shadow-none">
                            {/* Image Placeholder */}
                            <div className={`w-full h-64 ${post.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-zinc-950/10 group-hover:bg-transparent transition-colors"></div>
                                <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                                    {post.category}
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 dark:text-zinc-500 mb-6 uppercase tracking-widest">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-2"><Clock className="size-4" /> {post.readTime}</span>
                                </div>
                                <h2 className="text-3xl font-black mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                    {post.title}
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 flex-1 font-medium text-lg">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs group/link">
                                    Read Article <ArrowRight className="size-5 group-hover/link:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Newsletter */}
            <div className="max-w-4xl mx-auto px-6 mt-32">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-10 sm:p-16 text-center shadow-xl dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 right-0 size-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4 tracking-tight">Never miss an update</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-10 max-w-md mx-auto font-medium text-lg">
                            Get the best traffic generation tips delivered straight to your inbox every month.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 focus:outline-none focus:border-blue-500 text-zinc-900 dark:text-white font-medium shadow-inner"
                            />
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
