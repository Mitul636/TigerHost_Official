import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SiteSettings() {
    const { settings, updateSettings } = useApp();
    const [formData, setFormData] = useState({ ...settings });
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        if (successMsg) {
            const timer = setTimeout(() => setSuccessMsg(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [successMsg]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateSettings(formData);
        setSuccessMsg('Settings saved successfully!');
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-heading font-bold text-white mb-2">Site Settings</h1>
                <p className="text-steel/60 font-body text-sm">Configure global brand options and external links.</p>
            </div>

            {successMsg && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-body text-sm inline-block w-full">
                    {successMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="glass rounded-xl p-6 md:p-8 border border-[#0D2028]/30">

                {/* Brand Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-heading font-semibold text-white mb-4 border-b border-[#0D2028]/20 pb-2">Branding</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">Brand Name</label>
                            <input
                                type="text"
                                required
                                value={formData.brandName}
                                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">Footer Tagline</label>
                            <input
                                type="text"
                                value={formData.footerText}
                                onChange={(e) => setFormData({ ...formData, footerText: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                    </div>
                </div>

                {/* Links Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-heading font-semibold text-white mb-4 border-b border-[#0D2028]/20 pb-2">External Links</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">Game Panel URL (Pterodactyl etc.)</label>
                            <input
                                type="url"
                                value={formData.gamePanelUrl || ''}
                                onChange={(e) => setFormData({ ...formData, gamePanelUrl: e.target.value })}
                                className="admin-input"
                                placeholder="https://control.tigerhost.space/"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">VM Panel URL (PVE/Virtualizor etc.)</label>
                            <input
                                type="url"
                                value={formData.vmPanelUrl || ''}
                                onChange={(e) => setFormData({ ...formData, vmPanelUrl: e.target.value })}
                                className="admin-input"
                                placeholder="https://control-vm.tigerhost.space/"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">Discord Invite Link</label>
                            <input
                                type="url"
                                value={formData.discordLink}
                                onChange={(e) => setFormData({ ...formData, discordLink: e.target.value })}
                                className="admin-input"
                                placeholder="https://discord.gg/yourcode"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mb-8">
                    <h2 className="text-lg font-heading font-semibold text-white mb-4 border-b border-[#0D2028]/20 pb-2">Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-body text-steel/80 mb-1.5">Support Email</label>
                            <input
                                type="email"
                                value={formData.contactEmail}
                                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                                className="admin-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#0D2028]/30 pt-6 flex justify-end">
                    <button type="submit" className="btn-primary !py-2.5 !px-8 flex items-center gap-2">
                        <Save size={18} /> Save Settings
                    </button>
                </div>

            </form>
        </div>
    );
}
