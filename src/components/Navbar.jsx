import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Zap, ChevronDown, Check, Layout, Grid, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

export default function Navbar() {
    const { currency, switchCurrency, settings, navbarDropdown, plans, formatPrice } = useApp();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showCurrDropdown, setShowCurrDropdown] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileExpanded, setMobileExpanded] = useState(null);
    const closeTimer = useRef(null);

    const handleMouseEnter = (id) => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setActiveDropdown(id);
    };

    const handleMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300);
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const activeNavFeatured = navbarDropdown.filter(item => item.active);
    
    // Base links
    const baseLinksStart = [
        { name: 'Home', href: '/', isInternal: true },
        { name: 'Services', href: '/#services' },
    ];
    
    const baseLinksEnd = [
        { name: 'Special Offers', href: '/offers', isInternal: true },
        { name: 'Team', href: '/team', isInternal: true },
        { name: 'Contact Us', href: '/contact', isInternal: true },
    ];

    const getServicePlans = (serviceName) => {
        return plans.filter(p => p.service === serviceName && p.active).slice(0, 2);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-[#1A1A2E]/90 backdrop-blur-xl shadow-lg shadow-orange/10'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img src={settings.logoUrl || logo} alt="TigerHost Logo" className="w-[42px] h-[42px] object-contain rounded-lg border border-orange/40 group-hover:shadow-orange-glow transition-all duration-300" />
                        <span className="text-xl font-heading font-bold text-white tracking-wider">
                            {settings.brandName || 'TigerHost'}
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {baseLinksStart.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="px-3 py-2 text-sm font-body font-medium text-steel/80 hover:text-orange transition-colors duration-200 rounded-lg hover:bg-orange/5"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Featured Service Dropdowns */}
                        {activeNavFeatured.map((item) => (
                            <div 
                                key={item.id} 
                                className="relative py-4"
                                onMouseEnter={() => handleMouseEnter(item.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className={`px-3 py-2 text-sm font-body font-medium flex items-center gap-1 transition-colors duration-200 rounded-lg hover:bg-orange/5 ${activeDropdown === item.id ? 'text-orange bg-orange/5' : 'text-steel/80'}`}>
                                    {item.serviceName}
                                    <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {activeDropdown === item.id && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                            className="service-dropdown"
                                        >
                                            <div className="mb-4">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-sm font-heading font-bold text-orange">{item.serviceName}</span>
                                                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                                                </div>
                                                <p className="text-[11px] text-steel/50 font-body">{item.description || 'Premium solutions for your needs'}</p>
                                                <div className="h-[1px] bg-white/5 mt-3 w-full" />
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                {getServicePlans(item.serviceName).map(plan => (
                                                    <Link 
                                                        key={plan.id} 
                                                        to={`/order/${plan.slug || plan.id}`}
                                                        className="plan-preview-card flex items-center justify-between group/plan"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        <div>
                                                            <p className="text-xs font-heading font-bold text-white group-hover/plan:text-orange transition-colors">{plan.name}</p>
                                                            <p className="text-[10px] text-steel/50 font-body">Starting at {formatPrice(plan.priceINR, plan.priceBDT, plan.priceUSD)}</p>
                                                        </div>
                                                        <Grid size={14} className="text-steel/20 group-hover/plan:text-orange transition-colors" />
                                                    </Link>
                                                ))}
                                                {getServicePlans(item.serviceName).length === 0 && (
                                                    <p className="text-[10px] text-steel/40 text-center py-2">No plans configured</p>
                                                )}
                                            </div>

                                            <button 
                                                onClick={() => {
                                                    setActiveDropdown(null);
                                                    const section = document.getElementById('plans');
                                                    if(section) section.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                                className="btn-view-all text-xs"
                                            >
                                                <Grid size={14} /> View All {item.serviceName}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {baseLinksEnd.map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="px-3 py-2 text-sm font-body font-medium text-steel/80 hover:text-orange transition-colors duration-200 rounded-lg hover:bg-orange/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Currency Toggle */}
                        {settings.currencySettings?.showToggle && (
                            <div className="relative">
                                <button
                                    onClick={() => setShowCurrDropdown(!showCurrDropdown)}
                                    className={`currency-btn ${showCurrDropdown ? 'active' : ''}`}
                                >
                                    {settings.currencyLabels?.[currency] || currency}
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showCurrDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showCurrDropdown && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-40" 
                                                onClick={() => setShowCurrDropdown(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="currency-dropdown z-50"
                                            >
                                                {['INR', 'BDT', 'USD'].map((code) => (
                                                    <div
                                                        key={code}
                                                        onClick={() => {
                                                            switchCurrency(code);
                                                            setShowCurrDropdown(false);
                                                        }}
                                                        className={`currency-option ${currency === code ? 'active' : ''}`}
                                                    >
                                                        <span>{settings.currencyLabels?.[code] || code}</span>
                                                        {currency === code && <Check className="w-4 h-4 text-orange" />}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Panel Button */}
                        <a
                            href={settings.gamePanelUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline !py-2 !px-4 !text-sm"
                        >
                            Panel
                        </a>

                        {/* Get Started */}
                        <a href="#plans" className="btn-primary !py-2 !px-5 !text-sm">
                            Get Started
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="lg:hidden text-steel p-2"
                    >
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:hidden pb-4 border-t border-steel/30"
                    >
                        <div className="flex flex-col pt-3">
                            {baseLinksStart.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2.5 text-sm font-body font-medium text-steel/80 hover:text-orange hover:bg-orange/5 rounded-lg transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {activeNavFeatured.map((item) => (
                                <div key={item.id} className="flex flex-col">
                                    <button 
                                        onClick={() => setMobileExpanded(mobileExpanded === item.id ? null : item.id)}
                                        className={`px-4 py-2.5 text-sm font-body font-medium flex items-center justify-between transition-all rounded-lg ${mobileExpanded === item.id ? 'text-orange bg-orange/5' : 'text-steel/80'}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {item.serviceName}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === item.id ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {mobileExpanded === item.id && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden pl-4 pr-4 space-y-1 bg-white/5 mx-2 rounded-xl py-2"
                                            >
                                                {getServicePlans(item.serviceName).map(plan => (
                                                    <Link 
                                                        key={plan.id} 
                                                        to={`/order/${plan.slug || plan.id}`}
                                                        className="block p-3 border-b border-white/5 last:border-0 hover:bg-orange/5 transition-colors"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        <p className="text-xs font-heading font-bold text-white mb-0.5">{plan.name}</p>
                                                        <p className="text-[10px] text-steel/50">Starting at {formatPrice(plan.priceINR, plan.priceBDT, plan.priceUSD)}</p>
                                                    </Link>
                                                ))}
                                                <button 
                                                    onClick={() => {
                                                        setMenuOpen(false);
                                                        const section = document.getElementById('plans');
                                                        if(section) section.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="w-full mt-2 btn-view-all !py-2 !text-[11px]"
                                                >
                                                    <Grid size={14} /> View All {item.serviceName}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                            {baseLinksEnd.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="px-4 py-2.5 text-sm font-body font-medium text-steel/80 hover:text-orange hover:bg-orange/5 rounded-lg transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                             {/* Mobile Currency Toggle */}
                            {settings.currencySettings?.showToggle && (
                                <div className="px-4 py-4 mt-2 border-t border-steel/20">
                                    <p className="text-[10px] text-steel/40 uppercase tracking-widest font-heading mb-3">Select Currency</p>
                                    <div className="flex gap-2">
                                        {['INR', 'BDT', 'USD'].map((code) => (
                                            <button
                                                key={code}
                                                onClick={() => switchCurrency(code)}
                                                className={`flex-1 py-2 rounded-lg font-heading font-bold text-xs transition-all duration-200 ${
                                                    currency === code 
                                                    ? 'bg-orange text-white shadow-lg shadow-orange/20' 
                                                    : 'border border-orange/30 text-steel/70 hover:bg-orange/5'
                                                }`}
                                            >
                                                {settings.currencyLabels?.[code]?.split(' ')[0] || code}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-3 px-4 pt-4 border-t border-steel/10">
                                <a href="#plans" className="btn-primary flex-1 !py-3 !text-sm text-center" onClick={() => setMenuOpen(false)}>
                                    Get Started
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
