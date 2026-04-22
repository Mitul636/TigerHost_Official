import React, { useState } from 'react';
import { Save, Eye, FileText, Shield, RotateCcw, Info, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ManageLegal() {
    const { legal, updateLegalContent } = useApp();
    const [activeTab, setActiveTab] = useState('tos');
    const [content, setContent] = useState(legal[activeTab].content);
    const [showPreview, setShowPreview] = useState(false);
    const [saved, setSaved] = useState(false);

    const tabs = [
        { id: 'tos', label: 'Terms of Service', icon: <FileText size={18} /> },
        { id: 'refund', label: 'Refund Policy', icon: <RotateCcw size={18} /> },
        { id: 'privacy', label: 'Privacy Policy', icon: <Shield size={18} /> },
        { id: 'about', label: 'About Us', icon: <Info size={18} /> },
    ];

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setContent(legal[tabId].content);
        setShowPreview(false);
        setSaved(false);
    };

    const handleSave = () => {
        updateLegalContent(activeTab, content);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2">Legal & Page Content</h2>
                <p className="text-steel/70 font-body">Edit the content of your legal documents and About Us page.</p>
            </div>

            <div className="flex flex-wrap gap-2 p-1 bg-white/5 rounded-xl border border-white/5 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-heading font-bold text-sm transition-all ${
                            activeTab === tab.id 
                            ? 'bg-orange text-white shadow-lg shadow-orange/20' 
                            : 'text-steel hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="glass rounded-3xl overflow-hidden border-white/5">
                <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowPreview(false)}
                            className={`px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all ${!showPreview ? 'bg-white/10 text-white' : 'text-steel hover:text-white'}`}
                        >
                            Editor
                        </button>
                        <button 
                            onClick={() => setShowPreview(true)}
                            className={`px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-widest transition-all ${showPreview ? 'bg-white/10 text-white' : 'text-steel hover:text-white'}`}
                        >
                            Preview
                        </button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-steel/40 font-body">
                            Last Updated: {new Date(legal[activeTab].lastUpdated).toLocaleString()}
                        </span>
                        <button 
                            onClick={handleSave}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-heading font-bold text-sm transition-all ${
                                saved ? 'bg-green-500 text-white' : 'btn-primary'
                            }`}
                        >
                            {saved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                            {saved ? 'Saved!' : 'Save Changes'}
                        </button>
                    </div>
                </div>

                <div className="p-8 min-h-[500px]">
                    {!showPreview ? (
                        <div className="space-y-4 h-full">
                            <p className="text-xs text-steel/50 font-body bg-orange/5 p-4 rounded-lg border border-orange/10">
                                <span className="text-orange font-bold uppercase mr-2 tracking-widest">Tip:</span> 
                                You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, and &lt;b&gt; for styling.
                            </p>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full h-[600px] bg-transparent border-none focus:ring-0 text-steel font-mono text-sm leading-relaxed outline-none resize-none"
                                placeholder="Enter page content in HTML..."
                            />
                        </div>
                    ) : (
                        <div 
                            className="prose prose-invert prose-orange max-w-none 
                                        prose-headings:font-heading prose-headings:font-bold prose-headings:text-white
                                        prose-p:font-body prose-p:text-steel/80 prose-p:leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
