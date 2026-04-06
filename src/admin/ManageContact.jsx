import React, { useState } from 'react';
import { Save, CheckCircle2, MessageSquare, Mail, Clock, Zap, Twitter, Instagram, Facebook } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageContact() {
    const { contactSettings, updateContactSettings } = useApp();
    const [formData, setFormData] = useState(contactSettings);
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        updateContactSettings(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Contact & Support Settings</h2>
                <p className="text-steel/70 font-body">Manage your Discord links, support email, and social media presence.</p>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Support Info */}
                <div className="glass p-8 rounded-3xl space-y-6">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-3">
                        <MessageSquare className="text-orange" />
                        Support Info
                    </h3>
                    
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-heading text-steel/70 uppercase tracking-widest">Discord Invite Link</label>
                            <input 
                                type="text" required value={formData.discordInvite}
                                onChange={e => setFormData({ ...formData, discordInvite: e.target.value })}
                                className="admin-input" placeholder="https://dsc.gg/tigerhost"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-heading text-steel/70 uppercase tracking-widest">Support Email</label>
                            <input 
                                type="email" required value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="admin-input" placeholder="support@tigerhost.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-heading text-steel/70 uppercase tracking-widest">Working Hours</label>
                                <input 
                                    type="text" required value={formData.hours}
                                    onChange={e => setFormData({ ...formData, hours: e.target.value })}
                                    className="admin-input" placeholder="24/7 Support"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-heading text-steel/70 uppercase tracking-widest">Response Time</label>
                                <input 
                                    type="text" required value={formData.responseTime}
                                    onChange={e => setFormData({ ...formData, responseTime: e.target.value })}
                                    className="admin-input" placeholder="< 15 Minutes"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="glass p-8 rounded-3xl space-y-6">
                    <h3 className="text-xl font-heading font-bold text-white flex items-center gap-3">
                        <Twitter size={20} className="text-orange" />
                        Social Media Links
                    </h3>
                    
                    <div className="space-y-4">
                        {['twitter', 'instagram', 'facebook'].map((platform) => (
                            <div key={platform} className="space-y-2">
                                <label className="text-xs font-heading text-steel/70 uppercase tracking-widest flex items-center gap-2">
                                    {platform === 'twitter' ? <Twitter size={14} /> : 
                                     platform === 'instagram' ? <Instagram size={14} /> : <Facebook size={14} />}
                                    {platform}
                                </label>
                                <input 
                                    type="text" value={formData.socials[platform]}
                                    onChange={e => setFormData({ 
                                        ...formData, 
                                        socials: { ...formData.socials, [platform]: e.target.value } 
                                    })}
                                    className="admin-input capitalize" placeholder={`https://${platform}.com/...`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 pt-4">
                    <button 
                        type="submit" 
                        className={`w-full py-5 rounded-2xl font-heading font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                            saved ? 'bg-green-500 text-white shadow-green-500/20' : 'btn-primary'
                        }`}
                    >
                        {saved ? <CheckCircle2 size={24} /> : <Save size={24} />}
                        {saved ? 'Settings Saved Successfully ✅' : 'Save All Contact Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
