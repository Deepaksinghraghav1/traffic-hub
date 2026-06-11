import { Check, ArrowRight, Zap, Crown, Rocket } from 'lucide-react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';

interface PricingPageProps {
    onGetStarted: () => void;
    onBack: () => void;
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
}

export function PricingPage({ onGetStarted, onBack, theme, setTheme }: PricingPageProps) {
    const plans = [
        {
            name: 'Free',
            icon: Zap,
            price: '0',
            description: 'Perfect for getting started',
            features: [
                'Earn unlimited points',
                'Basic task wall access',
                'Standard support',
                '1 active campaign',
                'Basic analytics',
            ],
            cta: 'Start Free',
            popular: false,
            color: 'from-zinc-700 to-zinc-600'
        },
        {
            name: 'Pro',
            icon: Crown,
            price: '19',
            description: 'For serious content creators',
            features: [
                'Everything in Free',
                '5x faster point earning',
                'Priority task placement',
                '10 active campaigns',
                'Advanced analytics',
                'Priority support',
                'No ads'
            ],
            cta: 'Upgrade to Pro',
            popular: true,
            color: 'from-blue-600 to-purple-500'
        },
        {
            name: 'Business',
            icon: Rocket,
            price: '49',
            description: 'For agencies and teams',
            features: [
                'Everything in Pro',
                '10x faster point earning',
                'Unlimited campaigns',
                'Team collaboration',
                'White-label options',
                'Dedicated account manager',
                'API access',
                'Custom integrations'
            ],
            cta: 'Contact Sales',
            popular: false,
            color: 'from-amber-600 to-orange-600'
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-300">
            {/* Navigation */}
            <nav className="border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-black sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                        <div className="size-8 sm:size-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="size-4 sm:size-5 text-white" />
                        </div>
                        <span className="font-extrabold text-xl sm:text-2xl tracking-tighter bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent hidden sm:block">TrafficHub</span>
                    </button>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <button
                            onClick={onGetStarted}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 px-4 sm:px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-8 md:pb-12 text-center">
                <h1 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-[1.2] md:leading-[1.1]">Simple, Transparent<br className="hidden sm:block" /> Pricing for Everyone</h1>
                <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">
                    Choose the plan that's right for your growth stage. No hidden fees, ever.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {plans.map((plan, i) => {
                        const Icon = plan.icon;
                        return (
                            <div
                                key={i}
                                className={`relative group bg-white dark:bg-black border ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-500/10 md:scale-105 z-10' : 'border-zinc-200 dark:border-white/10'} rounded-[2rem] p-6 md:p-8 flex flex-col transition-all duration-500 hover:border-blue-500/30`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                                        Most Popular
                                    </div>
                                )}

                                <div className={`size-14 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    <Icon className="size-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-black mb-2 tracking-tight">{plan.name}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-6 font-medium">{plan.description}</p>

                                <div className="mb-8">
                                    <span className="text-5xl font-black tracking-tighter">${plan.price}</span>
                                    <span className="text-zinc-400 dark:text-zinc-500 font-bold text-sm uppercase ml-2">/month</span>
                                </div>

                                <button
                                    onClick={onGetStarted}
                                    className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest mb-10 transition-all shadow-xl hover:scale-105 active:scale-95 ${plan.popular
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                                            : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white'
                                        }`}
                                >
                                    {plan.cta}
                                </button>

                                <div className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="size-5 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Check className="size-3 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="text-zinc-600 dark:text-zinc-300 text-sm font-bold">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* FAQ Section */}
                <div className="mt-32 max-w-3xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-black text-center mb-16 tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
                            { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and cryptocurrency payments.' },
                            { q: 'Is there a free trial for paid plans?', a: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.' }
                        ].map((faq, i) => (
                            <div key={i} className="group bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden shadow-sm dark:shadow-none">
                                <h3 className="text-zinc-900 dark:text-white text-xl mb-3 tracking-tight">{faq.q}</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}