import React, { useState } from 'react';
import { Send, Loader2, FileText, Check, ArrowRight, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { generateProjectScope } from '../services/geminiService';
import { ProjectScopeResponse, LoadingState } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AIProjectScopeProps {
  onSendToContact: (message: string, pdfData?: string) => void;
}

const AIProjectScope: React.FC<AIProjectScopeProps> = ({ onSendToContact }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<ProjectScopeResponse | null>(null);
  const { language, t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus(LoadingState.LOADING);
    setResult(null);

    try {
      const data = await generateProjectScope(input, language);
      setResult(data);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      console.error(error);
      setStatus(LoadingState.ERROR);
    }
  };

  const generatePDFBlob = () => {
    if (!result) return null;

    const doc = new jsPDF();
    const margin = 20;
    let y = 20;

    // Neuxovia Branding Colors
    const corporateColor = [26, 26, 26]; // #1a1a1a
    const accentColor = [242, 125, 38]; // #f27d26

    // Header - Neuxovia Style
    doc.setFillColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text("NEUXOVIA", margin, 25);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(language === 'fr' ? "DIAGNOSTIC STRATÉGIQUE IA" : "AI STRATEGIC ASSESSMENT", margin, 32);
    
    y = 55;

    // Title
    doc.setTextColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(t('ai.result_title'), margin, y);
    y += 15;

    // Assessment
    doc.setTextColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(t('ai.assessment').toUpperCase(), margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const splitAssessment = doc.splitTextToSize(result.assessment, 170);
    doc.text(splitAssessment, margin, y);
    y += (splitAssessment.length * 5) + 15;

    // Strategic Recommendations
    doc.setTextColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(t('ai.recommendations').toUpperCase(), margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    result.strategicRecommendations.forEach((rec, i) => {
      doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
      doc.circle(margin + 2, y - 1, 1, 'F');
      const splitRec = doc.splitTextToSize(rec, 160);
      doc.text(splitRec, margin + 7, y);
      y += (splitRec.length * 5) + 3;
    });
    y += 10;

    // Business Impact
    doc.setTextColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(t('ai.impact').toUpperCase(), margin, y);
    y += 7;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const splitImpact = doc.splitTextToSize(result.businessImpact, 170);
    doc.text(splitImpact, margin, y);
    y += (splitImpact.length * 5) + 15;

    // Next Steps
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y, 170, 30, 'F');
    doc.setTextColor(corporateColor[0], corporateColor[1], corporateColor[2]);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(t('ai.next_steps').toUpperCase(), margin + 5, y + 10);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(accentColor[0], accentColor[1], accentColor[2]);
    const splitNext = doc.splitTextToSize(result.nextSteps, 160);
    doc.text(splitNext, margin + 5, y + 18);

    // Footer
    y = 280;
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(t('ai.disclaimer'), margin, y);
    doc.text("www.neuxovia.com", 170, y);

    return doc;
  };

  const downloadPDF = () => {
    const doc = generatePDFBlob();
    if (doc) {
      doc.save(`Neuxovia_Diagnostic_IA.pdf`);
    }
  };

  const handleTransferToContact = () => {
    if (!result) return;
    const doc = generatePDFBlob();
    const pdfBase64 = doc ? doc.output('datauristring') : undefined;
    
    const message = language === 'fr' 
      ? `Bonjour,\n\nJ'ai réalisé un premier diagnostic IA sur votre site pour la problématique suivante :\n\n"${input}"\n\nLe diagnostic souligne des opportunités majeures. Je souhaiterais échanger avec un expert Neuxovia pour approfondir ces recommandations.\n\nCordialement.`
      : `Hello,\n\nI completed an initial AI assessment on your website for the following challenge:\n\n"${input}"\n\nThe assessment highlights major opportunities. I would like to speak with a Neuxovia expert to discuss these recommendations further.\n\nBest regards.`;
    
    onSendToContact(message, pdfBase64);
  };

  return (
    <section id="ai-tool" className="py-32 bg-white border-b border-gray-200">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">{t('ai.badge')}</span>
          <h2 className="text-3xl md:text-4xl font-serif text-corporate-900 mb-6">
            {t('ai.title')}
          </h2>
          <p className="text-gray-600 text-lg">
            {t('ai.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Input Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-corporate-50 p-8 rounded-2xl shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t('ai.label')}</label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('ai.placeholder')}
                  className="w-full bg-white border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[200px] resize-none mb-6 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === LoadingState.LOADING || !input.trim()}
                  className="w-full bg-corporate-900 hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {status === LoadingState.LOADING ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {t('ai.button_loading')}
                    </>
                  ) : (
                    <>
                      {t('ai.button')}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
            
            <div className="p-6 bg-accent-50 rounded-xl border border-accent-100">
              <h4 className="font-semibold text-corporate-900 mb-2 text-sm">{t('ai.why_title')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {t('ai.why_desc')}
              </p>
            </div>
          </div>

          {/* Output Area - Report Style */}
          <div className="lg:col-span-3">
             {!result && status !== LoadingState.LOADING && (
                <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 bg-corporate-50/50">
                   <FileText size={48} className="mb-4 opacity-20" />
                   <p className="text-sm font-medium">{t('ai.empty_state')}</p>
                </div>
             )}

             {status === LoadingState.LOADING && (
               <div className="h-full min-h-[400px] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12">
                 <div className="w-full max-w-xs space-y-4">
                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                     <div className="h-full bg-accent-600 animate-[loading_2s_ease-in-out_infinite] w-1/2"></div>
                   </div>
                   <p className="text-center text-sm text-gray-500">{t('ai.loading_state')}</p>
                 </div>
               </div>
             )}

             {result && (
               <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-fade-in-up">
                 <div className="bg-corporate-900 text-white p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-serif text-xl">{t('ai.result_title')}</h3>
                      <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">Ref: NX-STRAT-{Math.floor(Math.random() * 1000)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={downloadPDF}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Télécharger en PDF"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                 </div>
                 
                 <div className="p-8 space-y-8">
                   <div>
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('ai.assessment')}</h4>
                     <p className="text-gray-700 leading-relaxed border-l-4 border-accent-500 pl-4 py-1">
                       {result.assessment}
                     </p>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('ai.recommendations')}</h4>
                        <ul className="space-y-3">
                          {result.strategicRecommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                              <Check size={16} className="text-accent-600 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{t('ai.impact')}</h4>
                        <div className="bg-corporate-50 p-4 rounded-lg border border-gray-100">
                          <p className="text-sm text-corporate-800 leading-relaxed italic">
                            "{result.businessImpact}"
                          </p>
                        </div>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-xs font-bold text-accent-600 uppercase tracking-widest mb-3">{t('ai.next_steps')}</h4>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">
                        {result.nextSteps}
                      </p>
                   </div>
                 </div>
                 
                 <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
                   <p className="text-gray-500 text-[10px] mb-4 uppercase tracking-widest opacity-60">
                    {t('ai.disclaimer')}
                  </p>
                   <button 
                    onClick={handleTransferToContact}
                    className="text-corporate-900 font-bold hover:text-accent-600 transition-colors text-sm underline underline-offset-4 flex items-center justify-center gap-2 mx-auto"
                   >
                     <Send size={14} />
                     {t('ai.transfer')}
                   </button>
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIProjectScope;