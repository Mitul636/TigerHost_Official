import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, UserPlus, Save, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageTeam() {
    const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useApp();
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '', role: '', bio: '', avatar: '',
        discord: '', twitter: '', instagram: '',
        order: team.length + 1, active: true
    });

    const resetForm = () => {
        setFormData({
            name: '', role: '', bio: '', avatar: '',
            discord: '', twitter: '', instagram: '',
            order: team.length + 1, active: true
        });
        setIsAdding(false);
        setEditingId(null);
    };

    const handleEdit = (member) => {
        setFormData(member);
        setEditingId(member.id);
        setIsAdding(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            updateTeamMember(editingId, formData);
        } else {
            addTeamMember(formData);
        }
        resetForm();
    };

    const reorder = (id, direction) => {
        const index = team.findIndex(m => m.id === id);
        if ((direction === -1 && index === 0) || (direction === 1 && index === team.length - 1)) return;
        
        const newTeam = [...team];
        const temp = newTeam[index].order;
        newTeam[index].order = newTeam[index + direction].order;
        newTeam[index + direction].order = temp;
        
        // Update both in state
        updateTeamMember(newTeam[index].id, { order: newTeam[index].order });
        updateTeamMember(newTeam[index + direction].id, { order: newTeam[index + direction].order });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-2">Manage Team Members</h2>
                    <p className="text-steel/70 font-body">Add, edit or remove people from your team page.</p>
                </div>
                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
                        <UserPlus size={20} /> Add Member
                    </button>
                )}
            </div>

            {isAdding && (
                <div className="glass p-8 rounded-2xl border-orange/30">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-heading font-bold text-white">
                            {editingId ? 'Edit Member' : 'Add New Member'}
                        </h3>
                        <button onClick={resetForm} className="text-steel hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Full Name</label>
                            <input 
                                type="text" required value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="admin-input" placeholder="e.g. Jabir"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Role / Position</label>
                            <input 
                                type="text" required value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="admin-input" placeholder="e.g. CEO"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Avatar URL</label>
                            <input 
                                type="url" required value={formData.avatar}
                                onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                                className="admin-input" placeholder="https://..."
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Short Bio</label>
                            <textarea 
                                required value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                className="admin-input min-h-[100px]" placeholder="Tell us about this member..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Discord Link</label>
                            <input 
                                type="text" value={formData.discord}
                                onChange={e => setFormData({ ...formData, discord: e.target.value })}
                                className="admin-input" placeholder="https://discord..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Twitter (X) Link</label>
                            <input 
                                type="text" value={formData.twitter}
                                onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                                className="admin-input" placeholder="https://x.com/..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-heading text-steel/70 uppercase tracking-widest">Instagram Link</label>
                            <input 
                                type="text" value={formData.instagram}
                                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                                className="admin-input" placeholder="https://instagram..."
                            />
                        </div>
                        <div className="flex items-center gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <input 
                                    type="checkbox" id="active" checked={formData.active}
                                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                                    className="w-5 h-5 accent-orange"
                                />
                                <label htmlFor="active" className="text-white font-body">Active Member</label>
                            </div>
                        </div>

                        <div className="md:col-span-2 pt-6 flex gap-4">
                            <button type="submit" className="btn-primary flex-1 py-4 flex items-center justify-center gap-2">
                                <Save size={20} /> {editingId ? 'Update Member' : 'Save Member'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="glass overflow-hidden rounded-2xl border-white/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                            <th className="p-6 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest">Avatar</th>
                            <th className="p-6 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest">Name & Role</th>
                            <th className="p-6 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest text-center">Order</th>
                            <th className="p-6 text-sm font-heading font-bold text-steel/70 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {team.sort((a,b) => a.order - b.order).map((member, idx) => (
                            <tr key={member.id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="p-6">
                                    <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover border border-orange/30 group-hover:border-orange transition-colors" />
                                </td>
                                <td className="p-6">
                                    <h4 className="text-white font-heading font-bold">{member.name}</h4>
                                    <p className="text-orange text-xs uppercase tracking-widest">{member.role}</p>
                                    {!member.active && <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded font-heading font-bold mt-1 inline-block">INACTIVE</span>}
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button onClick={() => reorder(member.id, -1)} className="p-1 hover:text-orange text-steel/40 disabled:opacity-20" disabled={idx === 0}>
                                            <ArrowUp size={18} />
                                        </button>
                                        <span className="text-white font-heading font-bold w-6 text-center">{member.order}</span>
                                        <button onClick={() => reorder(member.id, 1)} className="p-1 hover:text-orange text-steel/40 disabled:opacity-20" disabled={idx === team.length - 1}>
                                            <ArrowDown size={18} />
                                        </button>
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button onClick={() => handleEdit(member)} className="p-2 bg-orange/10 text-orange hover:bg-orange hover:text-white rounded-lg transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => deleteTeamMember(member.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
