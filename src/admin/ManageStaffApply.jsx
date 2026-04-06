import React, { useState } from 'react';
import { Save, CheckCircle2, ListChecks, Plus, Trash2, X, MessageSquare, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageStaffApply() {
    const { staffApply, updateStaffApply } = useApp();
    const [formData, setFormData] = useState(staffApply);
    const [saved, setSaved] = useState(false);
    
    const [newRequirement, setNewRequirement] = useState('');
    const [newStep, setNewStep] = useState('');

    const handleSave = () => {
        updateStaffApply(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const addItem = (type) => {
        if (type === 'requirement' && newRequirement.trim()) {
            setFormData({ ...formData, requirements: [...formData.requirements, newRequirement.trim()] });
            setNewRequirement('');
        } else if (type === 'step' && newStep.trim()) {
            setFormData({ ...formData, steps: [...formData.steps, newStep.trim()] });
            setNewStep('');
        }
    };

    const removeItem = (type, index) => {
        if (type === 'requirement') {
            const updated = formData.requirements.filter((_, i) => i !== index);
            setFormData({ ...formData, requirements: updated });
        } else if (type === 'step') {
            const updated = formData.steps.filter((_, i) => i !== index);
            setFormData({ ...formData, steps: updated });
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Staff Applications Settings</h2>
                <p className="text-steel/70 font-body">Configure application status, requirements, and hiring steps.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Status & Link */}
                <div className="lg:col-span-1 glass p-8 rounded-3xl space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-heading text-steel/70 uppercase tracking-widest block">Application Status</label>
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                            <button 
                                onClick={() => setFormData({ ...formData, status: 'Open' })}
                                className={`flex-1 py-3 rounded-lg font-heading font-bold text-sm transition-all ${
                                    formData.status === 'Open' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-steel hover:text-white'
                                }`}
                            >
                                OPEN
                            </button>
                            <button 
                                onClick={() => setFormData({ ...formData, status: 'Closed' })}
                                className={`flex-1 py-3 rounded-lg font-heading font-bold text-sm transition-all ${
                                    formData.status === 'Closed' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'text-steel hover:text-white'
                                }`}
                            >
                                CLOSED
                            </button>
                        </div>
                        {formData.status === 'Closed' && (
                            <p className="flex items-center gap-2 text-red-400 text-[10px] font-body">
                                <AlertTriangle size={12} />
                                Users won't be able to click the Apply button.
                            </p>
                        )}
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                        <label className="text-xs font-heading text-steel/70 uppercase tracking-widest block">Application Discord Link</label>
                        <input 
                            type="text" required value={formData.discordLink}
                            onChange={e => setFormData({ ...formData, discordLink: e.target.value })}
                            className="admin-input" placeholder="https://dsc.gg/tigerhost"
                        />
                    </div>
                </div>

                {/* Requirements & Steps */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Requirements */}
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-3">
                            <ListChecks className="text-orange" />
                            Application Requirements
                        </h3>
                        
                        <div className="flex gap-2">
                            <input 
                                type="text" value={newRequirement}
                                onChange={e => setNewRequirement(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && addItem('requirement')}
                                className="admin-input" placeholder="Add a requirement..."
                            />
                            <button onClick={() => addItem('requirement')} className="p-4 bg-orange/10 text-orange hover:bg-orange hover:text-white rounded-xl transition-all">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                            {formData.requirements.map((req, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl group hover:border-orange/30 border border-transparent transition-all">
                                    <span className="text-steel/80 font-body text-sm truncate">{req}</span>
                                    <button onClick={() => removeItem('requirement', i)} className="text-steel/30 hover:text-red-500 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Steps */}
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h3 className="text-xl font-heading font-bold text-white flex items-center gap-3">
                            <MessageSquare className="text-orange" size={20} />
                            Hiring Steps
                        </h3>
                        
                        <div className="flex gap-2">
                            <input 
                                type="text" value={newStep}
                                onChange={e => setNewStep(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && addItem('step')}
                                className="admin-input" placeholder="Add a hiring step..."
                            />
                            <button onClick={() => addItem('step')} className="p-4 bg-orange/10 text-orange hover:bg-orange hover:text-white rounded-xl transition-all">
                                <Plus size={20} />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {formData.steps.map((step, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl group hover:glow-orange transition-all border border-transparent">
                                    <span className="w-8 h-8 flex-shrink-0 bg-orange/10 text-orange rounded-lg flex items-center justify-center font-heading font-bold text-xs">{i + 1}</span>
                                    <span className="text-steel/80 font-body text-sm flex-1">{step}</span>
                                    <button onClick={() => removeItem('step', i)} className="text-steel/30 hover:text-red-500 transition-colors">
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3">
                    <button 
                        onClick={handleSave} 
                        className={`w-full py-5 rounded-2xl font-heading font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                            saved ? 'bg-green-500 text-white shadow-green-500/20' : 'btn-primary'
                        }`}
                    >
                        {saved ? <CheckCircle2 size={24} /> : <Save size={24} />}
                        {saved ? 'Staff Settings Saved Successfully ✅' : 'Save All Staff Apply Settings'}
                    </button>
                </div>
            </div>
        </div>
    );
}
