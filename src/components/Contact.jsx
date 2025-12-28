
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight, Instagram, Linkedin, Youtube, Download } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState('idle'); // idle, sending, success
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const panelRef = useRef(null);
  const formRef = useRef(null);
  const leftInfoRef = useRef(null);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    // Staggered entry animation
    const ctx = gsap.context(() => {
      gsap.from(".info-item", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".form-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.4
      });

      gsap.from(panelRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });
    });
    return () => ctx.revert();
  }, []);

  // Magnetic Button Logic
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
    const text = `*Nouveau Message Contact*\n\nNom: ${formData.name}\nEmail: ${formData.email}\nSujet: ${formData.subject}\nMessage: ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    await new Promise(resolve => setTimeout(resolve, 1500));
    window.open(whatsappUrl, '_blank');
    setFormState('success');
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] relative overflow-y-auto flex items-center justify-center pt-32 pb-8 px-4 md:p-8">
      {/* Background Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[40vw] h-[40vw] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Glass Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] backdrop-blur-[12px] shadow-2xl overflow-hidden"
      >
        {/* Left Side: Information */}
        <div className="p-6 md:p-16 lg:border-r border-white/[0.05] flex flex-col justify-between" ref={leftInfoRef}>
          <div className="space-y-12">
            <div className="space-y-4 info-item">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-space font-bold text-green-500 uppercase tracking-widest">Disponible pour vos projets</span>
              </div>


              <h1 className="text-4xl md:text-6xl font-space font-bold text-white tracking-tighter leading-none">
                DITES SALUT.
              </h1>
              <p className="font-inter text-lg text-white/60 max-w-sm">
                Vous avez une idée, un projet ou juste envie de discuter design ? Je suis à un message de distance.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, label: "Email", value: "koutonsperop@gmail.com" },
                { icon: Phone, label: "Whatsapp", value: "+229 0143202240" },
                { icon: Phone, label: "Contact", value: "+229 0153305895" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 info-item group">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                    <item.icon className="w-5 h-5 text-white/40 group-hover:text-indigo-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-space text-[10px] text-white/30 uppercase tracking-[0.2em]">{item.label}</p>
                    <p className="font-inter text-lg text-white/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 pt-12 info-item">
            {[
              { icon: Youtube, href: "https://www.youtube.com/@Spero_K" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/spero-précieux-kouton-8baa95398" },
              { icon: Instagram, href: "https://www.instagram.com/lill._.ng/" }
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300">
                <item.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-6 md:p-16 relative">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <InputField label="Nom complet" id="name" value={formData.name} onChange={handleChange} />
              <InputField label="Adresse email" id="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <InputField label="Sujet" id="subject" value={formData.subject} onChange={handleChange} />
            <InputField label="Votre message" id="message" isTextArea={true} value={formData.message} onChange={handleChange} />

            <div className="pt-4 form-item flex flex-col md:flex-row items-center gap-4 lg:justify-start">
              <button
                ref={submitBtnRef}
                disabled={formState !== 'idle'}
                className={`relative px-10 py-4 bg-white text-black font-space font-bold rounded-full overflow-hidden transition-all duration-500 flex items-center gap-3 disabled:opacity-50
                  ${formState === 'idle' ? 'hover:scale-105 hover:bg-indigo-50' : ''}`}
              >
                <span className="relative z-10 text-sm tracking-widest uppercase">
                  {formState === 'idle' ? "Envoyer le message" : "Envoi en cours..."}
                </span>
                {formState === 'idle' && <Send size={16} className="relative z-10" />}
              </button>

              <a
                href="/images/Mon CV Designer.pdf"
                download="Kouton_Spero_Precieux_CV.pdf"
                className="px-8 py-4 border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="font-space font-bold text-sm tracking-widest text-white/70 group-hover:text-white uppercase">Télécharger CV</span>
                <Download size={16} className="text-white/40 group-hover:text-indigo-400 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </form>

          {/* Success Overlay */}
          <AnimatePresence>
            {formState === 'success' && (
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="absolute inset-0 z-20 bg-[#050505] flex flex-col items-center justify-center p-8 text-center"
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", damping: 15 }}
                  >
                    <CheckCircle2 className="w-24 h-24 text-indigo-500 mx-auto" strokeWidth={1} />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-space font-bold text-white">MESSAGE ENVOYÉ !</h3>
                    <p className="text-white/60 font-inter">Merci pour votre confiance. Je vous répondrai sous 24h.</p>
                  </div>
                  <button
                    onClick={() => setFormState('idle')}
                    className="flex items-center gap-2 mx-auto text-indigo-400 font-space text-[10px] uppercase tracking-[0.2em] hover:text-indigo-300 transition-colors"
                  >
                    Envoyer un autre message <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;

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

