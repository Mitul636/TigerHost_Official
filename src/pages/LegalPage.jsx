import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Clock, List } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LegalPage({ type: propType }) {
    const { type: paramType } = useParams();
    const type = propType || paramType;
    const { legal } = useApp();
    const [toc, setToc] = useState([]);

    const doc = legal[type] || { content: '<h1>Not Found</h1>', lastUpdated: new Date().toISOString() };
    
    useEffect(() => {
        // Simple regex to find headings and generate TOC
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(doc.content, 'text/html');
        const headings = Array.from(htmlDoc.querySelectorAll('h1, h2, h3'));
        const tocItems = headings.map(h => ({
            id: h.innerText.toLowerCase().replace(/\s+/g, '-'),
            text: h.innerText,
            level: h.tagName.toLowerCase()
        }));
        setToc(tocItems);

        // Add IDs to the actual content for scrolling
        let updatedContent = doc.content;
        headings.forEach(h => {
            const id = h.innerText.toLowerCase().replace(/\s+/g, '-');
            updatedContent = updatedContent.replace(h.outerHTML, `<${h.tagName} id="${id}">${h.innerHTML}</${h.tagName}>`);
        });
        // This is a bit hacky, but for a simple site it works. 
        // In a real app we'd uses a proper HTML-to-React parser.
    }, [doc.content]);

    const title = type === 'tos' ? 'Terms of Service' : 
                  type === 'refund' ? 'Refund Policy' : 
                  type === 'privacy' ? 'Privacy Policy' : 'About Us';

    return (
        <div className="min-h-screen bg-[#0D2028]">
            <Navbar />
            
            <div className="pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-steel/50 text-xs font-body mb-8">
                        <Link to="/" className="hover:text-orange transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <span className="text-orange">{title}</span>
                    </nav>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar TOC */}
                        <aside className="lg:w-72 flex-shrink-0">
                            <div className="sticky top-32 glass p-6 rounded-2xl">
                                <h4 className="flex items-center gap-2 text-white font-heading font-bold mb-6 text-sm uppercase tracking-widest">
                                    <List size={16} className="text-orange" />
                                    On this page
                                </h4>
                                <nav className="space-y-3">
                                    {toc.map((item, i) => (
                                        <a 
                                            key={i}
                                            href={`#${item.id}`}
                                            className={`block text-sm font-body transition-all hover:text-orange ${
                                                item.level === 'h1' ? 'text-white font-bold' : 
                                                item.level === 'h2' ? 'text-steel/80 pl-2' : 
                                                'text-steel/60 pl-4'
                                            }`}
                                        >
                                            {item.text}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <main className="flex-1">
                            <div className="mb-12">
                                <motion.h1 
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 border-l-4 border-orange pl-6"
                                >
                                    {title}
                                </motion.h1>
                                <div className="flex items-center gap-4 text-steel/50 text-sm font-body">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-orange" />
                                        <span>Last Updated: {new Date(doc.lastUpdated).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-orange" />
                                        <span>Estimated Reading: 5 min</span>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className="prose prose-invert prose-orange max-w-none 
                                            prose-headings:font-heading prose-headings:font-bold prose-headings:text-white
                                            prose-p:font-body prose-p:text-steel/80 prose-p:leading-relaxed
                                            prose-a:text-orange prose-a:no-underline hover:prose-a:underline
                                            prose-li:text-steel/80 prose-li:font-body
                                            prose-h2:border-l-2 prose-h2:border-orange/30 prose-h2:pl-4 prose-h2:mt-12"
                                dangerouslySetInnerHTML={{ __html: doc.content }}
                            />
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
