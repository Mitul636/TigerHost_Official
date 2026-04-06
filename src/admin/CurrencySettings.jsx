import React, { useState } from 'react';
import { Save, RefreshCw, Info, Globe, Layout, Type, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CurrencySettings() {
    const { settings, updateSettings } = useApp();
    const [formData, setFormData] = useState(settings);
    const [saving, setSaving] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);
        updateSettings(formData);
        setTimeout(() => setSaving(false), 500);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Currency Settings</h2>
                    <p className="text-steel/70 font-body">Manage exchange rates, default currency, and display settings.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Exchange Rates */}
                <div className="glass p-8 rounded-2xl border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange/10 rounded-lg text-orange">
                            <DollarSign size={20} />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white">Manual Exchange Rates</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">1 USD = [INR]</label>
                            <div className="relative">
                                <input 
                                    type="number" step="0.01" required
                                    value={formData.exchangeRates.usd_to_inr}
                                    onChange={e => setFormData({
                                        ...formData,
                                        exchangeRates: { ...formData.exchangeRates, usd_to_inr: Number(e.target.value) }
                                    })}
                                    className="admin-input pl-10"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-steel/40 font-heading">₹</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">1 USD = [BDT]</label>
                            <div className="relative">
                                <input 
                                    type="number" step="0.01" required
                                    value={formData.exchangeRates.usd_to_bdt}
                                    onChange={e => setFormData({
                                        ...formData,
                                        exchangeRates: { ...formData.exchangeRates, usd_to_bdt: Number(e.target.value) }
                                    })}
                                    className="admin-input pl-10"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-steel/40 font-heading">৳</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 p-4 bg-orange/5 border border-orange/20 rounded-xl flex gap-3">
                        <Info className="w-5 h-5 text-orange shrink-0" />
                        <p className="text-sm text-steel/70 font-body">
                            These rates are used for auto-conversion when plan prices are set in INR only in the Plan Management section.
                        </p>
                    </div>
                </div>

                {/* Section 2: Default Currency & Auto-detect */}
                <div className="glass p-8 rounded-2xl border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange/10 rounded-lg text-orange">
                            <Globe size={20} />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white">Default & Detection</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Default Currency</label>
                            <select 
                                value={formData.currencySettings.defaultCurrency}
                                onChange={e => setFormData({
                                    ...formData,
                                    currencySettings: { ...formData.currencySettings, defaultCurrency: e.target.value }
                                })}
                                className="admin-input"
                            >
                                <option value="INR">₹ INR (Indian Rupee)</option>
                                <option value="BDT">৳ BDT (Bangladeshi Taka)</option>
                                <option value="USD">$ USD (US Dollar)</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <p className="text-white font-heading font-bold">Auto-detect Location</p>
                                <p className="text-xs text-steel/50">Identify visitor country and set currency</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    currencySettings: { ...formData.currencySettings, autoDetect: !formData.currencySettings.autoDetect }
                                })}
                                className={`w-12 h-6 rounded-full transition-colors relative ${formData.currencySettings.autoDetect ? 'bg-orange' : 'bg-steel/20'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.currencySettings.autoDetect ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 3: Display Settings */}
                <div className="glass p-8 rounded-2xl border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                            <Layout size={20} />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white">Display Preferences</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <p className="text-white font-heading font-bold">Show Navbar Toggle</p>
                                <p className="text-xs text-steel/50">Show/hide the currency switcher in navbar</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    currencySettings: { ...formData.currencySettings, showToggle: !formData.currencySettings.showToggle }
                                })}
                                className={`w-12 h-6 rounded-full transition-colors relative ${formData.currencySettings.showToggle ? 'bg-orange' : 'bg-steel/20'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.currencySettings.showToggle ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                            <div>
                                <p className="text-white font-heading font-bold">Show All Prices</p>
                                <p className="text-xs text-steel/50">Display all 3 currencies on plan cards</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({
                                    ...formData,
                                    currencySettings: { ...formData.currencySettings, showAllOnCards: !formData.currencySettings.showAllOnCards }
                                })}
                                className={`w-12 h-6 rounded-full transition-colors relative ${formData.currencySettings.showAllOnCards ? 'bg-orange' : 'bg-steel/20'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.currencySettings.showAllOnCards ? 'left-7' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 4: Labels */}
                <div className="glass p-8 rounded-2xl border-white/5">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                            <Type size={20} />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-white">Currency Labels</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['INR', 'BDT', 'USD'].map(code => (
                            <div key={code} className="space-y-2">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">{code} Label</label>
                                <input 
                                    type="text" required
                                    value={formData.currencyLabels[code]}
                                    onChange={e => setFormData({
                                        ...formData,
                                        currencyLabels: { ...formData.currencyLabels, [code]: e.target.value }
                                    })}
                                    className="admin-input"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="btn-primary !px-12 !py-4 flex items-center gap-3" disabled={saving}>
                        {saving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
