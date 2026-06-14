import { useState, useEffect } from 'react';
import { ThemeToggle } from './components/ThemeToggle';
import {
    LayoutDashboard,
    Zap,
    Link2,
    Store,
    Settings,
    Coins,
    Youtube,
    ExternalLink,
    Instagram,
    Twitter,
    ChevronLeft,
    Bell,
    Search,
    ShieldCheck,
    Sparkles
} from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { PricingPage } from './components/PricingPage';
import { StorePage } from './components/StorePage';
import { SettingsPage } from './components/SettingsPage';
import { SignInPage } from './components/SignInPage';
import { SignUpPage } from './components/SignUpPage';
import { FeaturesPage } from './components/FeaturesPage';
import { AboutPage } from './components/AboutPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { SupportPage } from './components/SupportPage';

// New Refactored Views
import { DashboardView } from './components/DashboardView';
import { EarnPointsView } from './components/EarnPointsView';
import { CampaignsView } from './components/CampaignsView';
import { AdminView } from './components/AdminView';
import { authService } from './services/auth';
import { databaseService } from './services/database';
import { Models } from 'appwrite';

type Page = 'landing' | 'howItWorks' | 'pricing' | 'dashboard' | 'signIn' | 'signUp' | 'features' | 'about' | 'blog' | 'contact' | 'privacy' | 'terms' | 'support';
type DashboardTab = 'dashboard' | 'earn' | 'campaigns' | 'store' | 'settings' | 'admin';

type NavItem = {
    icon: any;
    label: string;
    id: DashboardTab;
};

type TaskCard = {
    id: number;
    title: string;
    category: string;
    icon: any;
    points: number;
    color: string;
};

