import { 
    Link2,
    ExternalLink, 
    Coins,
    ChevronRight,
    Search,
    Filter,
    Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { databaseService } from '../services/database';

interface EarnPointsViewProps {
    onTaskClick: (campaign: any) => void;
}

export function EarnPointsView({ onTaskClick }: EarnPointsViewProps) {
    const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActiveCampaigns();
    }, []);

    const fetchActiveCampaigns = async () => {
        try {
            const all = await databaseService.getAllCampaigns();
            const active = all.filter((c: any) => c.status === 'active' && c.pointsRemaining > 0);
            setActiveCampaigns(active);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin size-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400 dark:text-zinc-500" />
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-3 pl-12 pr-4 focus:border-blue-500 transition-colors outline-none text-sm shadow-sm dark:shadow-none font-bold"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide md:flex-nowrap">
                    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-600/20">
                        All Tasks
                    </button>
                    <button className="flex-shrink-0 flex items-center gap-2 px-4 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-400">
                        High Reward
                    </button>
                </div>
            </div>

            {/* Tasks Grid */}
            {activeCampaigns.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900/40 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
                    <Globe className="size-16 text-zinc-200 dark:text-zinc-800 mx-auto mb-4" />
                    <h3 className="text-xl font-black mb-2">No Active Tasks</h3>
                    <p className="text-zinc-500 max-w-xs mx-auto font-medium">Check back later or create your own campaign!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeCampaigns.map((task) => (
                        <div
                            key={task.$id}
                            className="group bg-white dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:border-blue-500/30 dark:hover:border-zinc-600 transition-all duration-300 flex flex-col h-full relative overflow-hidden shadow-sm dark:shadow-none"
                        >
                            <div className="absolute -top-12 -right-12 size-24 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>

                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className={`size-12 rounded-2xl flex items-center justify-center bg-blue-500/10 text-blue-500 shadow-lg shadow-current/10 group-hover:scale-110 transition-transform`}>
                                    <Link2 className="size-6" />
                                </div>
                                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black bg-emerald-400/10 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">
                                    <Coins className="size-3.5" />
                                    +10
                                </div>
                            </div>

                            <div className="flex-1 relative z-10">
                                <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">Website Traffic</div>
                                <h3 className="font-bold text-base sm:text-lg mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{task.title}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed font-medium">
                                    Visit this link to claim your reward points.
                                </p>
                            </div>

                            <button
                                onClick={() => onTaskClick(task)}
                                className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 dark:hover:bg-blue-600 text-zinc-900 dark:text-white hover:text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 relative z-10 group-hover:shadow-lg group-hover:shadow-blue-600/20"
                            >
                                Visit & Earn
                                <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
