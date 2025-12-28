import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, User, Mail, FileText } from 'lucide-react';

const Navigation = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'hero', label: 'Accueil', icon: Home },
    { id: 'projets', label: 'Projets', icon: Briefcase },
    { id: 'apropos', label: 'À Propos', icon: User },
    { id: 'devis', label: 'Devis', icon: FileText },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-charcoal/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl"
      >
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-space text-sm transition-all duration-300 flex items-center gap-2 ${isActive
                  ? 'bg-lightBrown text-charcoal'
                  : 'text-beige hover:bg-beige/10'
                  }`}
              >
                <Icon size={16} />
                <span className="hidden md:inline">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navigation;