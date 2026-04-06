import React, { useState } from 'react';
import { Save, MessageSquare, Phone, Check, X, Shield, Zap, Copy, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderSettings() {
    const { orderSettings, updateOrderSettings } = useApp();
    const [formData, setFormData] = useState(orderSettings);
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateOrderSettings(formData);
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
    };

    const handleFieldToggle = (field) => {
        setFormData({
            ...formData,
            requiredFields: {
                ...formData.requiredFields,
                [field]: !formData.requiredFields[field]
            }
        });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Order System Settings</h2>
                <p className="text-steel/70 font-body">Configure how orders are processed and collected from your users.</p>
            </div>

            {saveStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-xl flex items-center gap-3 text-green-400 animate-slideDown">
                    <Check size={20} />
                    <p className="font-body text-sm font-semibold">Order settings saved successfully!</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 border border-[#0D2028]/30">
                
                {/* Contact Integration */}
                <div className="mb-10">
                    <h3 className="text-lg font-heading font-semibold text-white mb-6 border-b border-[#0D2028]/20 pb-2 flex items-center gap-2">
                        <MessageSquare size={18} className="text-orange" />
                        Communication Channels
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Discord Integration</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, showDiscord: !formData.showDiscord })}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${formData.showDiscord ? 'bg-orange/20 text-orange border border-orange/30' : 'bg-steel/10 text-steel/40 border border-steel/10'}`}
                                >
                                    {formData.showDiscord ? 'Enabled' : 'Disabled'}
                                </button>
                            </div>
                            <input 
                                type="text"
                                placeholder="Discord Invite Link"
                                value={formData.discordInvite}
                                onChange={e => setFormData({ ...formData, discordInvite: e.target.value })}
                                className="admin-input"
                            />
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-[10px] text-steel/40 uppercase mb-1 ml-1 font-bold">Orders Channel</label>
                                    <input 
                                        type="text"
                                        placeholder="e.g. #orders"
                                        value={formData.discordChannel}
                                        onChange={e => setFormData({ ...formData, discordChannel: e.target.value })}
                                        className="admin-input"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">WhatsApp Integration</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, showWhatsApp: !formData.showWhatsApp })}
                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${formData.showWhatsApp ? 'bg-orange/20 text-orange border border-orange/30' : 'bg-steel/10 text-steel/40 border border-steel/10'}`}
                                >
                                    {formData.showWhatsApp ? 'Enabled' : 'Disabled'}
                                </button>
                            </div>
                            <input 
                                type="text"
                                placeholder="WhatsApp Number (with country code)"
                                value={formData.whatsappNumber}
                                onChange={e => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                className="admin-input"
                            />
                            <p className="text-[10px] text-steel/40 ml-1 italic">Example: +919876543210</p>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="mb-10">
                    <h3 className="text-lg font-heading font-semibold text-white mb-6 border-b border-[#0D2028]/20 pb-2 flex items-center gap-2">
                        <Save size={18} className="text-orange" />
                        Required Form Fields
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.keys(formData.requiredFields).map((field) => (
                            <div key={field} className="glass p-4 rounded-xl border-white/5 flex items-center justify-between group">
                                <span className="text-sm text-white font-body capitalize">{field}</span>
                                <button
                                    type="button"
                                    onClick={() => handleFieldToggle(field)}
                                    className={`relative w-10 h-5 rounded-full transition-all ${formData.requiredFields[field] ? 'bg-orange' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${formData.requiredFields[field] ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Page Content */}
                <div className="mb-10">
                    <h3 className="text-lg font-heading font-semibold text-white mb-6 border-b border-[#0D2028]/20 pb-2 flex items-center gap-2">
                        <Zap size={18} className="text-orange" />
                        Page Text & Behavior
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5 font-bold">Page Title</label>
                            <input 
                                type="text"
                                value={formData.pageTitle}
                                onChange={e => setFormData({ ...formData, pageTitle: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5 font-bold">Page Subtitle</label>
                            <input 
                                type="text"
                                value={formData.pageSubtitle}
                                onChange={e => setFormData({ ...formData, pageSubtitle: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5 font-bold">Success Message</label>
                            <input 
                                type="text"
                                value={formData.successMessage}
                                onChange={e => setFormData({ ...formData, successMessage: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-8">
                             <div className="flex items-center gap-3">
                                <span className="text-sm font-body text-white">Enable Confetti on Success</span>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, confetti: !formData.confetti })}
                                    className={`relative w-12 h-6 rounded-full transition-all ${formData.confetti ? 'bg-orange shadow-orange-glow' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.confetti ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copy Template */}
                <div className="mb-0">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-heading font-semibold text-white border-b border-[#0D2028]/20 pb-2 flex items-center gap-2">
                            <Copy size={18} className="text-orange" />
                            Order Copy Template
                        </h3>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-steel/40">{'{'}name{'}'}</span>
                            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-steel/40">{'{'}planName{'}'}</span>
                            <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-steel/40">{'{'}price{'}'}</span>
                        </div>
                    </div>
                    <textarea 
                        rows={10}
                        value={formData.copyTemplate}
                        onChange={e => setFormData({ ...formData, copyTemplate: e.target.value })}
                        className="admin-input font-mono text-xs leading-relaxed"
                    />
                    <div className="mt-4 p-4 bg-orange/5 border border-orange/20 rounded-xl flex gap-3">
                        <Info className="w-5 h-5 text-orange shrink-0" />
                        <p className="text-xs text-steel/70 font-body">
                            The template above determines how the order details look when the customer clicks "Copy Order Details". Use the tags shown above to insert dynamic data.
                        </p>
                    </div>
                </div>

                <div className="border-t border-[#0D2028]/30 pt-8 mt-10 flex justify-end">
                    <button type="submit" className="btn-primary flex items-center gap-2 !px-10">
                        <Save size={20} /> Save Order Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
