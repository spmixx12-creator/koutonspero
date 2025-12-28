import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Send, CheckCircle2, ArrowRight, ChevronDown } from 'lucide-react';

const Quote = () => {
    const [formState, setFormState] = useState('idle'); // idle, sending, success
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [projectType, setProjectType] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });

    const panelRef = useRef(null);
    const formRef = useRef(null);
    const submitBtnRef = useRef(null);

    const budgets = ["50K", "100K", "300K", "500K", "1M"];
    const projectTypes = [
        "Branding",
        "Social Media",
        "Motion Design",
        "Print Design",
        "Web Design",
        "Motion (GIFs)",
        "Autre"
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".heading-animate", {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.from(".form-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.6
            });

            gsap.from(panelRef.current, {
                scale: 0.98,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });
        });
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const btn = submitBtnRef.current;
        if (!btn || formState === 'success') return;

        const onMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = btn.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const distanceX = clientX - centerX;
            const distanceY = clientY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < 100) {
                gsap.to(btn, {
                    x: distanceX * 0.3,
                    y: distanceY * 0.3,
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [formState]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormState('sending');

        const phoneNumber = "2290143202240";
        const text = `*Nouvelle Demande de Devis*\n\nNom: ${formData.name}\nEmail: ${formData.email}\nType de projet: ${projectType || 'Non spécifié'}\nBudget: ${selectedBudget || 'Non spécifié'}\nDescription: ${formData.description}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

        await new Promise(resolve => setTimeout(resolve, 1500));
        window.open(whatsappUrl, '_blank');
        setFormState('success');
    };

    return (
        <div className="min-h-screen w-full bg-[#050505] relative overflow-y-auto flex flex-col items-center justify-center pt-32 pb-8 px-4 md:p-8">
            {/* Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-indigo-500/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/5 blur-[120px] rounded-full" />

            {/* Content Container */}
            <div className="w-full max-w-5xl z-10">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-8xl font-cormorant italic tracking-tight text-white heading-animate">
                        Créons Ensemble
                    </h1>
                    <p className="font-space text-xs uppercase tracking-[0.4em] text-white/40 heading-animate">
                        Partagez votre vision
                    </p>
                </div>

                <motion.div
                    ref={panelRef}
                    className="relative bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-[3rem] p-6 md:p-16 shadow-2xl overflow-hidden"
                >
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <InputField label="Votre nom" id="name" value={formData.name} onChange={handleChange} />
                            <InputField label="Votre email" id="email" type="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
                            {/* Project Type Dropdown */}
                            <div className="relative group form-item">
                                <label className="absolute -top-6 left-0 uppercase font-space text-[10px] tracking-[0.2em] text-indigo-500">
                                    Type de projet
                                </label>
                                <div className="relative">
                                    <select
                                        value={projectType}
                                        onChange={(e) => setProjectType(e.target.value)}
                                        className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-500 transition-colors font-inter text-white appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="" disabled className="bg-[#050505]">Sélectionnez une catégorie</option>
                                        {projectTypes.map(type => (
                                            <option key={type} value={type} className="bg-[#050505]">{type}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                                </div>
                            </div>

                            {/* Budget Selector */}
                            <div className="space-y-4 form-item">
                                <label className="uppercase font-space text-[10px] tracking-[0.2em] text-white/30 block">
                                    Budget Estimé
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {budgets.map(budget => (
                                        <button
                                            key={budget}
                                            type="button"
                                            onClick={() => setSelectedBudget(budget)}
                                            className={`px-5 py-2 rounded-full border text-[10px] font-space tracking-widest transition-all duration-300
                        ${selectedBudget === budget
                                                    ? 'bg-white text-black border-white'
                                                    : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white'}`}
                                        >
                                            {budget}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <InputField label="Décrivez votre projet..." id="description" isTextArea={true} value={formData.description} onChange={handleChange} />

                        <div className="pt-6 form-item flex justify-center">
                            <button
                                ref={submitBtnRef}
                                disabled={formState !== 'idle'}
                                className="group relative px-12 py-5 bg-white text-black font-space font-bold rounded-full overflow-hidden transition-all duration-500 disabled:opacity-50"
                            >
                                <span className="relative z-10 text-xs tracking-[0.2em] uppercase flex items-center gap-3">
                                    {formState === 'idle' ? "Envoyer ma demande" : "Traitement..."}
                                    <Send size={14} className={`transition-transform duration-500 ${formState === 'idle' ? 'group-hover:translate-x-1 group-hover:-translate-y-1' : ''}`} />
                                </span>
                            </button>
                        </div>
                    </form>

                    {/* Success Overlay */}
                    <AnimatePresence>
                        {formState === 'success' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", damping: 15 }}
                                    className="space-y-6"
                                >
                                    <CheckCircle2 className="w-20 h-20 text-indigo-500 mx-auto" strokeWidth={1} />
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-space font-bold text-white tracking-widest">DEMANDE REÇUE !</h3>
                                        <p className="text-white/60 font-inter text-sm max-w-xs mx-auto">
                                            Merci pour votre confiance. Je reviens vers vous avec un devis détaillé sous 24h.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setFormState('idle')}
                                        className="group flex items-center gap-2 mx-auto text-indigo-400 font-space text-[10px] uppercase tracking-[0.2em] hover:text-indigo-300 transition-colors"
                                    >
                                        Nouvelle demande <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Marquee Footer */}
            <div className="fixed bottom-0 left-0 right-0 py-6 border-t border-white/5 bg-black/50 backdrop-blur-md overflow-hidden z-20">
                <div className="flex animate-marquee whitespace-nowrap">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center gap-12 px-6">
                            <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Créons Ensemble</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
                            <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Demande de Devis</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
                            <span className="text-[10px] font-space text-white/20 tracking-[0.4em] uppercase">Let's Create</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/30" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quote;

const InputField = ({ label, id, type = "text", isTextArea = false, value, onChange }) => {
    const [focused, setFocused] = useState(false);

    return (
        <div className="relative group form-item w-full">
            <label
                htmlFor={id}
                className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase font-space text-[10px] tracking-[0.2em] 
          ${focused || value ? '-top-6 text-indigo-500 opacity-100' : 'top-3 text-white/30 opacity-60'}`}
            >
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    required
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    rows={4}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-500 transition-colors font-inter text-white resize-none"
                />
            ) : (
                <input
                    id={id}
                    type={type}
                    required
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-indigo-500 transition-colors font-inter text-white"
                />
            )}
        </div>
    );
};
