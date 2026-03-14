import React from 'react';
import { Search, Lightbulb, Code, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const IconMap: Record<string, React.FC<any>> = {
  Search, Lightbulb, Code, Zap, BarChart3, ShieldCheck
};

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      title: t('services.1.title'),
      description: t('services.1.desc'),
      icon: "Search"
    },
    {
      title: t('services.2.title'),
      description: t('services.2.desc'),
      icon: "Lightbulb"
    },
    {
      title: t('services.3.title'),
      description: t('services.3.desc'),
      icon: "Code"
    },
    {
      title: t('services.4.title'),
      description: t('services.4.desc'),
      icon: "Zap"
    },
    {
      title: t('services.5.title'),
      description: t('services.5.desc'),
      icon: "BarChart3"
    },
    {
      title: t('services.6.title'),
      description: t('services.6.desc'),
      icon: "ShieldCheck"
    }
  ];

  return (
    <section id="services" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 border-b border-gray-200 pb-8 flex flex-col md:flex-row justify-between items-end"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-4">{t('services.title')}</h2>
            <p className="text-gray-500 text-lg">{t('services.subtitle')}</p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center gap-6">
             <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-accent-600"></span>
               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{t('services.badge')}</span>
             </div>
             <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-corporate-900"></span>
               <span className="text-xs font-bold tracking-widest uppercase text-gray-400">{t('services.badge2')}</span>
             </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = IconMap[service.icon];
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white border border-gray-100 p-8 hover:border-accent-600 hover:shadow-lg transition-all duration-300 group rounded-xl"
              >
                <div className="w-14 h-14 bg-corporate-50 rounded-xl flex items-center justify-center mb-6 text-corporate-900 group-hover:bg-corporate-900 group-hover:text-white transition-colors duration-300">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-corporate-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;