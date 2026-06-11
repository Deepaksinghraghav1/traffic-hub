import { 
    TrendingUp, 
    MousePointerClick, 
    Award, 
    Link2, 
    Zap,
    ArrowUpRight,
    Activity,
    Copy,
    CheckCircle2,
    Crown,
    Lock
} from 'lucide-react';
import { useState } from 'react';

interface ActivityItem {
    user: string;
    action: string;
    amount: string;
    time: string;
}

interface DashboardViewProps {
    userPoints: number;
    referralCode: string;
    stats: {
        totalClicks: number;
        pointsToday: number;
        runningCampaigns: number;
    };
    recentActivity: ActivityItem[];
    onEarnClick: () => void;
    userPlan: 'free' | 'pro' | 'business';
    onUpgradeClick: () => void;
    isAdmin?: boolean;
}

export function DashboardView({ userPoints, referralCode, stats, recentActivity = [], onEarnClick, userPlan, onUpgradeClick, isAdmin = false }: DashboardViewProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (!referralCode) return;
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Safe stats with defaults
    const safeStats = {
        totalClicks: stats?.totalClicks || 0,
        pointsToday: stats?.pointsToday || 0,
        runningCampaigns: stats?.runningCampaigns || 0
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700 pb-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 hover:border-blue-500/50 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="size-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                            <MousePointerClick className="size-6 text-blue-500" />
                        </div>
                        <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full flex items-center gap-1">
                            <TrendingUp className="size-3" /> Live
                        </span>
                    </div>
                    <div className="text-3xl font-black mb-1">{safeStats.totalClicks}</div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Clicks Received</div>
                </div>

                <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 hover:border-amber-500/50 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="size-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                            <Award className="size-6 text-amber-500" />
                        </div>
                        <span className="text-amber-500 text-xs font-bold bg-amber-500/10 px-2 py-1 rounded-full">Daily</span>
                    </div>
                    <div className="text-3xl font-black mb-1">+{safeStats.pointsToday}</div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Points Earned Today</div>
                </div>

                <div className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 hover:border-purple-500/50 transition-all shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="size-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                            <Link2 className="size-6 text-purple-500" />
                        </div>
                        <span className="text-purple-500 text-xs font-bold bg-purple-500/10 px-2 py-1 rounded-full uppercase tracking-widest text-[8px]">
                            {safeStats.runningCampaigns > 0 ? 'Active' : 'Idle'}
                        </span>
                    </div>
                    <div className="text-3xl font-black mb-1">{safeStats.runningCampaigns}</div>
                    <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Running Campaigns</div>
                </div>
            </div>

            {/* Main Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Promo Banner */}
                <div className="lg:col-span-8 bg-blue-600 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl shadow-blue-500/20">
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6 text-white text-[10px] font-black uppercase tracking-widest">
                            <Zap className="size-4 text-amber-300 fill-amber-300" /> Flash Boost
                        </div>
                        <h2 className="text-4xl font-black text-white mb-4 leading-tight">Scale your reach <br/> in real-time.</h2>
                        <p className="text-blue-100 mb-8 max-w-sm font-medium opacity-80">Complete premium tasks to unlock bonus multipliers and grow faster.</p>
                        <button onClick={onEarnClick} className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2">
                            Start Earning <ArrowUpRight className="size-5" />
                        </button>
                    </div>
                    <Zap className="absolute -right-10 top-1/2 -translate-y-1/2 size-64 text-white/10 group-hover:rotate-12 transition-transform duration-700" />
                </div>

                {/* Referral Box */}
                <div className="lg:col-span-4 bg-zinc-950 rounded-[2.5rem] p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Award className="size-24 text-white" />
                    </div>
                    
                    <div className="relative z-10">
                        <h3 className="text-white font-black text-xl mb-2">Invite Friends</h3>
                        <p className="text-zinc-500 text-xs font-medium mb-8">Earn 100 points for every friend who joins using your unique code.</p>
                        
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 group relative">
                            <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Referral Code</div>
                            <div className="flex items-center justify-between">
                                <code className="text-2xl font-black text-white tracking-[0.2em]">{referralCode || 'TH-XXXX'}</code>
                                <button 
                                    onClick={handleCopy}
                                    className={`p-3 rounded-xl transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`}
                                >
                                    {copied ? <CheckCircle2 className="size-5" /> : <Copy className="size-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 relative z-10">
                        <div className="size-10 bg-amber-500 rounded-xl flex items-center justify-center text-black">
                            <Zap className="size-5 fill-black" />
                        </div>
                        <div className="text-[10px] font-black text-amber-500 uppercase leading-tight">Friend gets 50 PTS <br/> joining bonus!</div>
                    </div>
                </div>
            </div>

            {/* Advanced Analytics Section */}
            <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-6 md:p-8 shadow-sm">
                {!isAdmin && userPlan === 'free' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md z-10 rounded-[2.5rem] text-center border border-zinc-200/50 dark:border-white/5">
                        <div className="size-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20 shadow-lg animate-pulse">
                            <Crown className="size-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-xl font-black mb-2 tracking-tight">Unlock Advanced Analytics</h3>
                        <p className="text-zinc-500 text-sm max-w-sm mb-6 font-medium">Upgrade to Pro or Business to unlock real-time traffic statistics, geographical traffic tracking, and device breakdown logs.</p>
                        <button onClick={onUpgradeClick} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 active:scale-95">
                            Upgrade to Pro
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black flex items-center gap-3">
                        <TrendingUp className="size-6 text-blue-500" /> Advanced Traffic Analytics
                    </h3>
                    <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest">
                        {(!isAdmin && userPlan === 'free') ? 'Locked' : 'Live Data'}
                    </span>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 ${(!isAdmin && userPlan === 'free') ? 'blur-sm select-none pointer-events-none' : ''}`}>
                    {/* Traffic Chart */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">24-Hour Traffic Trend</div>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 h-60 flex flex-col justify-between">
                            <div className="flex justify-between items-center text-xs text-zinc-400 font-bold">
                                <span>120 visits / hr avg</span>
                                <span className="text-emerald-500">+12% vs yesterday</span>
                            </div>
                            {/* Mock SVG Line Chart */}
                            <div className="w-full flex-1 flex items-end pt-4">
                                <svg viewBox="0 0 500 150" className="w-full h-32 overflow-visible">
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4"/>
                                            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0"/>
                                        </linearGradient>
                                    </defs>
                                    {/* Grid Lines */}
                                    <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#e4e4e7" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
                                    <line x1="0" y1="75" x2="500" y2="75" stroke="#e4e4e7" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
                                    <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#e4e4e7" strokeDasharray="4 4" className="dark:stroke-zinc-800" />
                                    {/* Area */}
                                    <path d="M 0 150 Q 50 80, 100 120 T 200 60 T 300 40 T 400 90 T 500 30 L 500 150 Z" fill="url(#chartGradient)" />
                                    {/* Line */}
                                    <path d="M 0 150 Q 50 80, 100 120 T 200 60 T 300 40 T 400 90 T 500 30" fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                                    {/* Dots */}
                                    <circle cx="200" cy="60" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2" className="dark:stroke-zinc-950" />
                                    <circle cx="300" cy="40" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2" className="dark:stroke-zinc-950" />
                                    <circle cx="500" cy="30" r="6" fill="#2563eb" stroke="#ffffff" strokeWidth="2" className="dark:stroke-zinc-950" />
                                </svg>
                            </div>
                            <div className="flex justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-widest pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                                <span>Now</span>
                            </div>
                        </div>
                    </div>

                    {/* Geography Breakdown */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Top Traffic Sources</div>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 h-60 flex flex-col justify-between">
                            <div className="space-y-3">
                                {[
                                    { country: '🇺🇸 United States', percentage: 45, color: 'bg-blue-600' },
                                    { country: '🇮🇳 India', percentage: 30, color: 'bg-emerald-600' },
                                    { country: '🇬🇧 United Kingdom', percentage: 15, color: 'bg-purple-600' },
                                    { country: '🇩🇪 Germany', percentage: 10, color: 'bg-amber-600' }
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-1">
                                        <div className="flex justify-between text-xs font-bold">
                                            <span>{item.country}</span>
                                            <span>{item.percentage}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Device Breakdown */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Device Breakdown</div>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-6 h-60 flex flex-col justify-between">
                            <div className="flex justify-around items-center h-full py-4">
                                {[
                                    { label: 'Mobile', value: '60%', desc: 'Smartphones' },
                                    { label: 'Desktop', value: '35%', desc: 'PCs & Laptops' },
                                    { label: 'Tablet', value: '5%', desc: 'iPad & Android' }
                                ].map((item, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-2xl font-black text-zinc-900 dark:text-white">{item.value}</div>
                                        <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">{item.label}</div>
                                        <div className="text-[9px] text-zinc-400 font-medium">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity Bottom */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black flex items-center gap-3">
                        <Activity className="size-6 text-blue-500" /> Recent Activity
                    </h3>
                    <button className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-blue-500 transition-colors">History</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentActivity && recentActivity.length > 0 ? (
                        recentActivity.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {item.user ? item.user[0] : '?'}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">{item.user || 'Unknown'}</div>
                                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{item.time || 'Just now'}</div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">{item.amount || '+0'}</div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-zinc-400 text-xs font-black uppercase tracking-widest opacity-50">No activity yet</div>
                    )}
                </div>
            </div>
        </div>
    );
}
