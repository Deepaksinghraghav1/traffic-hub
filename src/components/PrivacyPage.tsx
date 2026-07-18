import { Zap } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface PrivacyPageProps {
    onBack: () => void;
    onGetStarted: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function PrivacyPage({ onBack, onGetStarted, theme, setTheme }: PrivacyPageProps) {
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
                    <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">Privacy Policy</h1>
                    <p className="text-zinc-500 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs">Last updated: May 1, 2026</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-14 shadow-xl dark:shadow-none space-y-12">
                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">1. Introduction</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            Welcome to NexusFlow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">2. Data We Collect</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 font-medium text-lg">
                            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { title: 'Identity Data', desc: 'Includes first name, last name, username or similar identifier.' },
                                { title: 'Contact Data', desc: 'Includes email address and physical address.' },
                                { title: 'Technical Data', desc: 'Includes IP address, login data, browser type and version.' },
                                { title: 'Usage Data', desc: 'Includes information about how you use our website and services.' }
                            ].map((item, i) => (
                                <div key={i} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                                    <h4 className="font-black text-sm uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">{item.title}</h4>
                                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">3. How We Use Your Data</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6 font-medium text-lg">
                            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Where we need to perform the contract we are about to enter into.',
                                'Where it is necessary for our legitimate interests.',
                                'Where we need to comply with a legal or regulatory obligation.'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-zinc-600 dark:text-zinc-300 font-bold">
                                    <div className="size-2 bg-blue-500 rounded-full"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">4. Data Security</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-black mb-6 tracking-tight">5. Your Legal Rights</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium text-lg">
                            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and to withdraw consent.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
