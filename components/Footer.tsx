import React from 'react';
import { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleLinkClick = (e: React.MouseEvent, page: Page) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-16 text-corporate-900">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold tracking-tight mb-6">
                NEUXOVIA<span className="text-accent-600">.</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              {t('footer.desc')}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">{t('footer.nav')}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#hero" className="hover:text-corporate-900 transition-colors">{t('footer.home')}</a></li>
              <li><a href="#services" className="hover:text-corporate-900 transition-colors">{t('nav.expertise')}</a></li>
              <li><a href="#methodology" className="hover:text-corporate-900 transition-colors">{t('nav.method')}</a></li>
              <li><a href="#ai-tool" className="hover:text-corporate-900 transition-colors">{t('nav.ai_simulator')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-6">{t('footer.legal')}</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'legal')} className="hover:text-corporate-900 transition-colors">{t('footer.legal.mentions')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'privacy')} className="hover:text-corporate-900 transition-colors">{t('footer.legal.privacy')}</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'careers')} className="hover:text-corporate-900 transition-colors">{t('footer.legal.careers')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-400 text-xs">
            © {new Date().getFullYear()} Neuxovia. {t('footer.rights')}
          </div>
          <div className="flex gap-6 opacity-30 grayscale items-center">
            <span className="text-xs font-bold font-serif italic">Paris</span>
            <span className="text-xs font-bold font-serif italic">Lyon</span>
            <span className="text-xs font-bold font-serif italic">Bruxelles</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;