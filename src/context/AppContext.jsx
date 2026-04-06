import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AppContext = createContext();

// Fallback defaults (used while loading from Supabase)
const DEFAULT_SETTINGS = {
    brandName: 'TigerHost',
    logoUrl: '',
    discordLink: 'https://dsc.gg/tigerhost',
    gamePanelUrl: 'https://control.tigerhost.space/',
    vmPanelUrl: 'https://control-vm.tigerhost.space/',
    contactEmail: 'support@tigerhost.com',
    footerText: 'Premium Hosting. Desi Prices.',
    exchangeRates: { usd_to_inr: 84, usd_to_bdt: 110 },
    currencySettings: { defaultCurrency: 'INR', autoDetect: true, showToggle: true, showAllOnCards: false },
    currencyLabels: { INR: '₹ INR', BDT: '৳ BDT', USD: '$ USD' }
};

const DEFAULT_CONTACT = {
    discordInvite: 'https://dsc.gg/tigerhost',
    email: 'support@tigerhost.com',
    hours: '24/7 Support',
    responseTime: '< 15 Minutes',
    socials: { discord: '#', twitter: '#', instagram: '#', facebook: '#' }
};

const DEFAULT_STAFF_APPLY = {
    requirements: ['Minimum age: 15+', 'Active on Discord', 'Good communication skills', 'Available 2+ hours/day'],
    steps: ['Join our Discord server', 'Go to #staff-applications channel', 'Fill out the application form', 'Wait for review'],
    discordLink: 'https://dsc.gg/tigerhost',
    status: 'Open'
};

const DEFAULT_ORDER_SETTINGS = {
    discordInvite: 'https://dsc.gg/tigerhost',
    discordChannel: '#orders',
    whatsappNumber: '+910000000000',
    showDiscord: true,
    showWhatsApp: true,
    requiredFields: { name: true, discord: true, email: false, country: true },
    pageTitle: 'Complete Your Order',
    pageSubtitle: 'Fill in your details to get started',
    successMessage: 'Order Placed Successfully!',
    confetti: true,
    copyTemplate: `━━━━━━━━━━━━━━━━━━━━━
🐯 TigerHost Order Request
━━━━━━━━━━━━━━━━━━━━━
👤 Name: {name}
💬 Discord: {discord}
📦 Plan: {planName}
🏷️ Service: {serviceName}
💰 Price: {price}
💱 Currency: {currency}
🌍 Country: {country}
⚙️ RAM: {ram}
🖥️ CPU: {cpu}
💾 Storage: {storage}
📝 Notes: {notes}`
};

// Helper to map Supabase row to app format
function mapService(row) {
    return { id: row.id, name: row.name, icon: row.icon, description: row.description, visible: row.visible };
}

function mapPlan(row) {
    return {
        id: row.id, name: row.name, slug: row.slug, service: row.service,
        priceINR: Number(row.price_inr), priceBDT: Number(row.price_bdt), priceUSD: Number(row.price_usd),
        features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features,
        badge: row.badge, active: row.active
    };
}

function mapTeamMember(row) {
    return {
        id: row.id, name: row.name, role: row.role, bio: row.bio, avatar: row.avatar,
        discord: row.discord, twitter: row.twitter, instagram: row.instagram,
        order: row.sort_order, active: row.active
    };
}

function mapOffer(row) {
    return {
        id: row.id, title: row.title, description: row.description, badge: row.badge,
        priceINR_old: Number(row.price_inr_old), priceBDT_old: Number(row.price_bdt_old), priceUSD_old: Number(row.price_usd_old),
        priceINR_new: Number(row.price_inr_new), priceBDT_new: Number(row.price_bdt_new), priceUSD_new: Number(row.price_usd_new),
        code: row.code, expiry: row.expiry, active: row.active
    };
}

function mapLegal(rows) {
    const legal = {};
    rows.forEach(row => {
        legal[row.page_key] = { content: row.content, lastUpdated: row.last_updated };
    });
    return legal;
}

function mapNavDropdown(row) {
    return { id: row.id, serviceName: row.service_name, description: row.description, order: row.sort_order, active: row.active };
}

