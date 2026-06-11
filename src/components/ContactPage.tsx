import { Zap, Mail, MessageSquare, MapPin } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface ContactPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function ContactPage({ onBack, onGetStarted, theme, setTheme }: ContactPageProps) {
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
                <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Get in Touch</h1>
                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
                    Have a question, need support, or want to explore partnership opportunities? We're here to help.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-black mb-10 tracking-tight">Contact Information</h2>
                        
                        <div className="space-y-10">
                            <div className="flex items-start gap-6">
                                <div className="size-14 bg-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="size-7 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-2 tracking-tight">Email Support</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 mb-4 font-medium">Our team usually responds within 24 hours.</p>
                                    <a href="mailto:support@traffichub.com" className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg">support@traffichub.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="size-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <MessageSquare className="size-7 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-2 tracking-tight">Live Chat</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 mb-4 font-medium">Available for premium members 24/7 inside the dashboard.</p>
                                    <button onClick={onGetStarted} className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline text-lg">Sign in to chat</button>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="size-14 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="size-7 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black mb-2 tracking-tight">Headquarters</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed text-lg">
                                        123 Innovation Drive<br />
                                        Tech District, San Francisco<br />
                                        CA 94105, USA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl dark:shadow-none">
                        <h2 className="text-3xl font-black mb-8 tracking-tight">Send us a message</h2>
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">First Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John"
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium shadow-inner"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Doe"
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium shadow-inner"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Subject</label>
                                <div className="relative">
                                    <select className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium shadow-inner appearance-none">
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="billing">Billing Question</option>
                                        <option value="partnership">Partnership</option>
                                    </select>
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                                        <Zap className="size-4 rotate-180" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Message</label>
                                <textarea 
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium shadow-inner resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/25 uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
