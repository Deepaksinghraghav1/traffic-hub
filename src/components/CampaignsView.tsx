import {
    Link2,
    Plus,
    MousePointerClick,
    TrendingUp,
    Clock,
    Pause,
    Play,
    MoreVertical,
    X,
    AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { databaseService } from '../services/database';

const ALLOWED_DOMAINS = [
    'gplinks.co',
    'gplinks.in',
    'droplink.co',
    'shrinkme.io',
    'shrinkearn.com',
    'clk.sh',
    'ouo.io',
    'ouo.press',
    'shortzon.com',
    'za.gl',
    'cuty.io',
    'clicksfly.com',
    'adpaylink.com',
    'urlpay.in',
    'bit.ly',
    'tinyurl.com',
    'youtube.com',
    'youtu.be',
    'instagram.com',
    'facebook.com'
];


interface CampaignsViewProps {
    userId: string;
    userEmail: string;
    userPoints: number;
    onPointsUpdate: (newPoints: number) => void;
    userPlan: 'free' | 'pro' | 'business';
    isAdmin?: boolean;
}

export function CampaignsView({ userId, userEmail, userPoints, onPointsUpdate, userPlan, isAdmin = false }: CampaignsViewProps) {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [points, setPoints] = useState(100);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, [userId]);

    const fetchCampaigns = async () => {
        try {
            const data = await databaseService.getUserCampaigns(userId);
            setCampaigns(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (points > userPoints) {
            setError('Not enough points! Go earn some more.');
            return;
        }

        if (!url.startsWith('http')) {
            setError('Please enter a valid URL (starting with http/https)');
            return;
        }

        let userDomain = '';
        try {
            userDomain = new URL(url).hostname.toLowerCase();
        } catch (e) {
            setError('Please enter a valid URL format.');
            return;
        }

        const isAllowed = ALLOWED_DOMAINS.some(domain => userDomain === domain || userDomain.endsWith('.' + domain));
        if (!isAllowed) {
            setError('Bhai, sirf approved aur safe shorteners/platforms hi allowed hain!');
            return;
        }

        // Campaign Limit Enforcement
        const activeCount = campaigns.filter(c => c.status === 'active' || c.status === 'pending').length;
        if (!isAdmin && userPlan === 'free' && activeCount >= 1) {
            setError('Free users are limited to 1 active/pending campaign. Upgrade to Pro in Settings for up to 10!');
            return;
        }
        if (!isAdmin && userPlan === 'pro' && activeCount >= 10) {
            setError('Pro users are limited to 10 active/pending campaigns. Upgrade to Business in Settings for unlimited!');
            return;
        }

        setSubmitting(true);
        try {
            // 1. Create Campaign
            await databaseService.createCampaign({
                userId,
                title,
                url,
                pointsAllocated: points
            });

            // 2. Deduct Points from Database
            const profile = await databaseService.getProfile(userEmail);
            if (profile) {
                const newPoints = profile.points - points;
                await databaseService.updatePoints(profile.$id, newPoints);
                onPointsUpdate(newPoints);
            }

            // 3. Reset and Refresh
            setTitle('');
            setUrl('');
            setPoints(100);
            setIsModalOpen(false);
            fetchCampaigns();
        } catch (err) {
            setError('Failed to create campaign. Try again.');
        } finally {
            setSubmitting(false);
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold">Your Campaigns</h2>
                    <p className="text-zinc-500 text-sm">Manage and track your active traffic streams</p>
                </div>
                <button
                    onClick={() => {
                        const activeCount = campaigns.filter(c => c.status === 'active' || c.status === 'pending').length;
                        if (!isAdmin && userPlan === 'free' && activeCount >= 1) {
                            alert("Free plan users can only run 1 active campaign at a time. Upgrade to Pro in Settings to run up to 10 campaigns!");
                            return;
                        }
                        if (!isAdmin && userPlan === 'pro' && activeCount >= 10) {
                            alert("Pro plan users can only run 10 active campaigns at a time. Upgrade to Business in Settings to run unlimited campaigns!");
                            return;
                        }
                        setIsModalOpen(true);
                    }}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 px-6 py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                    <Plus className="size-5" />
                    New Campaign
                </button>
            </div>

            {campaigns.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900/40 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-12 text-center">
                    <div className="size-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Link2 className="size-8 text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-black mb-2">No Campaigns Yet</h3>
                    <p className="text-zinc-500 max-w-xs mx-auto mb-8 font-medium">Create your first traffic campaign to start getting real visitors to your link.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 font-black text-xs uppercase tracking-widest hover:underline"
                    >
                        Create My First Campaign
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {campaigns.map((campaign) => (
                        <div key={campaign.$id} className="group bg-white dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all shadow-sm dark:shadow-none">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Link2 className="size-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-lg truncate mb-1">{campaign.title}</h3>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-sm truncate font-medium">{campaign.url}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 md:gap-12">
                                    <div className="text-left sm:text-center">
                                        <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 mb-1 flex items-center gap-1.5 justify-start sm:justify-center uppercase tracking-widest">
                                            <MousePointerClick className="size-3.5" /> Visits
                                        </div>
                                        <div className="text-xl font-black">{campaign.clicks || 0}</div>
                                    </div>
                                    <div className="text-left sm:text-center">
                                        <div className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 mb-1 flex items-center gap-1.5 justify-start sm:justify-center uppercase tracking-widest">
                                            <TrendingUp className="size-3.5 text-amber-500" /> Remaining
                                        </div>
                                        <div className="text-xl font-black text-amber-600 dark:text-amber-400 truncate">{campaign.pointsRemaining} pts</div>
                                    </div>
                                    <div className="col-span-2 sm:col-auto flex items-center justify-between sm:justify-start gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${campaign.status === 'active'
                                                ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 border-zinc-200'
                                            }`}>
                                            {campaign.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create Campaign Modal */}
            {isModalOpen && createPortal(
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <div className="p-8 sm:p-10">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-black tracking-tight">Create New Campaign</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                                    <X className="size-6 text-zinc-400" />
                                </button>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold">
                                    <AlertCircle className="size-5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Campaign Title</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. My Website Launch"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Target URL</label>
                                    <input
                                        type="url"
                                        required
                                        placeholder="https://yourlink.com"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Points to Allocate</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            required
                                            min="100"
                                            step="50"
                                            value={points}
                                            onChange={(e) => setPoints(parseInt(e.target.value))}
                                            className="flex-1 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                        />
                                        <div className="text-right">
                                            <div className="text-[10px] font-black text-zinc-400 uppercase">Available</div>
                                            <div className="text-sm font-black">{userPoints.toLocaleString()} pts</div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-400 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
                                >
                                    {submitting ? 'Creating...' : 'Launch Campaign'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
