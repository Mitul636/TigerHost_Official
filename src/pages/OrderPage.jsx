import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, Check, Rocket, Shield, Phone, 
    MessageSquare, Copy, ExternalLink, Globe, 
    Mail, User, Hash, Info, Globe2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OrderPage() {
    const { planSlug } = useParams();
    const navigate = useNavigate();
    const { plans, currency, setCurrency, formatPrice, orderSettings, toast } = useApp();
    
    const [plan, setPlan] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        discord: '',
        email: '',
        country: 'India',
        notes: ''
    });

    useEffect(() => {
        const found = plans.find(p => p.slug === planSlug);
        if (found) {
            setPlan(found);
        } else {
            // Check if plan exists but slug is missing (fallback)
            const slugFromId = plans.find(p => p.id === planSlug);
            if (slugFromId) {
                setPlan(slugFromId);
            } else {
                navigate('/#services');
            }
        }
        window.scrollTo(0, 0);
    }, [planSlug, plans, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        window.scrollTo(0, 0);
    };

    const copyOrderDetails = () => {
        const template = orderSettings.copyTemplate
            .replace('{name}', formData.name)
            .replace('{discord}', formData.discord)
            .replace('{planName}', plan.name)
            .replace('{serviceName}', plan.service)
            .replace('{price}', `${formatPrice(plan[`price${currency}`])}/mo`)
            .replace('{currency}', currency)
            .replace('{country}', formData.country)
            .replace('{ram}', plan.features.find(f => f.toLowerCase().includes('ram')) || 'N/A')
            .replace('{cpu}', plan.features.find(f => f.toLowerCase().includes('cpu')) || 'N/A')
            .replace('{storage}', plan.features.find(f => f.toLowerCase().includes('ssd') || f.toLowerCase().includes('nvme') || f.toLowerCase().includes('storage')) || 'N/A')
            .replace('{notes}', formData.notes || 'None');

        navigator.clipboard.writeText(template);
        toast('✅ Copied to clipboard!');
    };

    if (!plan) return <div className="min-h-screen bg-[#0D2028]" />;

    return (
        <div className="min-h-screen bg-[#0D2028] flex flex-col">
            <Navbar />

            <main className="flex-1 pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4">
                    
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
                            >
                                {/* Left Side - Summary */}
                                <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-32">
                                    <Link to="/#services" className="flex items-center gap-2 text-steel/60 hover:text-orange transition-colors mb-8 group w-fit">
                                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                        <span className="font-body text-sm font-semibold tracking-wide uppercase">Back to Plans</span>
                                    </Link>

                                    <div className="text-left mb-8">
                                        <h1 className="text-4xl md:text-5xl font-heading font-black text-white mb-4 leading-tight">
                                            {orderSettings.pageTitle}
                                        </h1>
                                        <p className="text-steel/70 font-body text-lg">
                                            {orderSettings.pageSubtitle}
                                        </p>
                                    </div>

                                    <div className="relative group">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-orange to-red-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative bg-[#1A1A2E]/95 backdrop-blur-xl border border-orange/40 rounded-3xl p-8 overflow-hidden">
                                            
                                            {plan.badge && (
                                                <div className="absolute top-6 right-6 px-3 py-1 bg-orange text-white text-[10px] font-heading font-bold uppercase tracking-widest rounded-full shadow-lg">
                                                    {plan.badge}
                                                </div>
                                            )}

                                            <div className="mb-8">
                                                <div className="text-steel/50 font-heading text-xs uppercase tracking-widest mb-1">{plan.service}</div>
                                                <h3 className="text-3xl font-heading font-bold text-white mb-4">{plan.name}</h3>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-5xl font-heading font-black text-orange text-glow">
                                                        {formatPrice(plan[`price${currency}`])}
                                                    </span>
                                                    <span className="text-steel/60 font-body text-sm">/ month</span>
                                                </div>
                                            </div>

                                            <div className="border-t border-white/5 pt-8 mb-8">
                                                <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                                                    <Rocket size={16} className="text-orange" />
                                                    Plan Includes:
                                                </h4>
                                                <ul className="space-y-4">
                                                    {plan.features.map((feature, i) => (
                                                        <li key={i} className="flex items-start gap-3 group/item">
                                                            <div className="mt-1 w-5 h-5 rounded-full bg-orange/10 flex items-center justify-center shrink-0 border border-orange/20 group-hover/item:bg-orange/20 transition-colors">
                                                                <Check size={12} className="text-orange" />
                                                            </div>
                                                            <span className="text-steel/80 font-body text-[15px] group-hover/item:text-white transition-colors capitalize">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className="border-t border-white/5 pt-8 mb-8">
                                                <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-widest mb-4">Currency:</h4>
                                                <div className="flex gap-2">
                                                    {[
                                                        { code: 'INR', symbol: '₹' },
                                                        { code: 'BDT', symbol: '৳' },
                                                        { code: 'USD', symbol: '$' }
                                                    ].map(c => (
                                                        <button
                                                            key={c.code}
                                                            onClick={() => setCurrency(c.code)}
                                                            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 font-heading font-bold text-xs transition-all ${
                                                                currency === c.code 
                                                                ? 'bg-orange text-white shadow-orange-glow' 
                                                                : 'bg-white/5 text-steel/60 hover:bg-white/10 hover:text-white border border-white/5'
                                                            }`}
                                                        >
                                                            <span>{c.symbol}</span>
                                                            <span>{c.code}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-6">
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <Shield size={20} className="text-orange/60" />
                                                    <span className="text-[10px] text-steel/40 font-body uppercase tracking-tighter">Secure Order</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 text-center border-x border-white/5">
                                                    <Phone size={20} className="text-orange/60" />
                                                    <span className="text-[10px] text-steel/40 font-body uppercase tracking-tighter">24/7 Support</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-2 text-center">
                                                    <Rocket size={20} className="text-orange/60" />
                                                    <span className="text-[10px] text-steel/40 font-body uppercase tracking-tighter">Instant Setup</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Form */}
                                <div className="lg:col-span-7 xl:col-span-8">
                                    <div className="bg-[#1A1A2E]/50 border border-white/5 rounded-3xl p-8 md:p-12">
                                        <h2 className="text-3xl font-heading font-bold text-white mb-10 flex items-center gap-3">
                                            Your Details
                                            <div className="h-px flex-1 bg-gradient-to-r from-orange/50 to-transparent"></div>
                                        </h2>

                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {/* Full Name */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1">
                                                        <User size={16} className="text-orange" />
                                                        Full Name {orderSettings.requiredFields.name && <span className="text-orange">*</span>}
                                                    </label>
                                                    <input 
                                                        type="text"
                                                        required={orderSettings.requiredFields.name}
                                                        placeholder="Enter your full name"
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        className="order-input"
                                                    />
                                                </div>

                                                {/* Discord Username */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1">
                                                        <Hash size={16} className="text-orange" />
                                                        Discord Username {orderSettings.requiredFields.discord && <span className="text-orange">*</span>}
                                                    </label>
                                                    <input 
                                                        type="text"
                                                        required={orderSettings.requiredFields.discord}
                                                        placeholder="@username or user#0000"
                                                        value={formData.discord}
                                                        onChange={e => setFormData({ ...formData, discord: e.target.value })}
                                                        className="order-input"
                                                    />
                                                    <p className="text-[11px] text-steel/40 ml-1">We'll contact you here for setup</p>
                                                </div>

                                                {/* Email Address */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1">
                                                        <Mail size={16} className="text-orange" />
                                                        Email Address {orderSettings.requiredFields.email && <span className="text-orange">*</span>}
                                                    </label>
                                                    <input 
                                                        type="email"
                                                        required={orderSettings.requiredFields.email}
                                                        placeholder="your@email.com"
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        className="order-input"
                                                    />
                                                </div>

                                                {/* Country */}
                                                <div className="space-y-2">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1">
                                                        <Globe size={16} className="text-orange" />
                                                        Country {orderSettings.requiredFields.country && <span className="text-orange">*</span>}
                                                    </label>
                                                    <select 
                                                        required={orderSettings.requiredFields.country}
                                                        value={formData.country}
                                                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                                                        className="order-input appearance-none bg-[#0D2028]"
                                                    >
                                                        <option value="India">🇮🇳 India</option>
                                                        <option value="Bangladesh">🇧🇩 Bangladesh</option>
                                                        <option value="United States">🇺🇸 United States</option>
                                                        <option value="Other">🌍 Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/5">
                                                {/* Plan Display (Read Only) */}
                                                <div className="space-y-2 opacity-60">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1 text-orange/80">Selected Plan</label>
                                                    <div className="order-input bg-orange/5 border-orange/20 cursor-not-allowed flex items-center gap-2">
                                                        <Check size={16} className="text-orange" />
                                                        {plan.name}
                                                    </div>
                                                </div>

                                                {/* Currency Display (Read Only) */}
                                                <div className="space-y-2 opacity-60">
                                                    <label className="flex items-center gap-2 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1 text-orange/80">Selected Currency</label>
                                                    <div className="order-input bg-orange/5 border-orange/20 cursor-not-allowed flex items-center gap-2">
                                                        <Globe2 size={16} className="text-orange" />
                                                        {currency}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <div className="space-y-2">
                                                <label className="flex items-center justify-between text-sm font-heading font-bold text-steel/70 uppercase tracking-widest ml-1">
                                                    <div className="flex items-center gap-2">
                                                        <MessageSquare size={16} className="text-orange" />
                                                        Special Notes
                                                    </div>
                                                    <span className="text-[10px] font-body font-normal normal-case">{formData.notes.length}/300</span>
                                                </label>
                                                <textarea 
                                                    maxLength={300}
                                                    placeholder="Any special requirements or questions..."
                                                    value={formData.notes}
                                                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                                                    rows={4}
                                                    className="order-input resize-none py-4"
                                                />
                                            </div>

                                            <div className="pt-6">
                                                <button 
                                                    type="submit" 
                                                    className="btn-primary w-full !py-5 !text-xl group shadow-orange-glow-lg flex items-center justify-center gap-2 overflow-hidden relative"
                                                >
                                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                                    Place Order Now
                                                    <Rocket size={24} className="group-hover:translate-y-[-2px] group-hover:translate-x-[2px] transition-transform" />
                                                </button>
                                                <div className="flex items-center justify-center gap-2 mt-4 text-steel/40 text-xs">
                                                    <Shield size={14} />
                                                    Your information is safe with us
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-3xl mx-auto text-center py-10"
                            >
                                <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                                    >
                                        <Check size={48} className="text-green-400" />
                                    </motion.div>
                                </div>

                                <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-4">
                                    {orderSettings.successMessage}
                                </h2>
                                <p className="text-steel/70 font-body text-xl mb-12">
                                    Hi <span className="text-white font-bold">{formData.name}</span>, here are your order details:
                                </p>

                                <div className="bg-[#1A1A2E]/50 border border-orange/20 rounded-3xl p-8 mb-8 text-left relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Check size={120} className="text-white" />
                                    </div>
                                    <h3 className="text-white font-heading font-bold text-xl mb-6 flex items-center gap-2">
                                        <img src="/logo.png" className="w-6 h-6 object-contain" alt="" />
                                        🐯 TigerHost Order Details
                                    </h3>
                                    <div className="space-y-4 font-body border-t border-white/5 pt-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">👤 Name</span>
                                                <span className="text-white text-sm font-semibold">{formData.name}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">💬 Discord</span>
                                                <span className="text-white text-sm font-semibold">{formData.discord}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">📦 Plan</span>
                                                <span className="text-orange text-sm font-bold uppercase">{plan.name}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">💰 Price</span>
                                                <span className="text-white text-sm font-semibold">{formatPrice(plan[`price${currency}`])}/mo ({currency})</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">🌍 Country</span>
                                                <span className="text-white text-sm font-semibold">{formData.country}</span>
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] uppercase tracking-widest text-steel/40">📝 Notes</span>
                                                <span className="text-white text-xs leading-relaxed line-clamp-2">{formData.notes || 'None'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    onClick={copyOrderDetails}
                                    className="flex items-center gap-2 mx-auto mb-16 text-steel/60 hover:text-orange transition-colors font-body text-sm font-bold uppercase tracking-widest group"
                                >
                                    <Copy size={18} className="group-hover:scale-110 transition-transform" />
                                    Copy Order Details
                                </button>

                                <div className="space-y-6">
                                    <p className="text-steel/50 font-heading text-xs uppercase tracking-[0.3em] font-bold">Now Complete via</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Discord Option */}
                                        {orderSettings.showDiscord && (
                                            <div className="bg-[#1A1A2E]/80 border border-indigo-500/20 rounded-3xl p-8 hover:border-indigo-500/40 transition-all group">
                                                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                    <MessageSquare size={32} className="text-indigo-400" />
                                                </div>
                                                <h4 className="text-xl font-heading font-bold text-white mb-2 uppercase tracking-wide">ORDER VIA DISCORD</h4>
                                                <p className="text-steel/60 text-sm mb-8">Join our community and paste your order info in <span className="text-indigo-400 font-bold">{orderSettings.discordChannel}</span></p>
                                                <a 
                                                    href={orderSettings.discordInvite}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-heading font-bold text-sm tracking-widest shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all"
                                                >
                                                    Join Discord & Order
                                                    <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        )}

                                        {/* WhatsApp Option */}
                                        {orderSettings.showWhatsApp && (
                                            <div className="bg-[#1A1A2E]/80 border border-emerald-500/20 rounded-3xl p-8 hover:border-emerald-500/40 transition-all group">
                                                <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                    <Phone size={32} className="text-emerald-400" />
                                                </div>
                                                <h4 className="text-xl font-heading font-bold text-white mb-2 uppercase tracking-wide">ORDER VIA WHATSAPP</h4>
                                                <p className="text-steel/60 text-sm mb-8">Reach out to our support team directly via WhatsApp for instant assistance.</p>
                                                <a 
                                                    href={`https://wa.me/${orderSettings.whatsappNumber.replace(/\+/g, '')}?text=${encodeURIComponent(orderSettings.copyTemplate.replace('{name}', formData.name).replace('{discord}', formData.discord).replace('{planName}', plan.name).replace('{serviceName}', plan.service).replace('{price}', `${formatPrice(plan[`price${currency}`])}/mo`).replace('{currency}', currency).replace('{country}', formData.country).replace('{notes}', formData.notes || 'None'))}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-heading font-bold text-sm tracking-widest shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all"
                                                >
                                                    Order via WhatsApp
                                                    <ExternalLink size={16} />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-steel/40 hover:text-white transition-colors text-sm font-body mt-12 block mx-auto underline underline-offset-4"
                                    >
                                        Order Another Plan
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </main>

            <Footer />
        </div>
    );
}
