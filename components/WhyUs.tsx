import React from 'react';
import { ShieldCheck, Target, Users, Award } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const WhyUs: React.FC = () => {
  const { t } = useLanguage();

  const commitments = [
    {
      icon: <ShieldCheck className="w-10 h-10 text-accent-600" />,
      title: t('why.1.title'),
      description: t('why.1.desc')
    },
    {
      icon: <Target className="w-10 h-10 text-accent-600" />,
      title: t('why.2.title'),
      description: t('why.2.desc')
    },
    {
      icon: <Users className="w-10 h-10 text-accent-600" />,
      title: t('why.3.title'),
      description: t('why.3.desc')
    },
    {
      icon: <Award className="w-10 h-10 text-accent-600" />,
      title: t('why.4.title'),
      description: t('why.4.desc')
    }
  ];

  return (
    <section id="commitments" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('why.badge')}</span>
            <h2 className="text-5xl md:text-6xl font-serif text-corporate-900 mb-8 leading-tight">
              {t('why.title1')} <br/> {t('why.title2')}
            </h2>
            <p className="text-gray-600 text-lg mb-12 max-w-md leading-relaxed">
              {t('why.subtitle')}
            </p>
            <div className="flex flex-wrap gap-8 items-center opacity-40 grayscale">
              <div className="text-xl font-bold font-serif text-gray-800 tracking-tighter italic">{t('why.tag1')}</div>
              <div className="text-xl font-bold font-serif text-gray-800 tracking-tighter italic">{t('why.tag2')}</div>
              <div className="text-xl font-bold font-serif text-gray-800 tracking-tighter italic">{t('why.tag3')}</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {commitments.map((item, index) => (
              <div key={index} className="p-8 bg-corporate-50 rounded-2xl border border-gray-100 hover:border-accent-200 transition-colors group">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-corporate-900 mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