export function AppProvider({ children }) {
    const [services, setServices] = useState([]);
    const [plans, setPlans] = useState([]);
    const [team, setTeam] = useState([]);
    const [offers, setOffers] = useState([]);
    const [legal, setLegal] = useState({});
    const [contactSettings, setContactSettings] = useState(DEFAULT_CONTACT);
    const [staffApply, setStaffApply] = useState(DEFAULT_STAFF_APPLY);
    const [settings, setSettings] = useState(DEFAULT_SETTINGS);
    const [navbarDropdown, setNavbarDropdown] = useState([]);
    const [orderSettings, setOrderSettings] = useState(DEFAULT_ORDER_SETTINGS);
    const [currency, setCurrency] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [toast, setToast] = useState(null);
    const [loading, setLoading] = useState(true);

    // ─── Fetch all data from Supabase on mount ───
    const fetchAllData = useCallback(async () => {
        try {
            const [
                { data: servicesData },
                { data: plansData },
                { data: teamData },
                { data: offersData },
                { data: legalData },
                { data: navData },
                { data: configData }
            ] = await Promise.all([
                supabase.from('services').select('*').order('created_at'),
                supabase.from('plans').select('*').order('created_at'),
                supabase.from('team_members').select('*').order('sort_order'),
                supabase.from('offers').select('*').order('created_at'),
                supabase.from('legal_pages').select('*'),
                supabase.from('navbar_dropdown').select('*').order('sort_order'),
                supabase.from('site_config').select('*')
            ]);

            if (servicesData) setServices(servicesData.map(mapService));
            if (plansData) setPlans(plansData.map(mapPlan));
            if (teamData) setTeam(teamData.map(mapTeamMember));
            if (offersData) setOffers(offersData.map(mapOffer));
            if (legalData) setLegal(mapLegal(legalData));
            if (navData) setNavbarDropdown(navData.map(mapNavDropdown));

            if (configData) {
                configData.forEach(row => {
                    const val = row.config_value;
                    switch (row.config_key) {
                        case 'settings': setSettings(prev => ({ ...prev, ...val })); break;
                        case 'contact': setContactSettings(val); break;
                        case 'staff_apply': setStaffApply(val); break;
                        case 'order_settings': setOrderSettings(val); break;
                    }
                });
            }
        } catch (err) {
            console.error('Failed to fetch data from Supabase:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Check auth session on mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAdmin(!!session);
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAdmin(!!session);
        });
        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Auto-detect currency
    useEffect(() => {
        const initCurrency = async () => {
            const saved = localStorage.getItem('tigerhost_currency');
            if (saved) { setCurrency(saved); return; }
            if (settings.currencySettings.autoDetect) {
                try {
                    const res = await fetch('http://ip-api.com/json');
                    const data = await res.json();
                    if (data.countryCode === 'IN') setCurrency('INR');
                    else if (data.countryCode === 'BD') setCurrency('BDT');
                    else setCurrency('USD');
                } catch { setCurrency(settings.currencySettings.defaultCurrency || 'INR'); }
            } else {
                setCurrency(settings.currencySettings.defaultCurrency || 'INR');
            }
        };
        initCurrency();
    }, [settings.currencySettings.autoDetect, settings.currencySettings.defaultCurrency]);

    useEffect(() => {
        if (currency) localStorage.setItem('tigerhost_currency', currency);
    }, [currency]);

    // ─── Auth ───
    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return false;
        setIsAdmin(true);
        return true;
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAdmin(false);
    };

    // ─── Services CRUD ───
    const addService = async (service) => {
        const { data, error } = await supabase.from('services').insert({
            name: service.name, icon: service.icon, description: service.description, visible: service.visible
        }).select().single();
        if (!error && data) setServices(prev => [...prev, mapService(data)]);
    };

    const updateService = async (id, updated) => {
        const payload = {};
        if (updated.name !== undefined) payload.name = updated.name;
        if (updated.icon !== undefined) payload.icon = updated.icon;
        if (updated.description !== undefined) payload.description = updated.description;
        if (updated.visible !== undefined) payload.visible = updated.visible;
        const { error } = await supabase.from('services').update(payload).eq('id', id);
        if (!error) setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    };

    const deleteService = async (id) => {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (!error) setServices(prev => prev.filter(s => s.id !== id));
    };

    // ─── Plans CRUD ───
    const addPlan = async (plan) => {
        const { data, error } = await supabase.from('plans').insert({
            name: plan.name, slug: plan.slug, service: plan.service,
            price_inr: plan.priceINR, price_bdt: plan.priceBDT, price_usd: plan.priceUSD,
            features: plan.features, badge: plan.badge || '', active: plan.active !== false
        }).select().single();
        if (!error && data) setPlans(prev => [...prev, mapPlan(data)]);
    };

    const updatePlan = async (id, updated) => {
        const payload = {};
        if (updated.name !== undefined) payload.name = updated.name;
        if (updated.slug !== undefined) payload.slug = updated.slug;
        if (updated.service !== undefined) payload.service = updated.service;
        if (updated.priceINR !== undefined) payload.price_inr = updated.priceINR;
        if (updated.priceBDT !== undefined) payload.price_bdt = updated.priceBDT;
        if (updated.priceUSD !== undefined) payload.price_usd = updated.priceUSD;
        if (updated.features !== undefined) payload.features = updated.features;
        if (updated.badge !== undefined) payload.badge = updated.badge;
        if (updated.active !== undefined) payload.active = updated.active;
        const { error } = await supabase.from('plans').update(payload).eq('id', id);
        if (!error) setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    };

    const deletePlan = async (id) => {
        const { error } = await supabase.from('plans').delete().eq('id', id);
        if (!error) setPlans(prev => prev.filter(p => p.id !== id));
    };

    // ─── Settings ───
    const updateSettings = async (newSettings) => {
        const merged = { ...settings, ...newSettings };
        const { error } = await supabase.from('site_config')
            .update({ config_value: merged, updated_at: new Date().toISOString() })
            .eq('config_key', 'settings');
        if (!error) setSettings(merged);
    };

    // ─── Currency ───
    const formatPrice = (pINR, pBDT, pUSD) => {
        let value = currency === 'INR' ? pINR : currency === 'BDT' ? pBDT : pUSD;
        if (pBDT === undefined && pUSD === undefined) value = pINR;
        const symbol = currency === 'INR' ? '₹' : currency === 'BDT' ? '৳' : '$';
        const decimals = currency === 'USD' ? 2 : 0;
        return `${symbol}${Number(value).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
    };

    const switchCurrency = (code) => {
        setCurrency(code);
        setToast(`Switched to ${settings.currencyLabels[code]}`);
        setTimeout(() => setToast(null), 2000);
    };

    // ─── Team CRUD ───
    const addTeamMember = async (member) => {
        const { data, error } = await supabase.from('team_members').insert({
            name: member.name, role: member.role, bio: member.bio, avatar: member.avatar,
            discord: member.discord, twitter: member.twitter, instagram: member.instagram,
            sort_order: member.order || 0, active: member.active !== false
        }).select().single();
        if (!error && data) setTeam(prev => [...prev, mapTeamMember(data)]);
    };

    const updateTeamMember = async (id, updated) => {
        const payload = {};
        if (updated.name !== undefined) payload.name = updated.name;
        if (updated.role !== undefined) payload.role = updated.role;
        if (updated.bio !== undefined) payload.bio = updated.bio;
        if (updated.avatar !== undefined) payload.avatar = updated.avatar;
        if (updated.discord !== undefined) payload.discord = updated.discord;
        if (updated.twitter !== undefined) payload.twitter = updated.twitter;
        if (updated.instagram !== undefined) payload.instagram = updated.instagram;
        if (updated.order !== undefined) payload.sort_order = updated.order;
        if (updated.active !== undefined) payload.active = updated.active;
        const { error } = await supabase.from('team_members').update(payload).eq('id', id);
        if (!error) setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    };

    const deleteTeamMember = async (id) => {
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (!error) setTeam(prev => prev.filter(m => m.id !== id));
    };

    // ─── Offers CRUD ───
    const addOffer = async (offer) => {
        const { data, error } = await supabase.from('offers').insert({
            title: offer.title, description: offer.description, badge: offer.badge || '',
            price_inr_old: offer.priceINR_old, price_bdt_old: offer.priceBDT_old, price_usd_old: offer.priceUSD_old,
            price_inr_new: offer.priceINR_new, price_bdt_new: offer.priceBDT_new, price_usd_new: offer.priceUSD_new,
            code: offer.code, expiry: offer.expiry || null, active: offer.active !== false
        }).select().single();
        if (!error && data) setOffers(prev => [...prev, mapOffer(data)]);
    };

    const updateOffer = async (id, updated) => {
        const payload = {};
        if (updated.title !== undefined) payload.title = updated.title;
        if (updated.description !== undefined) payload.description = updated.description;
        if (updated.badge !== undefined) payload.badge = updated.badge;
        if (updated.priceINR_old !== undefined) payload.price_inr_old = updated.priceINR_old;
        if (updated.priceBDT_old !== undefined) payload.price_bdt_old = updated.priceBDT_old;
        if (updated.priceUSD_old !== undefined) payload.price_usd_old = updated.priceUSD_old;
        if (updated.priceINR_new !== undefined) payload.price_inr_new = updated.priceINR_new;
        if (updated.priceBDT_new !== undefined) payload.price_bdt_new = updated.priceBDT_new;
        if (updated.priceUSD_new !== undefined) payload.price_usd_new = updated.priceUSD_new;
        if (updated.code !== undefined) payload.code = updated.code;
        if (updated.expiry !== undefined) payload.expiry = updated.expiry;
        if (updated.active !== undefined) payload.active = updated.active;
        const { error } = await supabase.from('offers').update(payload).eq('id', id);
        if (!error) setOffers(prev => prev.map(o => o.id === id ? { ...o, ...updated } : o));
    };

    const deleteOffer = async (id) => {
        const { error } = await supabase.from('offers').delete().eq('id', id);
        if (!error) setOffers(prev => prev.filter(o => o.id !== id));
    };

    // ─── Legal ───
    const updateLegalContent = async (key, content) => {
        const now = new Date().toISOString();
        const { error } = await supabase.from('legal_pages')
            .update({ content, last_updated: now })
            .eq('page_key', key);
        if (!error) setLegal(prev => ({ ...prev, [key]: { content, lastUpdated: now } }));
    };

    // ─── Contact ───
    const updateContactSettings = async (updated) => {
        const merged = { ...contactSettings, ...updated };
        const { error } = await supabase.from('site_config')
            .update({ config_value: merged, updated_at: new Date().toISOString() })
            .eq('config_key', 'contact');
        if (!error) setContactSettings(merged);
    };

    // ─── Staff Apply ───
    const updateStaffApply = async (updated) => {
        const merged = { ...staffApply, ...updated };
        const { error } = await supabase.from('site_config')
            .update({ config_value: merged, updated_at: new Date().toISOString() })
            .eq('config_key', 'staff_apply');
        if (!error) setStaffApply(merged);
    };

    // ─── Navbar Dropdown CRUD ───
    const addNavDropdownItem = async (item) => {
        const { data, error } = await supabase.from('navbar_dropdown').insert({
            service_name: item.serviceName, description: item.description,
            sort_order: item.order || 0, active: item.active !== false
        }).select().single();
        if (!error && data) setNavbarDropdown(prev => [...prev, mapNavDropdown(data)]);
    };

    const updateNavDropdownItem = async (id, updated) => {
        const payload = {};
        if (updated.serviceName !== undefined) payload.service_name = updated.serviceName;
        if (updated.description !== undefined) payload.description = updated.description;
        if (updated.order !== undefined) payload.sort_order = updated.order;
        if (updated.active !== undefined) payload.active = updated.active;
        const { error } = await supabase.from('navbar_dropdown').update(payload).eq('id', id);
        if (!error) setNavbarDropdown(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
    };

    const deleteNavDropdownItem = async (id) => {
        const { error } = await supabase.from('navbar_dropdown').delete().eq('id', id);
        if (!error) setNavbarDropdown(prev => prev.filter(item => item.id !== id));
    };

    const reorderNavDropdowns = async (newItems) => {
        const reordered = newItems.map((item, idx) => ({ ...item, order: idx + 1 }));
        setNavbarDropdown(reordered);
        // Update each item's sort_order in Supabase
        await Promise.all(reordered.map(item =>
            supabase.from('navbar_dropdown').update({ sort_order: item.order }).eq('id', item.id)
        ));
    };

    // ─── Order Settings ───
    const updateOrderSettings = async (updated) => {
        const merged = { ...orderSettings, ...updated };
        const { error } = await supabase.from('site_config')
            .update({ config_value: merged, updated_at: new Date().toISOString() })
            .eq('config_key', 'order_settings');
        if (!error) setOrderSettings(merged);
    };

    return (
        <AppContext.Provider value={{
            services, plans, settings, currency, isAdmin, toast, loading,
            team, offers, legal, contactSettings, staffApply, navbarDropdown,
            setCurrency, switchCurrency, login, logout,
            addService, updateService, deleteService,
            addPlan, updatePlan, deletePlan,
            updateSettings, formatPrice,
            addTeamMember, updateTeamMember, deleteTeamMember,
            addOffer, updateOffer, deleteOffer,
            updateLegalContent, updateContactSettings, updateStaffApply,
            addNavDropdownItem, updateNavDropdownItem, deleteNavDropdownItem, reorderNavDropdowns,
            orderSettings, updateOrderSettings
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
}
