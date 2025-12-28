
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TypingText from '@/components/TypingText';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const CV = () => {
  const [showContent, setShowContent] = useState(true);

  const experiences = [
    {
      title: 'Designer Graphique Senior',
      company: 'Freelance',
      period: '2020 - Présent',
      description: 'Création de designs innovants pour divers clients internationaux'
    },
    {
      title: 'Motion Designer',
      company: 'Studio Créatif',
      period: '2018 - 2020',
      description: 'Développement de contenus animés pour les réseaux sociaux'
    },
    {
      title: 'Designer Junior',
      company: 'Agence Digital',
      period: '2016 - 2018',
      description: 'Conception graphique et identité visuelle'
    }
  ];

  const education = [
    {
      degree: 'Master en Design Graphique',
      school: 'École Supérieure des Arts',
      year: '2016'
    },
    {
      degree: 'Licence en Arts Visuels',
      school: 'Université des Arts',
      year: '2014'
    }
  ];

  const skills = [
    { name: 'Adobe Creative Suite', level: 95 },
    { name: 'Motion Design', level: 90 },
    { name: 'Branding', level: 88 },
    { name: 'Web Design', level: 85 },
    { name: 'Typography', level: 92 },
    { name: 'UI/UX Design', level: 87 }
  ];

  return (
    <div className="h-full w-full overflow-y-auto px-4 sm:px-6 md:px-8 py-16 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16 text-center relative"
        >
          <div className="absolute -inset-6 bg-beige/80 backdrop-blur-md -z-10 rounded-full blur-xl left-1/2 -translate-x-1/2 w-48 sm:w-64" />
          {showContent && (
            <TypingText
              text="CURRICULUM VITAE"
              className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-charcoal"
              delay={0}
              speed={100}
            />
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative p-4 sm:p-6 md:p-8 rounded-3xl">
          <div className="absolute inset-0 bg-beige/40 backdrop-blur-sm -z-10 rounded-3xl" />
          
          {/* Left Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-lightBrown" size={28} />
                {showContent && (
                  <TypingText
                    text="Expérience Professionnelle"
                    className="text-3xl font-cormorant font-semibold text-charcoal"
                    delay={1500}
                    speed={80}
                  />
                )}
              </div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3 + index * 0.2, duration: 0.6 }}
                    whileHover={{ x: 10 }}
                    className="border-l-4 border-lightBrown pl-6 py-4 bg-white/50 backdrop-blur-sm rounded-r-lg"
                  >
                    <h3 className="text-xl font-cormorant font-semibold text-charcoal">
                      {exp.title}
                    </h3>
                    <p className="text-lightBrown font-space text-sm mb-2">
                      {exp.company} • {exp.period}
                    </p>
                    <p className="text-charcoal/70 font-space text-sm">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-lightBrown" size={28} />
                <h2 className="text-3xl font-cormorant font-semibold text-charcoal">
                  Formation
                </h2>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 5 + index * 0.2, duration: 0.6 }}
                    whileHover={{ x: 10 }}
                    className="border-l-4 border-lightBrown pl-6 py-4 bg-white/50 backdrop-blur-sm rounded-r-lg"
                  >
                    <h3 className="text-xl font-cormorant font-semibold text-charcoal">
                      {edu.degree}
                    </h3>
                    <p className="text-lightBrown font-space text-sm">
                      {edu.school} • {edu.year}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Award className="text-lightBrown" size={28} />
              <h2 className="text-3xl font-cormorant font-semibold text-charcoal">
                Compétences
              </h2>
            </div>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 6 + index * 0.15, duration: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-space text-charcoal font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm font-space text-lightBrown">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 bg-lightBrown/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 6 + index * 0.15 + 0.3, duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-lightBrown to-charcoal rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 9, duration: 0.8 }}
              className="mt-12 p-6 bg-charcoal rounded-lg shadow-xl"
            >
              <h3 className="text-lg font-cormorant font-semibold text-beige mb-4">
                Télécharger CV
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-lightBrown text-charcoal px-6 py-3 rounded-lg font-space text-sm hover:bg-beige transition-colors duration-300"
                onClick={() => {
                  const { toast } = require('@/components/ui/use-toast').useToast();
                  toast({
                    title: "🚧 Cette fonctionnalité n'est pas encore implémentée",
                    description: "Mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
                  });
                }}
              >
                Télécharger PDF
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CV;
