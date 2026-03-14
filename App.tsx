import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import AIProjectScope from './components/AIProjectScope';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Legal from './components/Legal';
import Privacy from './components/Privacy';
import Careers from './components/Careers';
import { Page } from './types';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [attachedPdf, setAttachedPdf] = useState<string | undefined>(undefined);

  const handlePrefillContact = (message: string, pdfData?: string) => {
    setPrefilledMessage(message);
    setAttachedPdf(pdfData);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'legal':
        return <Legal />;
      case 'privacy':
        return <Privacy />;
      case 'careers':
        return <Careers />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Services />
            <Methodology />
            <AIProjectScope onSendToContact={handlePrefillContact} />
            <WhyUs />
            <FAQ />
            <Contact prefilledMessage={prefilledMessage} attachedPdf={attachedPdf} />
          </>
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-corporate-900 font-sans selection:bg-corporate-900 selection:text-white">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        <main>
          {renderPage()}
        </main>
        <Footer onNavigate={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
};

export default App;