import { User, Bell, Lock, Palette, Shield, Crown, Sparkles, Check, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle, ThemeMode } from './ThemeToggle';
import { Models } from 'appwrite';
import { databaseService } from '../services/database';

interface SettingsPageProps {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    user: Models.User<Models.Preferences> | null;
    userPlan: 'free' | 'pro' | 'business';
    onPlanUpdate: (newPlan: 'free' | 'pro' | 'business') => void;
}
export function SettingsPage({ theme, setTheme, user, userPlan, onPlanUpdate }: SettingsPageProps) {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);

    // Simulated Checkout States
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'business'>('pro');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'crypto'>('card');
    const [processingCheckout, setProcessingCheckout] = useState(false);
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    // Stripe elements card states
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvc, setCardCvc] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardCountry, setCardCountry] = useState('United States');
    const [cardError, setCardError] = useState('');

    const handleUpgradeSimulate = async () => {
        if (!user) return;
        setCardError('');

        if (paymentMethod === 'card') {
            if (cardNumber.replace(/\s/g, '').length < 16) {
                setCardError('Please enter a valid 16-digit card number.');
                return;
            }
            if (cardExpiry.length < 5) {
                setCardError('Please enter a valid expiry date (MM/YY).');
                return;
            }
            if (cardCvc.length < 3) {
                setCardError('Please enter a valid CVC.');
                return;
            }
            if (!cardName.trim()) {
                setCardError('Please enter cardholder name.');
                return;
            }
        }

        setProcessingCheckout(true);
        try {
            await databaseService.updatePlan(user.$id, selectedPlan);
            onPlanUpdate(selectedPlan);
            setCheckoutSuccess(true);
            setTimeout(() => {
                setIsCheckoutOpen(false);
                setCheckoutSuccess(false);
                setProcessingCheckout(false);
                // Clear form
                setCardNumber('');
                setCardExpiry('');
                setCardCvc('');
                setCardName('');
                setCardError('');
            }, 2000);
        } catch (error) {
            console.error('Upgrade simulation failed:', error);
            alert("Upgrade failed. Make sure you created the 'plan' attribute in the Appwrite database!");
            setProcessingCheckout(false);
        }
    };
    return (
        <div className="space-y-8 max-w-4xl pb-10">
            {/* Profile Section */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                        <User className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Profile Settings</h2>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest text-[10px]">Personal Information</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Display Name</label>
                            <input
                                type="text"
                                defaultValue={user?.name || ''}
                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                defaultValue={user?.email || ''}
                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all font-bold"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Bio</label>
                        <textarea
                            defaultValue="Content creator and digital marketer"
                            rows={3}
                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-all resize-none font-bold"
                        />
                    </div>

                    <button className="bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl">
                        Save Changes
                    </button>
                </div>
            </div>

            {/* Subscription Card */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm dark:shadow-none relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Crown className="size-36 text-blue-500" />
                </div>

                <div className="flex items-center gap-4 mb-10">
                    <div className="size-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                        <Crown className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Subscription Plan</h2>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest text-[10px]">Your Tier & Boosters</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-lg font-black tracking-tight">Current Plan:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                                userPlan === 'free' 
                                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' 
                                : userPlan === 'pro'
                                ? 'bg-blue-500/10 text-blue-600 border border-blue-500/20 shadow-md'
                                : 'bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-md'
                            }`}>
                                {userPlan}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">
                            {userPlan === 'free' && 'Earn points at normal speed. Upgrade to Pro for 5x earnings and 10 active campaigns!'}
                            {userPlan === 'pro' && 'You are earning 5x points! Up to 10 active campaigns allowed.'}
                            {userPlan === 'business' && 'You have unlimited campaign power and 10x earning speed!'}
                        </p>
                    </div>

                    <button 
                        onClick={() => {
                            setSelectedPlan(userPlan === 'free' ? 'pro' : userPlan === 'pro' ? 'business' : 'pro');
                            setIsCheckoutOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-95 px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex-shrink-0"
                    >
                        {userPlan === 'free' ? 'Upgrade to Pro' : userPlan === 'pro' ? 'Upgrade to Business' : 'Change Plan'}
                    </button>
                </div>
            </div>

            {/* Appearance */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                        <Palette className="size-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Appearance</h2>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest text-[10px]">Theme & UI Settings</p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                    <div>
                        <div className="text-lg font-black tracking-tight">Theme Preference</div>
                        <div className="text-sm text-zinc-500 font-medium">Choose between Light, Dark, or System</div>
                    </div>
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                </div>
            </div>

            {/* Notifications */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-12 bg-amber-500/10 rounded-2xl flex items-center justify-center">
                        <Bell className="size-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Notifications</h2>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest text-[10px]">Alert Preferences</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {[
                        { label: 'Email Notifications', desc: 'Receive updates via email', state: emailNotifications, setter: setEmailNotifications },
                        { label: 'Push Notifications', desc: 'Get browser notifications', state: pushNotifications, setter: setPushNotifications }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                            <div>
                                <div className="text-lg font-black tracking-tight">{item.label}</div>
                                <div className="text-sm text-zinc-500 font-medium">{item.desc}</div>
                            </div>
                            <button
                                onClick={() => item.setter(!item.state)}
                                className={`relative w-16 h-8 rounded-full transition-all duration-500 ${item.state ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-zinc-200 dark:bg-zinc-700'
                                    }`}
                            >
                                <div
                                    className={`absolute top-1 left-1 size-6 bg-white rounded-full transition-all duration-500 shadow-md ${item.state ? 'translate-x-8' : ''
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 shadow-sm dark:shadow-none">
                <div className="flex items-center gap-4 mb-10">
                    <div className="size-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                        <Lock className="size-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Security</h2>
                        <p className="text-zinc-500 dark:text-zinc-500 text-sm font-bold uppercase tracking-widest text-[10px]">Account Protection</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                        <div>
                            <div className="text-lg font-black tracking-tight">Change Password</div>
                            <div className="text-sm text-zinc-500 font-medium">Update your account password</div>
                        </div>
                        <button className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                            Update
                        </button>
                    </div>

                    <div className="flex items-center justify-between p-6 bg-zinc-50 dark:bg-zinc-800/30 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                        <div>
                            <div className="text-lg font-black tracking-tight">Two-Factor Auth</div>
                            <div className="text-sm text-zinc-500 font-medium">Add an extra layer of security</div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                            Enable
                        </button>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 rounded-[2.5rem] p-8 sm:p-10 transition-colors">
                <div className="flex items-center gap-4 mb-8">
                    <div className="size-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                        <Shield className="size-6 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-red-600">Danger Zone</h2>
                        <p className="text-red-500/70 text-sm font-bold uppercase tracking-widest text-[10px]">Destructive Actions</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-md">Once you delete your account, there is no going back. All points and campaigns will be permanently removed.</p>
                    <button className="bg-red-600 hover:bg-red-500 px-8 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-600/20 flex-shrink-0">
                        Delete Account
                    </button>
                </div>
            </div>

            {/* Checkout Modal (Simulated Payment) */}
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        {checkoutSuccess ? (
                            <div className="p-10 flex flex-col items-center justify-center text-center space-y-6">
                                <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-lg shadow-green-500/10 animate-bounce">
                                    <CheckCircle2 className="size-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Upgrade Successful!</h3>
                                <p className="text-zinc-500 dark:text-zinc-400 font-medium">Your profile has been upgraded to <span className="font-extrabold uppercase text-blue-500">{selectedPlan}</span> tier. Enjoy your booster features!</p>
                            </div>
                        ) : (
                            <div className="p-8 sm:p-10 space-y-6">
                                <div className="flex items-center justify-between border-b border-zinc-150 dark:border-zinc-800 pb-5">
                                    <div className="flex items-center gap-3">
                                        <Sparkles className="size-6 text-blue-500 animate-pulse" />
                                        <h3 className="text-xl font-black tracking-tight">Upgrade Plan (Stripe Sandbox)</h3>
                                    </div>
                                    <button 
                                        onClick={() => setIsCheckoutOpen(false)} 
                                        className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 text-xs font-black uppercase tracking-widest"
                                    >
                                        Close
                                    </button>
                                </div>

                                {cardError && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold text-center">
                                        {cardError}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Select Tier</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'pro', name: 'Pro Tier', price: '$19/mo', desc: '5x speed, 10 campaigns' },
                                            { id: 'business', name: 'Business Tier', price: '$49/mo', desc: '10x speed, unlimited' }
                                        ].map((plan) => (
                                            <button
                                                key={plan.id}
                                                type="button"
                                                onClick={() => setSelectedPlan(plan.id as any)}
                                                className={`p-5 rounded-3xl border-2 text-left transition-all ${
                                                    selectedPlan === plan.id 
                                                    ? 'border-blue-550 bg-blue-500/5 shadow-md' 
                                                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                                }`}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="font-black text-sm">{plan.name}</span>
                                                    <span className="text-xs font-black text-blue-500">{plan.price}</span>
                                                </div>
                                                <p className="text-[10px] text-zinc-500 font-bold leading-tight">{plan.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest ml-1">Payment Method</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'card', name: 'Card' },
                                            { id: 'paypal', name: 'PayPal' },
                                            { id: 'crypto', name: 'Crypto' }
                                        ].map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id as any)}
                                                className={`py-3 rounded-2xl border text-center font-bold text-xs uppercase tracking-wider transition-all ${
                                                    paymentMethod === method.id
                                                    ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/35'
                                                }`}
                                            >
                                                {method.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Stripe Form */}
                                {paymentMethod === 'card' && (
                                    <div className="space-y-4 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 bg-zinc-50/50 dark:bg-zinc-950/20">
                                        <div className="flex justify-between items-center pb-2 border-b border-zinc-200/50 dark:border-zinc-800/50">
                                            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">Credit or Debit Card</span>
                                            <span className="text-[9px] font-black bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-md uppercase tracking-widest border border-blue-500/10">Stripe Secure</span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Cardholder Name</label>
                                                <input 
                                                    type="text" 
                                                    placeholder="John Doe"
                                                    required
                                                    value={cardName}
                                                    onChange={(e) => setCardName(e.target.value)}
                                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Card Number</label>
                                                <div className="relative">
                                                    <input 
                                                        type="text" 
                                                        placeholder="4242 4242 4242 4242"
                                                        required
                                                        value={cardNumber}
                                                        onChange={(e) => {
                                                            const cleanVal = e.target.value.replace(/\D/g, '').slice(0, 16);
                                                            const formatted = cleanVal.replace(/(\d{4})(?=\d)/g, '$1 ');
                                                            setCardNumber(formatted);
                                                        }}
                                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold tracking-wider"
                                                    />
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                                                        {cardNumber.startsWith('4') ? 'Visa' : cardNumber.startsWith('5') ? 'Mastercard' : 'Card'}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Expiration Date</label>
                                                    <input 
                                                        type="text" 
                                                        placeholder="MM/YY"
                                                        required
                                                        value={cardExpiry}
                                                        onChange={(e) => {
                                                            let cleanVal = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                            if (cleanVal.length > 2) {
                                                                cleanVal = `${cleanVal.slice(0, 2)}/${cleanVal.slice(2)}`;
                                                            }
                                                            setCardExpiry(cleanVal);
                                                        }}
                                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold text-center"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">CVC / CVV</label>
                                                    <input 
                                                        type="password" 
                                                        placeholder="•••"
                                                        required
                                                        value={cardCvc}
                                                        onChange={(e) => {
                                                            const cleanVal = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                            setCardCvc(cleanVal);
                                                        }}
                                                        className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold text-center tracking-widest"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Country or Region</label>
                                                <select
                                                    value={cardCountry}
                                                    onChange={(e) => setCardCountry(e.target.value)}
                                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold"
                                                >
                                                    <option value="United States">🇺🇸 United States</option>
                                                    <option value="India">🇮🇳 India</option>
                                                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                                                    <option value="Germany">🇩🇪 Germany</option>
                                                    <option value="Canada">🇨🇦 Canada</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {paymentMethod === 'paypal' && (
                                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-amber-500/5 text-center space-y-3">
                                        <div className="text-amber-500 font-black text-sm uppercase tracking-wider">PayPal Gateway</div>
                                        <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">Clicking Pay below will launch PayPal checkout in a pop-up window.</p>
                                    </div>
                                )}

                                {paymentMethod === 'crypto' && (
                                    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-purple-500/5 text-center space-y-3">
                                        <div className="text-purple-500 font-black text-sm uppercase tracking-wider">USDT Transfer Address</div>
                                        <p className="text-zinc-555 dark:text-zinc-400 text-xs font-medium">Send exact equivalent amount of USDT to address below: <br/><code className="bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded select-all text-[10px] font-black text-zinc-700 dark:text-zinc-300">0x3f5CEe7D858d7c4DFF2E23E63e8a7de4a4A624A9</code></p>
                                    </div>
                                )}

                                <div className="bg-zinc-50 dark:bg-zinc-955/50 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-5 space-y-2.5">
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-zinc-500">Upgrade:</span>
                                        <span className="uppercase font-black text-zinc-800 dark:text-zinc-200">{selectedPlan} Tier</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold">
                                        <span className="text-zinc-500">Method:</span>
                                        <span className="uppercase font-black text-zinc-800 dark:text-zinc-200">{paymentMethod}</span>
                                    </div>
                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">Total Price</span>
                                        <span className="text-xl font-black text-blue-600">{selectedPlan === 'pro' ? '$19.00' : '$49.00'}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleUpgradeSimulate}
                                    disabled={processingCheckout}
                                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-450 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20"
                                >
                                    {processingCheckout ? 'Contacting Gateway...' : `Pay & Activate (${selectedPlan})`}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}