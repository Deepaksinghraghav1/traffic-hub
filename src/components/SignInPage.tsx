import { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight, Github, Eye, EyeOff } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';
import { authService } from '../services/auth';

interface SignInPageProps {
    onSignIn: () => void;
    onSignUpClick: () => void;
    onBack: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function SignInPage({ onSignIn, onSignUpClick, onBack, theme, setTheme }: SignInPageProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authService.signIn(email, password);
            onSignIn();
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col lg:flex-row text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Left Side: Professional Hero */}
            <div className="hidden lg:flex lg:w-1/2 bg-black dark:bg-zinc-950 relative items-center justify-center overflow-hidden border-r border-white/5">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05]"></div>
                <div className="absolute top-1/4 left-1/4 size-96 bg-blue-600/10 rounded-full blur-[128px]"></div>

                <div className="relative z-10 max-w-md p-12">
                    <div className="mb-10">
                        <PlatformBranding />
                    </div>
                    <h2 className="text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                        Amplify your digital presence.
                    </h2>
                    <p className="text-zinc-400 text-lg font-medium leading-relaxed">
                        Join the world's most transparent traffic exchange ecosystem and watch your growth accelerate in real-time.
                    </p>
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 relative">
                {/* Theme Toggle & Back Button */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                    <button
                        onClick={onBack}
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors text-xs font-black uppercase tracking-widest flex items-center gap-2"
                    >
                        ← Home
                    </button>
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>

                <div className="w-full max-w-sm">
                    <div className="mb-10 lg:hidden text-center">
                        <div className="inline-flex size-12 bg-blue-600 rounded-xl items-center justify-center mb-4">
                            <Zap className="size-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight">Welcome Back</h1>
                    </div>

                    <div className="hidden lg:block mb-10">
                        <h1 className="text-3xl font-black tracking-tight mb-2">Sign In</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Continue your growth journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-3 pl-8 pr-4 outline-none focus:border-blue-600 transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[10px] font-black text-blue-600 hover:text-blue-500 uppercase tracking-widest">Forgot?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-3 pl-8 pr-10 outline-none focus:border-blue-600 transition-all text-sm font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-450 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 group uppercase tracking-widest text-[10px]"
                        >
                            {loading ? 'Signing in...' : 'Sign In to Account'}
                            {!loading && <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
                        </button>

                        <div className="relative py-4 flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-zinc-100 dark:border-white/5"></div>
                            </div>
                            <span className="relative px-4 bg-white dark:bg-black text-[10px] font-black text-zinc-400 uppercase tracking-widest">Or continue with</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => authService.signInWithGoogle()}
                            className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-blue-500/50 transition-all py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-sm"
                        >
                            <svg className="size-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-zinc-100 dark:border-white/5 text-center">
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                            New to NexusFlow? <button type="button" onClick={onSignUpClick} className="text-blue-600 dark:text-blue-400 hover:text-blue-500 font-bold transition-colors">Create account</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
