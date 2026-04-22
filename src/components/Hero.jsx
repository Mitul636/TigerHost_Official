import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

const CYCLE_WORDS = ["Minecraft Servers", "VPS Hosting", "Bot Hosting", "RDP Hosting", "Web Hosting"];

function AnimatedCounter({ target, suffix = "" }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const targetNum = parseFloat(target.replace(/[^0-9.]/g, ''));

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const duration = 1500;
                const increment = targetNum / (duration / 16);
                
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= targetNum) {
                        setCount(targetNum);
                        clearInterval(timer);
                    } else {
                        setCount(start);
                    }
                }, 16);
                observer.disconnect();
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [targetNum]);

    // Format if it has decimal
    const displayCount = target.includes('.') ? count.toFixed(1) : Math.floor(count);
    
    return <span ref={ref}>{displayCount}{suffix}</span>;
}

export default function Hero() {
    const canvasRef = useRef(null);
    const [typedText, setTypedText] = useState('');
    const [isTypingDone, setIsTypingDone] = useState(false);
    const [cycleIndex, setCycleIndex] = useState(0);

    // Typewriter effect
    useEffect(() => {
        const text = "Welcome to TigerHost";
        let i = 0;
        const timer = setInterval(() => {
            setTypedText(text.slice(0, i + 1));
            i++;
            if (i === text.length) {
                clearInterval(timer);
                setIsTypingDone(true);
            }
        }, 80);
        return () => clearInterval(timer);
    }, []);

    // Cycling words
    useEffect(() => {
        const timer = setInterval(() => {
            setCycleIndex(prev => (prev + 1) % CYCLE_WORDS.length);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232, 66, 10, ${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(13, 32, 40, ${0.15 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            connectParticles();
            animId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Particle Canvas */}
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0D2028] via-[#0D2028]/95 to-[#0D2028] z-[1]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange/5 blur-[120px] z-[1]" />

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">


                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-heading font-black text-white leading-tight mb-2"
                >
                    {typedText.slice(0, 11)}
                    <span className="text-orange text-glow">{typedText.slice(11)}</span>
                    <span className="typewriter-cursor" style={{ animationIterationCount: isTypingDone ? '3' : 'infinite', animationFillMode: 'forwards' }}></span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-xl sm:text-2xl font-heading text-white mb-6 h-8"
                >
                    Powerful hosting for <span className="cycling-word" key={cycleIndex}>{CYCLE_WORDS[cycleIndex]}</span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg sm:text-xl md:text-2xl font-body text-steel max-w-3xl mx-auto mb-10 leading-relaxed"
                >
                    Premium hosting with blazing-fast performance, 99.9% uptime, and 24/7 expert support.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-16"
                >
                    <a href="#plans" className="btn-primary !px-8 !py-3 !text-lg flex items-center gap-2 group">
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="/offers" className="btn-outline !px-8 !py-3 !text-lg flex items-center gap-2">
                        Special Offers
                        <ChevronRight className="w-5 h-5" />
                    </a>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
                >
                    {[
                        { value: '99.9%', label: 'Uptime Guarantee' },
                        { value: '24/7', label: 'Expert Support' },
                        { value: '10+', label: 'Global Locations' },
                        { value: '5000+', label: 'Happy Clients' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl md:text-3xl font-heading font-bold text-orange text-glow">
                                {stat.value === '24/7' ? '24/7' : <AnimatedCounter target={stat.value} suffix={stat.value.replace(/[0-9.]/g, '')} />}
                            </div>
                            <div className="text-sm font-body text-steel/80 mt-1">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0D2028] to-transparent z-10" />
        </section>
    );
}
