import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { NavLink, Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks: NavLink[] = [
    { label: t('nav.expertise'), href: '#services' },
    { label: t('nav.method'), href: '#methodology' },
    { label: t('nav.faq'), href: '#faq' },
    { label: t('nav.ai_simulator'), href: '#ai-tool' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (currentPage !== 'home') {
      onNavigate('home');
      // Wait for React to render home before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goHome = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm' 
          : 'bg-white/50 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" onClick={goHome} className="flex items-center gap-2 group">
          <span className="text-2xl font-bold tracking-tight text-corporate-900">
            NEUXOVIA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-600 mt-2"></span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-semibold text-gray-600 hover:text-corporate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-corporate-900 transition-colors"
              title="Switch language"
            >
              <Globe size={16} />
              <span className="uppercase">{language}</span>
            </button>

            <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="bg-corporate-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-gray-200"
            >
              {t('nav.contact')}
            </a>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600"
          >
            <Globe size={16} />
            <span className="uppercase">{language}</span>
          </button>
          <button 
            className="text-corporate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-8 flex flex-col gap-6 shadow-xl h-screen">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-serif text-corporate-900"
            >
              {link.label}
            </a>
          ))}
           <a 
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="text-2xl font-serif text-corporate-900"
            >
              {t('nav.contact')}
            </a>
        </div>
      )}
    </header>
  );
};

export default Header;