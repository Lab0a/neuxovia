import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-corporate-50 overflow-hidden">
      
      {/* Background Grid - Very subtle */}
      <div className="absolute inset-0 bg-grid-pattern [background-size:40px_40px] opacity-[0.4]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-20">
        <div className="max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent-600 font-bold tracking-wider uppercase mb-6 text-sm flex items-center gap-3"
          >
            <span className="w-8 h-[2px] bg-accent-600 inline-block"></span>
            {t('hero.badge')}
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-medium text-corporate-900 mb-8 leading-[1.1]"
          >
            {t('hero.title1')} <br/> {t('hero.title2')}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 font-light leading-relaxed border-l-4 border-gray-200 pl-6"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row items-start gap-6"
          >
            <a 
              href="#ai-tool" 
              className="px-8 py-4 bg-corporate-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
            >
              {t('hero.cta1')}
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 bg-white border border-gray-200 text-corporate-900 rounded-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 active:scale-95"
            >
              {t('hero.cta2')}
            </a>
          </motion.div>

          {/* Trust Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 pt-10 border-t border-gray-200/50"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6 font-bold">Ils nous font confiance pour leur stratégie IA</p>
            <div className="flex flex-wrap gap-x-12 gap-y-6 items-center opacity-30 grayscale contrast-125">
              <span className="text-xl font-serif font-black tracking-tighter">FINANCE.CO</span>
              <span className="text-xl font-serif font-black tracking-tighter">TECH_CORP</span>
              <span className="text-xl font-serif font-black tracking-tighter">GLOBAL_LOG</span>
              <span className="text-xl font-serif font-black tracking-tighter">RETAIL_NEXT</span>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-0 right-0 flex justify-center animate-bounce text-gray-400"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;