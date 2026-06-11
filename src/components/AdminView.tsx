import { 
    Users, 
    BarChart3, 
    CheckCircle2, 
    XCircle, 
    Clock,
    Trash2,
    ShieldAlert,
    ExternalLink,
    Zap
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { databaseService } from '../services/database';

interface AdminViewProps {
    stats: {
        totalUsers: number;
        totalCampaigns: number;
        pendingTasks: number;
        revenue: string;
    };
}

export function AdminView({ stats: initialStats }: AdminViewProps) {
    const [pendingCampaigns, setPendingCampaigns] = useState<any[]>([]);
    const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const all = await databaseService.getAllCampaigns();
            setPendingCampaigns(all.filter((c: any) => c.status === 'pending'));
            setActiveCampaigns(all.filter((c: any) => c.status === 'active'));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await databaseService.updateCampaignStatus(id, 'active');
            fetchData();
        } catch (err) {
            alert('Approval failed!');
        }
    };

    const handleReject = async (id: string) => {
        try {
            await databaseService.updateCampaignStatus(id, 'rejected');
            fetchData();
        } catch (err) {
            alert('Rejection failed!');
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this campaign permanently?')) return;
        
        setLoading(true);
        try {
            await databaseService.deleteCampaign(id);
            // Wait a small moment for Appwrite to sync
            setTimeout(async () => {
                await fetchData();
                setLoading(false);
            }, 500);
        } catch (err) {
            console.error(err);
            alert('Delete failed! Check if you enabled "Delete" permission in Appwrite Settings.');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin size-8 border-4 border-purple-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black tracking-tight mb-2">Admin Dashboard</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium">System overview and management</p>
                </div>
                <div className="bg-purple-600/10 text-purple-600 px-4 py-2 rounded-xl border border-purple-600/20 flex items-center gap-2">
                    <ShieldAlert className="size-5" />
                    <span className="font-bold text-sm uppercase tracking-widest">Admin Mode</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: initialStats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Active Campaigns', value: activeCampaigns.length, icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Pending Approval', value: pendingCampaigns.length, icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                    { label: 'System Balance', value: initialStats.revenue, icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                                <stat.icon className="size-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{stat.label}</span>
                        </div>
                        <div className="text-3xl font-black tracking-tight">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Campaign Management Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Pending Requests */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between bg-amber-50/50 dark:bg-amber-500/5">
                        <div className="flex items-center gap-3">
                            <Clock className="size-5 text-amber-500" />
                            <h3 className="text-lg font-black tracking-tight">Pending Approval</h3>
                        </div>
                        <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{pendingCampaigns.length}</span>
                    </div>

                    <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                        {pendingCampaigns.length === 0 ? (
                            <div className="text-center py-12 text-zinc-400 text-xs font-bold uppercase tracking-widest">No pending requests</div>
                        ) : (
                            pendingCampaigns.map((camp) => (
                                <div key={camp.$id} className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-bold text-sm truncate pr-4">{camp.title}</div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleDelete(camp.$id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="size-4" />
                                            </button>
                                            <button onClick={() => handleApprove(camp.$id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                                                <CheckCircle2 className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-zinc-400 truncate mb-2">{camp.url}</div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded-md">{camp.pointsAllocated} PTS</span>
                                        <a href={camp.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline text-[10px] font-bold flex items-center gap-1">
                                            Preview <ExternalLink className="size-3" />
                                        </a>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Active Campaigns (Management) */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-zinc-100 dark:border-white/5 flex items-center justify-between bg-emerald-50/50 dark:bg-emerald-500/5">
                        <div className="flex items-center gap-3">
                            <Zap className="size-5 text-emerald-500" />
                            <h3 className="text-lg font-black tracking-tight">Active Campaigns</h3>
                        </div>
                        <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{activeCampaigns.length}</span>
                    </div>

                    <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                        {activeCampaigns.length === 0 ? (
                            <div className="text-center py-12 text-zinc-400 text-xs font-bold uppercase tracking-widest">No active campaigns</div>
                        ) : (
                            activeCampaigns.map((camp) => (
                                <div key={camp.$id} className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-white/5 group">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="font-bold text-sm truncate pr-4">{camp.title}</div>
                                        <button onClick={() => handleDelete(camp.$id)} className="p-2 text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>
                                    <div className="text-[10px] text-zinc-400 truncate mb-3">{camp.url}</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-4">
                                            <div className="text-center">
                                                <div className="text-[8px] font-black text-zinc-400 uppercase">Clicks</div>
                                                <div className="text-xs font-black">{camp.clicks || 0}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-[8px] font-black text-zinc-400 uppercase">Points left</div>
                                                <div className="text-xs font-black text-amber-500">{camp.pointsRemaining}</div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[8px] font-black rounded-md uppercase tracking-widest">LIVE</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