export default function App() {
    const [currentPage, setCurrentPage] = useState<Page>('landing');
    const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
    const [userPoints, setUserPoints] = useState(0);
    const [userRole, setUserRole] = useState<'user' | 'admin'>('user');
    const [userReferralCode, setUserReferralCode] = useState('');
    const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'business'>('free');
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);
    const [dashboardStats, setDashboardStats] = useState({
        totalClicks: 0,
        pointsToday: 0,
        runningCampaigns: 0
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [analyticsData, setAnalyticsData] = useState({
        hourlyTraffic: Array(24).fill(0),
        topCampaigns: [] as { title: string; percentage: number; clicks: number }[],
        timings: { morning: 0, afternoon: 0, evening: 0, night: 0 }
    });
    const [dashboardDataLoading, setDashboardDataLoading] = useState(true);

    // Verification Timer States
    const [timerModalOpen, setTimerModalOpen] = useState(false);
    const [verifyingCampaign, setVerifyingCampaign] = useState<any | null>(null);
    const [countdown, setCountdown] = useState(15);
    const [isTimerFinished, setIsTimerFinished] = useState(false);

    // Notification States
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Welcome to TrafficHub!',
            message: 'Start earning points by visiting other user campaigns.',
            time: 'Just now',
            read: false,
            type: 'info'
        },
        {
            id: 2,
            title: 'Earn Bonus Points',
            message: 'Upgrade your plan to Pro or Business to get up to 10x points per visit!',
            time: '2 hours ago',
            read: false,
            type: 'sparkle'
        },
        {
            id: 3,
            title: 'Need Traffic?',
            message: 'Create a campaign to drive real visitors to your website or blog.',
            time: '1 day ago',
            read: true,
            type: 'campaign'
        }
    ]);

    const [theme, setTheme] = useState<'light' | 'dark' | 'system' | 'auto'>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | 'auto';
            return (saved === 'light' || saved === 'dark' || saved === 'system' || saved === 'auto') ? saved : 'system';
        }
        return 'system';
    });

    // Theme Effect
    useEffect(() => {
        const root = window.document.documentElement;
        
        const applyTheme = () => {
            if (theme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (systemDark) root.classList.add('dark');
                else root.classList.remove('dark');
            } else if (theme === 'auto') {
                const hour = new Date().getHours();
                // Light mode from 6 AM to 6 PM (18:00)
                if (hour >= 6 && hour < 18) root.classList.remove('dark');
                else root.classList.add('dark');
            } else if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        };

        applyTheme();
        localStorage.setItem('theme', theme);

        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', applyTheme);
            return () => mediaQuery.removeEventListener('change', applyTheme);
        }

        if (theme === 'auto') {
            const interval = setInterval(applyTheme, 60000); // Check every minute
            return () => clearInterval(interval);
        }
    }, [theme]);

    // Timer Effect
    useEffect(() => {
        let interval: any = null;
        if (timerModalOpen && countdown > 0) {
            interval = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (timerModalOpen && countdown === 0) {
            setIsTimerFinished(true);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timerModalOpen, countdown]);

    const loadDashboardData = async (userId: string, email: string, plan: string) => {
        setDashboardDataLoading(true);
        try {
            // 1. Fetch campaigns, today's clicks, and recent clicks in parallel
            const [campaigns, todayClicks, recentClicks] = await Promise.all([
                databaseService.getUserCampaigns(userId),
                databaseService.getTodayClicksCount(userId),
                databaseService.getRecentClicks(5)
            ]);

            const totalClicks = campaigns.reduce((acc, c) => acc + (c.clicks || 0), 0);
            const runningCampaigns = campaigns.filter(c => c.status === 'active' && c.pointsRemaining > 0).length;
            const multiplier = plan === 'pro' ? 5 : plan === 'business' ? 10 : 1;
            const pointsToday = todayClicks * 10 * multiplier;

            setDashboardStats({
                totalClicks,
                pointsToday,
                runningCampaigns
            });

            // 2. Fetch recent click activities and resolve names/campaigns in parallel
            const enrichedActivities = await Promise.all(
                recentClicks.map(async (click: any) => {
                    const [profile, campaign] = await Promise.all([
                        databaseService.getProfileById(click.userId).catch(() => null),
                        databaseService.getCampaignById(click.campaignId).catch(() => null)
                    ]);
                    const userName = profile?.name || 'User';
                    const campaignTitle = campaign?.title || 'Website';

                    const diffMs = new Date().getTime() - new Date(click.timestamp).getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    const diffHours = Math.floor(diffMins / 60);
                    let timeStr = 'Just now';
                    if (diffHours > 0) {
                        timeStr = `${diffHours}h ago`;
                    } else if (diffMins > 0) {
                        timeStr = `${diffMins}m ago`;
                    }

                    return {
                        user: userName,
                        action: `Visited "${campaignTitle}"`,
                        amount: `+10 pts`,
                        time: timeStr
                    };
                })
            );
            setRecentActivity(enrichedActivities);

            // 3. Load real analytics data if user has campaigns
            let hourlyTraffic = Array(24).fill(0);
            let topCampaignsData: { title: string; percentage: number; clicks: number }[] = [];
            let timingData = { morning: 0, afternoon: 0, evening: 0, night: 0 };

            if (campaigns.length > 0) {
                const campaignIds = campaigns.map(c => c.$id);
                try {
                    const clickDocs = await databaseService.getCampaignClicks(campaignIds, 200);
                    
                    // A. Hourly traffic (last 24 hours)
                    const now = new Date();
                    clickDocs.forEach((click: any) => {
                        const clickTime = new Date(click.timestamp);
                        const diffMs = now.getTime() - clickTime.getTime();
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        if (diffHours >= 0 && diffHours < 24) {
                            hourlyTraffic[23 - diffHours]++;
                        }
                    });

                    // B. Top campaigns by clicks received
                    const campaignClicksMap: { [key: string]: { title: string; count: number } } = {};
                    campaigns.forEach(c => {
                        campaignClicksMap[c.$id] = { title: c.title, count: 0 };
                    });
                    
                    clickDocs.forEach((click: any) => {
                        if (campaignClicksMap[click.campaignId]) {
                            campaignClicksMap[click.campaignId].count++;
                        }
                    });

                    const sortedCampaigns = Object.values(campaignClicksMap)
                        .sort((a, b) => b.count - a.count);

                    const totalCampaignClicks = sortedCampaigns.reduce((acc, c) => acc + c.count, 0);

                    topCampaignsData = sortedCampaigns.slice(0, 4).map(c => ({
                        title: c.title,
                        clicks: c.count,
                        percentage: totalCampaignClicks > 0 ? Math.round((c.count / totalCampaignClicks) * 100) : 0
                    }));

                    // C. Timings distribution
                    clickDocs.forEach((click: any) => {
                        const clickTime = new Date(click.timestamp);
                        const hour = clickTime.getHours();
                        if (hour >= 6 && hour < 12) timingData.morning++;
                        else if (hour >= 12 && hour < 18) timingData.afternoon++;
                        else if (hour >= 18 && hour < 24) timingData.evening++;
                        else timingData.night++;
                    });

                } catch (err) {
                    console.error("Error computing analytics stats:", err);
                }
            }

            setAnalyticsData({
                hourlyTraffic,
                topCampaigns: topCampaignsData,
                timings: timingData
            });
        } catch (error) {
            console.error('Error loading dashboard stats:', error);
        } finally {
            setDashboardDataLoading(false);
        }
    };

    // Check session on mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await authService.getCurrentUser();
                if (currentUser) {
                    setUser(currentUser);
                    let profile = await databaseService.getProfile(currentUser.email);
                    
                    // Safety Check: If user exists but profile doesn't, create it now
                    if (!profile) {
                        console.log('Profile missing, creating one now...');
                        const myReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                        profile = await databaseService.createProfile(
                            currentUser.$id,
                            currentUser.email,
                            currentUser.name,
                            myReferralCode
                        );
                    }
                    
                    if (profile) {
                        setUserPoints(profile.points || 0);
                        setUserRole(profile.role || 'user');
                        setUserReferralCode(profile.referralCode || '');
                        setUserPlan(profile.plan || 'free');
                        loadDashboardData(currentUser.$id, profile.email, profile.plan || 'free');
                    }
                    setCurrentPage('dashboard');
                }
            } catch (err) {
                console.log('No active session');
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    const handleSignIn = async () => {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            let profile = await databaseService.getProfile(currentUser.email);
            
            // Safety Check: Create profile if missing on login (e.g. Google Auth)
            if (!profile) {
                const myReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
                profile = await databaseService.createProfile(
                    currentUser.$id, 
                    currentUser.email, 
                    currentUser.name,
                    myReferralCode
                );
            }
            
            setUserPoints(profile.points || 0);
            setUserRole(profile.role || 'user');
            setUserReferralCode(profile.referralCode || '');
            setUserPlan(profile.plan || 'free');
            loadDashboardData(currentUser.$id, profile.email, profile.plan || 'free');
            setCurrentPage('dashboard');
        }
    };

    const handleSignUp = async () => {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            const profile = await databaseService.getProfile(currentUser.email);
            if (profile) {
                setUserPoints(profile.points || 0);
                setUserRole(profile.role || 'user');
                setUserReferralCode(profile.referralCode || '');
                setUserPlan(profile.plan || 'free');
                loadDashboardData(currentUser.$id, profile.email, profile.plan || 'free');
            }
            setCurrentPage('dashboard');
        }
    };

    const getInitials = (name: string) => {
        if (!name) return '??';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    const handleLogout = async () => {
        try {
            await authService.signOut();
            setUser(null);
            setCurrentPage('landing');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Remove old toggle function as we now use setTheme mode directly

    // Scroll to top whenever the page changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    const navItems: NavItem[] = [
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Zap, label: 'Earn Points', id: 'earn' },
        { icon: Link2, label: 'My Campaigns', id: 'campaigns' },
        { icon: Store, label: 'Store', id: 'store' },
        { icon: Settings, label: 'Settings', id: 'settings' },
    ];

    const handleTaskClick = async (campaign: any) => {
        if (!user) return;
        
        // --- Security Checks ---
        
        // 1. Prevent Self-Click
        if (campaign.userId === user.$id) {
            alert("You cannot earn points from your own campaign!");
            window.open(campaign.url, '_blank'); // Still open the link but no reward
            return;
        }

        // 2. Prevent Duplicate Click (Daily Limit)
        const alreadyClicked = await databaseService.hasClickedToday(user.$id, campaign.$id);
        if (alreadyClicked) {
            alert("You have already earned points from this link today!");
            window.open(campaign.url, '_blank');
            return;
        }

        // 3. Open URL
        window.open(campaign.url, '_blank');

        // 4. Open Verification Modal & Start Timer
        setVerifyingCampaign(campaign);
        setCountdown(15);
        setIsTimerFinished(false);
        setTimerModalOpen(true);
    };

    const handleClaimPoints = async () => {
        if (!user || !verifyingCampaign) return;

        let multiplier = 1;
        const hasTurbo = user ? Date.now() < Number(localStorage.getItem(`turboMultiplierUntil_${user.$id}`) || 0) : false;
        if (userPlan === 'pro') multiplier = 5;
        else if (userPlan === 'business') multiplier = 10;
        else if (hasTurbo) multiplier = 5;
        const rewardPoints = 10 * multiplier;

        try {
            const profile = await databaseService.getProfile(user.email);
            if (profile) {
                const newPoints = (profile.points || 0) + rewardPoints;
                await databaseService.updatePoints(profile.$id, newPoints);
                setUserPoints(newPoints);
                
                // Log the click for security
                await databaseService.logClick(user.$id, verifyingCampaign.$id);
                
                // Update Campaign Stats (Deduct Points from Campaign)
                const newRemaining = Math.max(0, verifyingCampaign.pointsRemaining - rewardPoints);
                const newClicks = (verifyingCampaign.clicks || 0) + 1;
                await databaseService.updateCampaignProgress(verifyingCampaign.$id, newRemaining, newClicks);

                // Reload stats
                loadDashboardData(user.$id, user.email, userPlan);
            }
        } catch (err) {
            console.error('Error claiming points:', err);
            alert('Claim failed. Try again.');
        } finally {
            setTimerModalOpen(false);
            setVerifyingCampaign(null);
        }
    };

    const handlePurchase = async (cost: number, itemId: number) => {
        if (!user) return;
        
        try {
            const profile = await databaseService.getProfile(user.email);
            if (profile) {
                if (itemId === 1) {
                    const today = new Date().toDateString();
                    const lastClaim = localStorage.getItem(`lastDailyClaim_${user.$id}`);
                    
                    if (lastClaim === today) {
                        alert("You have already claimed your Daily Bonus today!");
                        return;
                    }
                    
                    const rewardPoints = 100;
                    const newPoints = (profile.points || 0) + rewardPoints;
                    await databaseService.updatePoints(profile.$id, newPoints);
                    setUserPoints(newPoints);
                    localStorage.setItem(`lastDailyClaim_${user.$id}`, today);
                    alert("Success! 100 free points have been added to your balance.");
                    return;
                }

                if (itemId === 7) {
                    if (profile.points < 7500) {
                        alert("You don't have enough points to purchase the Elite Expansion Pack!");
                        return;
                    }
                    const newPoints = (profile.points || 0) - 7500 + 10000;
                    await databaseService.updatePoints(profile.$id, newPoints);
                    setUserPoints(newPoints);
                    localStorage.setItem(`hasVIPBadge_${user.$id}`, 'true');
                    localStorage.setItem(`hasPremiumIdentity_${user.$id}`, 'true');
                    alert("Success! Purchased Elite Expansion Pack. 10,000 points added (+2,500 net gain) and VIP Status unlocked!");
                    return;
                }

                if (profile.points < cost) {
                    alert("You don't have enough points!");
                    return;
                }

                const newPoints = profile.points - cost;
                await databaseService.updatePoints(profile.$id, newPoints);
                setUserPoints(newPoints);

                // Handle other item benefits in local storage
                if (itemId === 2) {
                    localStorage.setItem(`hasPremiumIdentity_${user.$id}`, 'true');
                    alert("Purchase successful! Premium Identity activated. Enjoy your pink name glow!");
                } else if (itemId === 3) {
                    localStorage.setItem(`turboMultiplierUntil_${user.$id}`, (Date.now() + 24 * 60 * 60 * 1000).toString());
                    alert("Purchase successful! Turbo Multiplier activated. Earn 5x points for the next 24 hours!");
                } else if (itemId === 4) {
                    localStorage.setItem(`hasFeaturedCampaign_${user.$id}`, 'true');
                    alert("Purchase successful! Featured Campaign privileges activated.");
                } else if (itemId === 5) {
                    localStorage.setItem(`hasMasteryTrophy_${user.$id}`, 'true');
                    alert("Purchase successful! Mastery Trophy unlocked.");
                } else if (itemId === 6) {
                    localStorage.setItem(`hasVIPConcierge_${user.$id}`, 'true');
                    alert("Purchase successful! VIP Concierge support unlocked.");
                } else {
                    alert("Purchase successful! Reward activated.");
                }
            }
        } catch (err) {
            console.error('Purchase error:', err);
            alert("Transaction failed. Try again.");
        }
    };

    const isAdmin = user?.email === 'deepak246124@gmail.com'; // Real admin email

    // Global Action Handlers
    const goToLanding = () => setCurrentPage('landing');

    const markNotificationAsRead = (id: number) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllNotificationsAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
    };

    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Page Routing
    const renderPage = () => {
        switch (currentPage) {
            case 'landing':
                return <LandingPage 
                    onGetStarted={() => setCurrentPage('signIn')} 
                    onHowItWorks={() => setCurrentPage('howItWorks')}
                    onPricing={() => setCurrentPage('pricing')}
                    onFeatures={() => setCurrentPage('features')}
                    onAbout={() => setCurrentPage('about')}
                    onBlog={() => setCurrentPage('blog')}
                    onContact={() => setCurrentPage('contact')}
                    onPrivacy={() => setCurrentPage('privacy')}
                    onTerms={() => setCurrentPage('terms')}
                    onSupport={() => setCurrentPage('support')}
                    theme={theme}
                    setTheme={setTheme}
                />;
            case 'howItWorks': return <HowItWorksPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'pricing': return <PricingPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'signIn': return <SignInPage theme={theme} setTheme={setTheme} onSignIn={handleSignIn} onSignUpClick={() => setCurrentPage('signUp')} onBack={goToLanding} />;
            case 'signUp': return <SignUpPage theme={theme} setTheme={setTheme} onSignUp={handleSignUp} onSignInClick={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'features': return <FeaturesPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'about': return <AboutPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'blog': return <BlogPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'contact': return <ContactPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'privacy': return <PrivacyPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'terms': return <TermsPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            case 'support': return <SupportPage theme={theme} setTheme={setTheme} onGetStarted={() => setCurrentPage('signIn')} onBack={goToLanding} />;
            default: return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 bg-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
                        <Zap className="size-6 text-white" />
                    </div>
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 animate-loading-bar"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (currentPage !== 'dashboard') {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300">
                {renderPage()}
            </div>
        );
    }

    // Dashboard View
    return (
        <div className="h-screen w-full flex bg-white dark:bg-black text-zinc-900 dark:text-white pb-16 md:pb-0 overflow-hidden transition-colors duration-300">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex w-64 bg-white dark:bg-black border-r border-zinc-200 dark:border-white/10 flex-col relative z-20">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={() => setCurrentPage('landing')}>
                        <div className="size-8 sm:size-9 bg-zinc-900 dark:bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-transform">
                            <Zap className="size-4 sm:size-5 text-white" />
                        </div>
                        <span className="font-extrabold text-xl sm:text-xl tracking-tighter text-zinc-900 dark:text-white hidden sm:block">TrafficHub</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3 px-4">Menu</div>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${isActive
                                        ? 'bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-600/20'
                                        : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
                                    }`}
                            >
                                <Icon className={`size-4 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                <span className="font-semibold text-sm">{item.label}</span>
                                {isActive && (
                                    <div className="absolute right-4 size-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                                )}
                            </button>
                        );
                    })}
                    
                    {isAdmin && (
                        <button
                            onClick={() => setActiveTab('admin')}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group ${activeTab === 'admin'
                                ? 'bg-purple-600/10 text-purple-600 dark:text-purple-400 border border-purple-600/20'
                                : 'text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
                                }`}
                        >
                            <ShieldCheck className="size-4" />
                            <span className="font-semibold text-sm">Admin Panel</span>
                        </button>
                    )}
                </nav>

                <div className="px-4 mb-4">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 relative group text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20"
                    >
                        <Zap className="size-4" />
                        <span className="font-semibold text-sm">Logout</span>
                    </button>
                </div>

                <div className="p-4 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-black">
                    <div className="flex items-center justify-between gap-2">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-zinc-100 dark:bg-white/5 rounded-lg border border-zinc-200 dark:border-white/10">
                            <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                                {userPoints.toLocaleString()} pts
                            </span>
                        </div>
                        <ThemeToggle theme={theme} setTheme={setTheme} direction="up" />
                        <div className={`size-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-xs font-black border transition-all ${
                            user && localStorage.getItem(`hasVIPBadge_${user.$id}`) === 'true'
                            ? 'border-amber-400 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.7)] animate-pulse'
                            : user && localStorage.getItem(`hasPremiumIdentity_${user.$id}`) === 'true'
                            ? 'border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.7)]'
                            : userRole === 'admin'
                            ? 'border-purple-500 text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.3)]'
                            : userPlan === 'pro' 
                            ? 'border-blue-500 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                            : userPlan === 'business'
                            ? 'border-amber-500 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                            : 'border-zinc-300 dark:border-zinc-700 text-zinc-500'
                        }`}>
                            {getInitials(user?.name || '')}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-around z-50 px-4 py-3">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all ${isActive
                                    ? 'text-blue-600 dark:text-blue-400 bg-blue-400/5'
                                    : 'text-zinc-500'
                                }`}
                        >
                            <Icon className="size-5" />
                            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden relative">
                {/* Subtle Background Elements */}
                <div className="absolute top-0 right-0 size-96 bg-blue-600/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 size-96 bg-purple-600/5 blur-[120px] rounded-full -z-10 pointer-events-none"></div>

                {/* Top Bar */}
                <header className="bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 md:px-12 py-4 md:py-6 relative z-10">
                    <div className="flex items-center justify-between gap-4 md:gap-8">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 md:gap-4 text-zinc-400 dark:text-zinc-500 mb-1 md:mb-2">
                                <button onClick={() => setCurrentPage('landing')} className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ChevronLeft className="size-4 md:size-5" />
                                </button>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest truncate">Dashboard / {activeTab}</span>
                            </div>
                            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight truncate">
                                {activeTab === 'dashboard' && 'Welcome back!'}
                                {activeTab === 'earn' && 'Ready to Earn?'}
                                {activeTab === 'campaigns' && 'Your Campaigns'}
                                {activeTab === 'store' && 'Reward Store'}
                                {activeTab === 'settings' && 'Profile Settings'}
                            </h1>
                        </div>

                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Theme Toggle (Hidden on very small, shown on sm+) */}
                            <div className="hidden xs:block">
                                <ThemeToggle theme={theme} setTheme={setTheme} />
                            </div>

                            {userRole === 'admin' ? (
                                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/20 bg-purple-500/10 text-purple-600 font-black text-[9px] uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                                    Admin
                                </div>
                            ) : userPlan !== 'free' && (
                                <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-black text-[9px] uppercase tracking-widest ${
                                    userPlan === 'pro' 
                                    ? 'bg-blue-500/10 text-blue-600 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                                    : 'bg-amber-500/10 text-amber-600 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                }`}>
                                    {userPlan}
                                </div>
                            )}

                            {/* Notifications Dropdown */}
                            <div className="md:relative">
                                <button 
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="relative p-2 md:p-3 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl md:rounded-2xl hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                >
                                    <Bell className="size-4 md:size-5 text-zinc-400" />
                                    {notifications.some(n => !n.read) && (
                                        <span className="absolute top-2.5 right-2.5 md:top-3 md:right-3 size-1.5 md:size-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                                    )}
                                </button>
                                
                                {showNotifications && (
                                    <>
                                        {/* Click outside overlay */}
                                        <div 
                                            className="fixed inset-0 z-40" 
                                            onClick={() => setShowNotifications(false)}
                                        />
                                        
                                        {/* Dropdown panel */}
                                        <div className="absolute top-full md:top-auto left-4 right-4 md:left-auto md:right-0 mt-2 w-auto md:w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="p-4 border-b border-zinc-150 dark:border-zinc-800 flex items-center justify-between">
                                                <h3 className="font-extrabold text-sm tracking-tight">Notifications</h3>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAllNotificationsAsRead();
                                                        }}
                                                        className="text-[10px] font-bold text-blue-600 hover:text-blue-500 hover:underline uppercase tracking-wider cursor-pointer"
                                                    >
                                                        Mark all as read
                                                    </button>
                                                    <span className="text-zinc-300 dark:text-zinc-700">|</span>
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            clearAllNotifications();
                                                        }}
                                                        className="text-[10px] font-bold text-red-550 hover:text-red-400 hover:underline uppercase tracking-wider cursor-pointer"
                                                    >
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="max-h-[320px] overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                                                {notifications.length === 0 ? (
                                                    <div className="p-8 text-center text-zinc-400 dark:text-zinc-500">
                                                        <Bell className="size-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-2" />
                                                        <p className="text-xs font-bold uppercase tracking-wider">No notifications yet</p>
                                                    </div>
                                                ) : (
                                                    notifications.map((notification) => (
                                                        <div 
                                                            key={notification.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                markNotificationAsRead(notification.id);
                                                            }}
                                                            className={`p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer relative ${
                                                                !notification.read ? 'bg-blue-500/5 dark:bg-blue-500/5' : ''
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className={`size-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                                                                    notification.type === 'sparkle' 
                                                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                                                    : notification.type === 'campaign'
                                                                    ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                                                                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                                }`}>
                                                                    {notification.type === 'sparkle' ? (
                                                                        <Sparkles className="size-4" />
                                                                    ) : notification.type === 'campaign' ? (
                                                                        <Link2 className="size-4" />
                                                                    ) : (
                                                                        <Bell className="size-4" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex justify-between items-baseline gap-2">
                                                                        <h4 className="font-extrabold text-xs text-zinc-900 dark:text-white truncate">{notification.title}</h4>
                                                                        <span className="text-[9px] font-bold text-zinc-400 whitespace-nowrap">{notification.time}</span>
                                                                    </div>
                                                                    <p className="text-[11px] text-zinc-555 dark:text-zinc-400 font-medium leading-normal mt-0.5">{notification.message}</p>
                                                                </div>
                                                                {!notification.read && (
                                                                    <div className="size-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Points Balance */}
                            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl md:rounded-2xl p-1 md:p-1.5 pl-3 md:pl-4 flex items-center gap-2 md:gap-4 group">
                                <div className="hidden sm:block text-right">
                                    <div className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-tighter">Balance</div>
                                    <div className="text-sm md:text-lg font-black leading-none">{userPoints.toLocaleString()}</div>
                                </div>
                                <div className="size-8 md:size-11 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:rotate-12 transition-transform">
                                    <Coins className="size-4 md:size-6 text-white fill-white/20" />
                                </div>
                                {/* Mobile-only balance number */}
                                <div className="sm:hidden pr-2">
                                    <div className="text-xs font-black leading-none">{userPoints.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-12 pb-24 md:pb-12 scrollbar-hide">
                    <div className="max-w-7xl mx-auto">
                        {activeTab === 'dashboard' && (
                            <DashboardView 
                                userPoints={userPoints}
                                referralCode={userReferralCode}
                                stats={dashboardStats}
                                recentActivity={recentActivity}
                                onEarnClick={() => setActiveTab('earn')}
                                userPlan={userPlan}
                                onUpgradeClick={() => setActiveTab('settings')}
                                isAdmin={userRole === 'admin'}
                                analytics={analyticsData}
                                dataLoading={dashboardDataLoading}
                            />
                        )}

                        {activeTab === 'earn' && (
                            <EarnPointsView 
                                onTaskClick={handleTaskClick} 
                            />
                        )}

                        {activeTab === 'campaigns' && (
                            <CampaignsView 
                                userId={user?.$id || ''} 
                                userEmail={user?.email || ''}
                                userPoints={userPoints}
                                onPointsUpdate={setUserPoints}
                                userPlan={userPlan}
                                isAdmin={userRole === 'admin'}
                            />
                        )}

                        {activeTab === 'store' && (
                            <StorePage userPoints={userPoints} onPurchase={handlePurchase} />
                        )}

                        {activeTab === 'settings' && (
                            <SettingsPage 
                                theme={theme} 
                                setTheme={setTheme} 
                                user={user}
                                userPlan={userPlan}
                                onPlanUpdate={setUserPlan}
                            />
                        )}

                        {activeTab === 'admin' && isAdmin && (
                            <AdminView 
                                stats={{
                                    totalUsers: 1240,
                                    totalCampaigns: 45,
                                    pendingTasks: 12,
                                    revenue: '$1,250'
                                }}
                            />
                        )}
                    </div>
                </div>
            </main>

            {/* Verification Timer Modal */}
            {timerModalOpen && verifyingCampaign && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 p-8 sm:p-10 space-y-6 text-center">
                        <div className="size-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20 shadow-lg">
                            <Zap className={`size-10 text-blue-500 ${!isTimerFinished ? 'animate-pulse' : 'animate-bounce'}`} />
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black tracking-tight">Verifying Link Visit</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                                Campaign: <span className="font-extrabold text-zinc-900 dark:text-white">{verifyingCampaign.title}</span>
                            </p>
                        </div>

                        {!isTimerFinished ? (
                            <div className="space-y-4">
                                <div className="text-4xl font-black text-blue-600 animate-pulse">{countdown}s</div>
                                <p className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Please keep the window open. Checking your view progress...</p>
                                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
                                        style={{ width: `${((15 - countdown) / 15) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-emerald-500 font-black text-sm uppercase bg-emerald-500/10 py-2 rounded-xl border border-emerald-500/20">
                                    Visit Verified! Ready to Claim
                                </div>
                                <button
                                    onClick={handleClaimPoints}
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
                                >
                                    Claim {userPlan === 'pro' ? '50' : userPlan === 'business' ? '100' : '10'} Points
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setTimerModalOpen(false);
                                setVerifyingCampaign(null);
                            }}
                            className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 text-xs font-black uppercase tracking-widest pt-2 block mx-auto"
                        >
                            Cancel & Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
