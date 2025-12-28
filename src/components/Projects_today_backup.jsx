// Sauvegarde de la version actuelle avec toutes les modifications d'aujourd'hui
// Date: 17 Dec 2025
// Contient: extraction couleur dominante, rotation améliorée, effets 3D

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getCachedDominantColor, createGradientFromColor } from '../utils/colorExtractor';

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1497211419994-14233120dbe4?q=80&w=600&auto=format&fit=crop";

const projectsData = [
  { id: 1, title: 'Post Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 2, title: 'Affiche Instagram', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 3, title: 'Bannière LinkedIn', client: 'Chrisnaud', category: 'Social Media', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 4, title: 'Montage TikTok', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 5, title: 'Montage YouTube Motion', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 6, title: 'Présentation Site', client: 'Chrisnaud', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2024' },
  { id: 7, title: 'Montage YouTube', client: 'KOUTON Spéro', category: 'Motion Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 8, title: 'Affiches Annonces', client: 'GAMPLAY', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 9, title: 'Affiches Publicitaires', client: 'Novaflex', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2023' },
  { id: 10, title: 'Logo GAMPLAY', client: 'GAMPLAY', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 11, title: 'Logo Snaki', client: 'Snaki', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 12, title: 'Logo Blue Pastry', client: 'Blue Pastry', category: 'Branding', image: "/images/blue_pastry_logo.webp", year: '2022' },
  { id: 13, title: 'Logo Christ Milla', client: 'Christ Milla', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 14, title: "Logo Lari's House", client: "Lari's House", category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 15, title: 'Logo Novaflex', client: 'Novaflex', category: 'Branding', image: PLACEHOLDER_IMG, year: '2022' }, 
  { id: 16, title: 'Menu Restaurant', client: 'Wadou Tasty', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 17, title: 'Menu Restaurant', client: 'Zitawi', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 18, title: 'Roue de la Fortune', client: 'Wadou Tasty', category: 'Interactive', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 19, title: 'Salon Manucure', client: "Lari's House", category: 'Print Design', image: PLACEHOLDER_IMG, year: '2022' },
  { id: 20, title: 'Pub Spéciale', client: 'Kadox', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 21, title: 'Pub Trading', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 22, title: 'Pub Shopify', client: 'Chancel', category: 'Print Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 23, title: 'Web Design', client: 'GAMPLAY', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021' },
  { id: 24, title: 'Web Design', client: 'Snaki', category: 'Web Design', image: PLACEHOLDER_IMG, year: '2021' }
];

// [Suite du fichier avec toutes les modifications...]
