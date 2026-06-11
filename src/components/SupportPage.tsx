import { Zap, HelpCircle, Search, Mail, MessageCircle, FileText } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface SupportPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function SupportPage({ onBack, onGetStarted, theme, setTheme }: SupportPageProps) {
    const faqs = [
        {
            question: "How do I earn points?",
            answer: "You can earn points by navigating to the 'Earn Points' section in your dashboard and completing tasks such as visiting websites, watching videos, or following social media profiles. Points are credited instantly."
        },
        {
            question: "Are the points free?",
            answer: "Yes, you can earn points entirely for free by interacting with other members' content. Alternatively, you can purchase points directly from the Store if you want to run campaigns immediately without earning."
        },
        {
            question: "Is the traffic real?",
            answer: "Absolutely. TrafficHub operates on a community-exchange model. Every click and visit comes from another real user on the platform who is earning points by viewing your content."
        },
        {
            question: "Why was my campaign rejected?",
            answer: "Campaigns may be rejected if they violate our Terms of Service. We do not allow adult content, illegal materials, malicious software, or pages that break out of our viewing frames. Check your email for specific rejection reasons."
        },
        {
            question: "Can I use bots or scripts?",
            answer: "No. Using bots, macros, or automated scripts is strictly prohibited and will result in an immediate, permanent ban of your account and forfeiture of all points."
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

            {/* Header & Search */}
            <div className="bg-zinc-100 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
                <div className="max-w-4xl mx-auto px-6 pt-24 pb-28 text-center">
                    <div className="inline-flex items-center justify-center size-20 bg-blue-500/10 rounded-[2rem] mb-10 shadow-inner">
                        <HelpCircle className="size-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-black mb-10 tracking-tight">How can we help?</h1>
                    
                    <div className="relative max-w-2xl mx-auto group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-6 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search for answers..." 
                            className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl py-6 pl-16 pr-6 outline-none focus:border-blue-500 transition-all text-xl shadow-2xl dark:shadow-none text-zinc-900 dark:text-white font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: FileText, title: 'Getting Started', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-500/5', desc: 'Learn the basics of earning points and creating your first campaign.' },
                        { icon: Zap, title: 'Campaign Rules', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-500/5', desc: 'Understand what types of links are allowed and how approvals work.' },
                        { icon: Mail, title: 'Billing & Store', color: 'text-amber-500', bg: 'bg-amber-500/5', desc: 'Issues with point purchases, refunds, and premium upgrades.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-10 hover:border-blue-500/20 transition-all cursor-pointer group shadow-xl dark:shadow-none">
                            <item.icon className={`size-10 ${item.color} mb-8 group-hover:scale-110 transition-transform`} />
                            <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQs */}
            <div className="max-w-4xl mx-auto px-6 mt-32">
                <h2 className="text-4xl font-black mb-12 text-center tracking-tight">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 sm:p-10 shadow-sm dark:shadow-none">
                            <h3 className="text-2xl font-black mb-4 tracking-tight text-zinc-900 dark:text-zinc-200">{faq.question}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg leading-relaxed">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Still need help */}
            <div className="max-w-3xl mx-auto px-6 mt-32 text-center">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[3rem] p-12 shadow-xl dark:shadow-none">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-black uppercase tracking-widest text-xs">Can't find what you're looking for?</p>
                    <button className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 px-10 py-5 rounded-2xl font-black transition-all inline-flex items-center gap-3 shadow-2xl">
                        <MessageCircle className="size-6" />
                        Contact Support Team
                    </button>
                </div>
            </div>
        </div>
    );
}
