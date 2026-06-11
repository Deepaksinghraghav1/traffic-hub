import { 
    Coins, 
    Gift, 
    Trophy, 
    Zap, 
    Star, 
    Crown,
    ArrowUpRight,
    Sparkles,
    ShoppingBag
} from 'lucide-react';

interface StorePageProps {
    userPoints: number;
    onPurchase: (cost: number) => void;
}

export function StorePage({ userPoints, onPurchase }: StorePageProps) {
    const items = [
        {
            id: 1,
            name: 'Daily Bonus Pack',
            icon: Coins,
            cost: 0,
            description: 'Claim your daily login reward and boost your balance.',
            color: 'from-amber-400 to-orange-500',
            badge: 'Daily Free'
        },
        {
            id: 2,
            name: 'Premium Identity',
            icon: Crown,
            cost: 500,
            description: 'Get a unique profile glow and premium badge next to your name.',
            color: 'from-blue-600 to-indigo-600',
            badge: null
        },
        {
            id: 3,
            name: 'Turbo Multiplier',
            icon: Zap,
            cost: 1000,
            description: 'Earn 5x points for every task completed for the next 24 hours.',
            color: 'from-blue-400 to-cyan-500',
            badge: 'Hot Item'
        },
        {
            id: 4,
            name: 'Featured Campaign',
            icon: Star,
            cost: 2000,
            description: 'Place your campaign at the top of the "Earn" list for 7 days.',
            color: 'from-purple-500 to-pink-500',
            badge: 'Limited'
        },
        {
            id: 5,
            name: 'Mastery Trophy',
            icon: Trophy,
            cost: 3000,
            description: 'Exclusive digital asset to showcase your mastery of the platform.',
            color: 'from-green-500 to-emerald-600',
            badge: null
        },
        {
            id: 6,
            name: 'VIP Concierge',
            icon: Gift,
            cost: 5000,
            description: 'Access to priority support channel and early feature beta testing.',
            color: 'from-rose-500 to-pink-600',
            badge: 'Elite Only'
        }
    ];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Store Header */}
            <div className="relative group overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-600/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="absolute -top-24 -right-24 size-64 bg-white/10 blur-3xl rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-3 md:mb-4">
                            <ShoppingBag className="size-4 text-blue-100" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Premium Marketplace</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 tracking-tight">Traffic Store</h2>
                        <p className="text-blue-100 max-w-md text-base md:text-lg leading-relaxed">
                            Upgrade your experience with exclusive rewards and powerful boosters.
                        </p>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl md:rounded-3xl p-5 md:p-8 w-full md:w-auto md:min-w-[240px] shadow-2xl shadow-blue-950/20 group-hover:scale-105 transition-transform duration-500">
                        <div className="text-[10px] md:text-xs font-bold text-blue-200 uppercase tracking-widest mb-1 md:mb-2">Available Balance</div>
                        <div className="text-3xl md:text-5xl font-black text-white flex items-center justify-center md:justify-start gap-2 md:gap-3">
                            <Coins className="size-6 md:size-10 text-amber-400 fill-amber-400/20" />
                            {userPoints.toLocaleString()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item) => {
                    const Icon = item.icon;
                    const canAfford = userPoints >= item.cost;

                    return (
                        <div
                            key={item.id}
                            className="group bg-white dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 hover:border-blue-500/30 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col relative overflow-hidden shadow-sm dark:shadow-none"
                        >
                            {/* Decorative Glow */}
                            <div className={`absolute -top-12 -right-12 size-24 bg-gradient-to-br ${item.color} opacity-5 blur-2xl group-hover:opacity-20 transition-opacity`}></div>

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className={`size-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                                    <Icon className="size-8 text-white" />
                                </div>
                                {item.badge && (
                                    <span className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 relative z-10">
                                <h3 className="text-xl sm:text-2xl font-black mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.name}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-8 font-medium">{item.description}</p>
                            </div>

                             <div className="flex flex-col xs:flex-row items-center justify-between gap-4 pt-6 md:pt-8 border-t border-zinc-100 dark:border-white/5 relative z-10">
                                <div className="flex flex-col items-center xs:items-start">
                                    <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">Cost</div>
                                    <div className="flex items-center gap-1.5 text-xl font-black text-amber-600 dark:text-amber-400">
                                        <Coins className="size-5" />
                                        {item.cost === 0 ? 'FREE' : item.cost.toLocaleString()}
                                    </div>
                                </div>
                                <button
                                    onClick={() => canAfford && onPurchase(item.cost)}
                                    disabled={!canAfford}
                                    className={`w-full xs:w-auto px-8 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${canAfford
                                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95'
                                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                        }`}
                                >
                                    {canAfford ? 'Redeem' : 'Locked'}
                                    {canAfford && <ArrowUpRight className="size-4" />}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Featured Luxury Offer */}
            <div className="group relative bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 rounded-3xl md:rounded-[3rem] p-6 md:p-16 overflow-hidden shadow-2xl shadow-orange-600/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <div className="absolute -bottom-24 -left-24 size-96 bg-white/10 blur-[100px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
                
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-4 md:mb-6 mx-auto md:mx-0">
                            <Sparkles className="size-5 text-amber-200" />
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Flash Sale Active</span>
                        </div>
                        <h3 className="text-2xl md:text-5xl font-black text-white mb-4 md:mb-6 leading-tight">Elite Expansion Pack</h3>
                        <p className="text-amber-100 text-base md:text-xl mb-8 md:mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
                            Unlock 10,000 points and a unique VIP badge instantly. Save 25% for the next 2 hours.
                        </p>
                        <button
                            onClick={() => userPoints >= 7500 && onPurchase(7500)}
                            disabled={userPoints < 7500}
                            className={`w-full sm:w-auto bg-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-lg md:text-xl transition-all shadow-2xl flex items-center justify-center gap-3 mx-auto md:mx-0 ${userPoints >= 7500
                                    ? 'text-orange-600 hover:bg-orange-50 hover:scale-105 active:scale-95'
                                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                                }`}
                        >
                            Claim for 7,500 pts
                            <ArrowUpRight className="size-5 md:size-6" />
                        </button>
                    </div>
                    
                    <div className="relative flex justify-center items-center py-8 md:py-0">
                        <div className="absolute inset-0 bg-white/20 blur-[80px] rounded-full opacity-50"></div>
                        <Gift className="size-32 md:size-64 text-white opacity-20 group-hover:rotate-12 transition-transform duration-700 animate-float" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                             <Crown className="size-16 md:size-32 text-amber-200 fill-amber-200/20 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}