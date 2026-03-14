import React from 'react';
import { Search, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Methodology: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Search className="w-8 h-8 text-accent-600" />,
      title: t('method.1.title'),
      description: t('method.1.desc'),
      details: [t('method.1.d1'), t('method.1.d2'), t('method.1.d3')]
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-accent-600" />,
      title: t('method.2.title'),
      description: t('method.2.desc'),
      details: [t('method.2.d1'), t('method.2.d2'), t('method.2.d3')]
    },
    {
      icon: <Zap className="w-8 h-8 text-accent-600" />,
      title: t('method.3.title'),
      description: t('method.3.desc'),
      details: [t('method.3.d1'), t('method.3.d2'), t('method.3.d3')]
    }
  ];

  return (
    <section id="methodology" className="py-32 bg-corporate-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('method.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-corporate-900 leading-tight mb-6">
            {t('method.title1')} <br/> {t('method.title2')}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {t('method.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-10 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="mb-8 p-4 bg-corporate-50 inline-block rounded-2xl group-hover:bg-accent-600 group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>
              <div className="text-accent-600 font-bold text-sm mb-4">0{index + 1}.</div>
              <h3 className="text-2xl font-serif text-corporate-900 mb-6">{step.title}</h3>
              <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                {step.description}
              </p>
              <ul className="space-y-3">
                {step.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <ArrowRight size={12} className="text-accent-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
