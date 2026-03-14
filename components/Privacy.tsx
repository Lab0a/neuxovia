import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-corporate-50">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif text-corporate-900 mb-8">
          {t('privacy.title')}
        </h1>
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          {t('privacy.intro')}
        </p>
        
        <div className="bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm space-y-10">
          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.controller.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.controller.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.data.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.data.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.basis.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.basis.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.retention.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.retention.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.sharing.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.sharing.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.security.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.security.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.rights.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.rights.content') }} />
          </section>

          <section>
            <h2 className="text-xl font-bold text-corporate-900 mb-4">{t('privacy.cookies.title')}</h2>
            <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('privacy.cookies.content') }} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
