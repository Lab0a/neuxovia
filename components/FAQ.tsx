import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq.1.q'),
      answer: t('faq.1.a')
    },
    {
      question: t('faq.2.q'),
      answer: t('faq.2.a')
    },
    {
      question: t('faq.3.q'),
      answer: t('faq.3.a')
    },
    {
      question: t('faq.4.q'),
      answer: t('faq.4.a')
    }
  ];

  return (
    <section id="faq" className="py-32 bg-corporate-900 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('faq.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6">{t('faq.title')}</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-white/10 rounded-xl overflow-hidden bg-white/5 hover:bg-white/[0.08] transition-colors"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4"
                >
                  <span className="font-bold text-lg">{faq.question}</span>
                  {openIndex === index ? <ChevronUp className="text-accent-600 shrink-0" /> : <ChevronDown className="text-gray-500 shrink-0" />}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
