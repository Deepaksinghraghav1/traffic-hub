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
import { authService } from '../services/auth';

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
    const [authorized, setAuthorized] = useState(false);

    // God Mode Panel States
    const [targetEmail, setTargetEmail] = useState('');
    const [grantAmount, setGrantAmount] = useState(1000);
    const [targetPlan, setTargetPlan] = useState<'free' | 'pro' | 'business'>('free');
    const [updating, setUpdating] = useState(false);

    const handleGrantPoints = async () => {
        if (!targetEmail) return;
        setUpdating(true);
        try {
            const targetProfile = await databaseService.getProfile(targetEmail);
            if (!targetProfile) {
                alert("User profile not found!");
                return;
            }
            const newPoints = (targetProfile.points || 0) + Number(grantAmount);
            await databaseService.updatePoints(targetProfile.$id, newPoints);
            alert(`Successfully granted ${grantAmount} points to ${targetEmail}.`);
            setTargetEmail('');
        } catch (err: any) {
            alert(err.message || "Failed to update points.");
        } finally {
            setUpdating(false);
        }
    };

    const handleUpdatePlan = async () => {
        if (!targetEmail) return;
        setUpdating(true);
        try {
            const targetProfile = await databaseService.getProfile(targetEmail);
            if (!targetProfile) {
                alert("User profile not found!");
                return;
            }
            await databaseService.updatePlan(targetProfile.$id, targetPlan);
            alert(`Successfully updated plan of ${targetEmail} to ${targetPlan.toUpperCase()}.`);
            setTargetEmail('');
        } catch (err: any) {
            alert(err.message || "Failed to update plan.");
        } finally {
            setUpdating(false);
        }
    };

    const handleToggleVIP = async () => {
        if (!targetEmail) return;
        setUpdating(true);
        try {
            const targetProfile = await databaseService.getProfile(targetEmail);
            if (!targetProfile) {
                alert("User profile not found!");
                return;
            }
            const nextVip = !targetProfile.isVIP;
            await databaseService.updateVIPStatus(targetProfile.$id, nextVip);
            alert(`Successfully set VIP Status of ${targetEmail} to ${nextVip ? 'ACTIVE' : 'INACTIVE'}.`);
            setTargetEmail('');
        } catch (err: any) {
            alert(err.message || "Failed to update VIP status.");
        } finally {
            setUpdating(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await authService.getCurrentUser();
                if (user && user.email === 'deepak246124@gmail.com') {
                    setAuthorized(true);
                    await fetchData();
                } else {
                    window.location.href = '/';
                }
            } catch (err) {
                window.location.href = '/';
            }
        };
        checkAuth();
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

    if (!authorized) {
        return (
            <div className="text-center py-20 text-red-500 font-black uppercase tracking-widest text-xs">
                Access Denied. Redirecting...
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Users', value: initialStats.totalUsers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Active Campaigns', value: activeCampaigns.length, icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
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
            <div className="space-y-6">
                
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

            {/* God Mode Control Deck Panel */}
            <div className="bg-gradient-to-br from-purple-900/10 via-indigo-900/10 to-zinc-900 border border-purple-500/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-purple-900/20">
                <div className="absolute top-0 right-0 size-64 bg-purple-500/5 blur-3xl rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 size-64 bg-indigo-500/5 blur-3xl rounded-full"></div>
                
                <div className="relative z-10 flex flex-col gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-3">
                            <ShieldAlert className="size-4 text-purple-400" />
                            <span className="text-[10px] font-bold text-purple-300 uppercase tracking-widest">System Control</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">God Mode Control Deck</h3>
                        <p className="text-zinc-400 max-w-xl text-sm leading-relaxed mt-2 font-medium">
                            Direct database-level simulator tools. Search any active user email to grant coins, upgrade plan packages, or switch VIP status properties instantly.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
                        {/* Target User Finder */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Target User Email</label>
                            <input
                                type="email"
                                value={targetEmail}
                                onChange={(e) => setTargetEmail(e.target.value)}
                                placeholder="Enter user email..."
                                className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-3 px-4 outline-none focus:border-purple-500 transition-colors text-sm font-bold text-white placeholder-zinc-650"
                            />
                        </div>

                        {/* Grant points tools */}
                        <div className="space-y-2 bg-zinc-900/40 p-4 border border-zinc-800 rounded-2xl">
                            <label className="text-[10px] font-black uppercase tracking-widest text-purple-300">Grant Custom Points</label>
                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    value={grantAmount}
                                    onChange={(e) => setGrantAmount(Number(e.target.value))}
                                    className="w-1/2 bg-black/40 border border-zinc-800 rounded-xl py-2.5 px-3 outline-none focus:border-purple-500 text-xs font-bold text-white"
                                />
                                <button
                                    onClick={handleGrantPoints}
                                    disabled={updating || !targetEmail}
                                    className="w-1/2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:bg-zinc-800 disabled:text-zinc-600 shadow-md shadow-purple-600/10"
                                >
                                    Grant Pts
                                </button>
                            </div>
                        </div>

                        {/* Plan Upgraders */}
                        <div className="space-y-2 bg-zinc-900/40 p-4 border border-zinc-800 rounded-2xl">
                            <label className="text-[10px] font-black uppercase tracking-widest text-purple-300">Update User Plan</label>
                            <div className="flex gap-2">
                                <select
                                    value={targetPlan}
                                    onChange={(e) => setTargetPlan(e.target.value as any)}
                                    className="w-1/2 bg-black/40 border border-zinc-800 rounded-xl py-2.5 px-3 outline-none focus:border-purple-500 text-xs font-bold text-white"
                                >
                                    <option value="free">Free</option>
                                    <option value="pro">Pro</option>
                                    <option value="business">Business</option>
                                </select>
                                <button
                                    onClick={handleUpdatePlan}
                                    disabled={updating || !targetEmail}
                                    className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:bg-zinc-800 disabled:text-zinc-600 shadow-md shadow-indigo-600/10"
                                >
                                    Set Plan
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                        <button
                            onClick={handleToggleVIP}
                            disabled={updating || !targetEmail}
                            className="bg-zinc-100 hover:bg-white text-zinc-950 font-black text-xs uppercase tracking-widest py-3 px-6 rounded-2xl transition-all disabled:bg-zinc-800 disabled:text-zinc-600 shadow-md"
                        >
                            Toggle VIP Status
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
