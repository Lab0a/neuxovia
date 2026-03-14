import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Legal: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-corporate-50">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-12">
          {t('legal.title')}
        </h1>
        
        <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm space-y-10">
          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.publisher.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.publisher.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.contact.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.contact.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.host.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.host.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.ip.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.ip.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.liability.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.liability.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('legal.jurisdiction.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('legal.jurisdiction.content') }} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Legal;
