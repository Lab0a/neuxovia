import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

const jobs = [
  {
    title: "Data Scientist Senior",
    location: "Paris / Hybride",
    type: "CDI",
    description: "Vous concevez et entraînez des modèles de Machine Learning complexes pour nos clients grands comptes."
  },
  {
    title: "Ingénieur IA / NLP",
    location: "Lyon",
    type: "CDI",
    description: "Expert en traitement du langage naturel, vous développez des solutions basées sur les LLMs (RAG, Fine-tuning)."
  },
  {
    title: "Consultant Stratégie IA",
    location: "Paris",
    type: "CDI",
    description: "Vous auditez les processus de nos clients et définissez leur feuille de route de transformation par l'IA."
  },
  {
    title: "Data Engineer",
    location: "Remote / Client",
    type: "Freelance / CDI",
    description: "Vous concevez des pipelines de données robustes et scalables pour alimenter les modèles d'IA."
  }
];

const Careers: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <span className="text-accent-600 font-semibold tracking-wider uppercase text-sm mb-3 block">Carrières</span>
          <h1 className="text-4xl md:text-6xl font-serif text-corporate-900 mb-8">Rejoignez l'élite de l'IA.</h1>
          <p className="text-xl text-gray-600 font-light">
            Chez Neuxovia, nous réalisons les projets d'Intelligence Artificielle les plus ambitieux du marché. Développez votre potentiel au sein de nos équipes d'experts.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white border border-gray-200 p-8 hover:border-corporate-900 transition-colors group cursor-pointer shadow-sm hover:shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h3 className="text-2xl font-bold text-corporate-900 mb-2">{job.title}</h3>
                   <div className="flex items-center gap-4 text-sm text-gray-500">
                     <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
                     <span className="flex items-center gap-1"><Clock size={14}/> {job.type}</span>
                   </div>
                </div>
                <span className="w-10 h-10 rounded-full bg-corporate-50 flex items-center justify-center text-corporate-900 group-hover:bg-corporate-900 group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </span>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                {job.description}
              </p>
              <div className="flex items-center gap-2 text-accent-600 font-semibold text-sm uppercase tracking-wide group-hover:underline underline-offset-4">
                Postuler maintenant
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center bg-corporate-900 text-white p-12 rounded-sm max-w-4xl mx-auto">
          <h3 className="text-2xl font-serif mb-4">Candidature Spontanée</h3>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Vous êtes développeur, architecte ou consultant fonctionnel ? Nous recrutons en permanence.
          </p>
          <button className="bg-white text-corporate-900 px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-gray-100 transition-colors">
            Envoyer mon CV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Careers;