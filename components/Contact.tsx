import React, { useState } from 'react';
import { Loader2, CheckCircle, FileCheck, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ContactProps {
  prefilledMessage?: string;
  attachedPdf?: string;
}

const Contact: React.FC<ContactProps> = ({ prefilledMessage, attachedPdf: initialPdf }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [attachedPdf, setAttachedPdf] = useState<string | undefined>(initialPdf);

  // Update message and PDF if prefilled changes
  React.useEffect(() => {
    if (prefilledMessage) {
      setFormData(prev => ({
        ...prev,
        message: prefilledMessage
      }));
    }
    if (initialPdf) {
      setAttachedPdf(initialPdf);
    }
  }, [prefilledMessage, initialPdf]);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          attachment: attachedPdf // Send base64 PDF
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi');
      }

      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', company: '', phone: '', message: '' });
      setAttachedPdf(undefined);
      
      // Reset status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      // Reset status after 3 seconds on error
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 bg-corporate-900 text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              {t('contact.title')}
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              {t('contact.subtitle')}
            </p>
            
            <div className="space-y-6 text-gray-300">
              <p className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('contact.hq')}</span>
                <span className="font-serif text-xl">18 rue Georges Aimé, 57000 Metz</span>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('contact.direct')}</span>
                <span className="font-serif text-xl">+33 1 42 00 00 00</span>
              </p>
              <p className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('contact.email_label')}</span>
                <span className="font-serif text-xl">baptiste@neuxovia.com</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-10 rounded-sm text-corporate-900 relative overflow-hidden">
            {status === 'success' ? (
              <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-serif mb-4">{t('contact.success.title')}</h3>
                <p className="text-gray-600">
                  {t('contact.success.desc')}
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-sm font-bold uppercase tracking-widest text-corporate-900 hover:underline underline-offset-4"
                >
                  {t('contact.success.btn')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.fn')} <span className="text-red-500">*</span></label>
                    <input 
                      id="firstName"
                      name="firstName"
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.ln')} <span className="text-red-500">*</span></label>
                    <input 
                      id="lastName"
                      name="lastName"
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none" 
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.email')} <span className="text-red-500">*</span></label>
                    <input 
                      id="email"
                      name="email"
                      type="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.phone')}</label>
                    <input 
                      id="phone"
                      name="phone"
                      type="tel" 
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.company')}</label>
                  <input 
                    id="company"
                    name="company"
                    type="text" 
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none" 
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wide">{t('contact.form.message')} <span className="text-red-500">*</span></label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-corporate-900 transition-colors rounded-none resize-none"
                  ></textarea>
                </div>

                {attachedPdf && (
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent-100 text-accent-700 rounded flex items-center justify-center">
                        <FileCheck size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-corporate-900">{t('contact.form.pdf')}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-tighter">Neuxovia_Recommandation_IA.pdf</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setAttachedPdf(undefined)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-corporate-900 text-white font-bold py-5 hover:bg-gray-800 transition-all uppercase tracking-widest text-sm mt-4 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t('contact.form.loading')}
                    </>
                  ) : (
                    t('contact.form.submit')
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
