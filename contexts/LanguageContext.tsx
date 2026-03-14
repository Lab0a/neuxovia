import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Nav
    'nav.expertise': 'Expertise',
    'nav.method': 'Méthode',
    'nav.faq': 'FAQ',
    'nav.ai_simulator': 'Simulateur IA',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Audit & Conseil en Intelligence Artificielle',
    'hero.title1': 'Transformez votre entreprise',
    'hero.title2': 'avec l\'IA.',
    'hero.subtitle': 'Neuxovia audite votre existant et conçoit des solutions d\'Intelligence Artificielle sur-mesure pour optimiser vos processus, réduire vos coûts et accélérer votre croissance.',
    'hero.cta1': 'Simuler mon projet IA',
    'hero.cta2': 'Nos Expertises',
    'hero.trust': 'Ils nous font confiance pour leur stratégie IA',
    
    // Services
    'services.badge': 'Audit',
    'services.badge2': 'Intégration IA',
    'services.title': 'Nos Expertises',
    'services.subtitle': 'Un accompagnement complet pour votre transformation IA.',
    'services.1.title': 'Audit de l\'Existant',
    'services.1.desc': 'Analyse approfondie de vos processus métiers, de votre infrastructure de données et de vos outils actuels pour identifier les opportunités d\'IA.',
    'services.2.title': 'Stratégie & Conseil IA',
    'services.2.desc': 'Définition d\'une feuille de route IA alignée avec vos objectifs stratégiques, calcul du ROI et sélection des cas d\'usage prioritaires.',
    'services.3.title': 'Pilotage & Intégration',
    'services.3.desc': 'Sélection et déploiement des meilleures solutions du marché (LLM, agents, automatisation) pour une intégration fluide dans votre écosystème.',
    'services.4.title': 'Optimisation des Processus',
    'services.4.desc': 'Automatisation intelligente des tâches répétitives pour libérer du temps à vos équipes et augmenter la productivité globale.',
    'services.5.title': 'Data & Business Intelligence',
    'services.5.desc': 'Exploitation avancée de vos données pour la prédiction, la recommandation et l\'aide à la décision stratégique.',
    'services.6.title': 'IA Sécurisée & Éthique',
    'services.6.desc': 'Déploiement de solutions d\'IA respectueuses de la confidentialité de vos données (RGPD) et transparentes dans leurs décisions.',

    // Methodology
    'method.badge': 'Notre Approche',
    'method.title1': 'Une méthodologie rigoureuse',
    'method.title2': 'pour des résultats concrets.',
    'method.subtitle': 'Parce que chaque entreprise est unique, nous avons développé un cadre d\'intervention structuré qui garantit la pertinence technique et la viabilité économique de vos projets IA.',
    'method.1.title': 'Audit & Diagnostic',
    'method.1.desc': 'Nous analysons vos processus métiers, vos flux de données et vos infrastructures existantes pour identifier les opportunités d\'optimisation par l\'IA.',
    'method.1.d1': 'Analyse de la qualité des données',
    'method.1.d2': 'Audit des processus manuels',
    'method.1.d3': 'Identification des gisements de valeur',
    'method.2.title': 'Stratégie & Cadrage',
    'method.2.desc': 'Nous définissons une feuille de route pragmatique, sélectionnons les technologies adaptées et évaluons le ROI potentiel de chaque initiative.',
    'method.2.d1': 'Sélection des modèles (LLM, ML)',
    'method.2.d2': 'Business Case & ROI',
    'method.2.d3': 'Design de l\'architecture cible',
    'method.3.title': 'Accompagnement',
    'method.3.desc': 'Nous vous accompagnons dans le déploiement opérationnel et la conduite du changement pour garantir une adoption réussie par vos équipes.',
    'method.3.d1': 'Pilotage de l\'implémentation',
    'method.3.d2': 'Formation des utilisateurs',
    'method.3.d3': 'Suivi de la performance',

    // AI Tool
    'ai.badge': 'Diagnostic & Opportunités',
    'ai.title': 'Évaluez votre potentiel IA',
    'ai.subtitle': 'Décrivez votre problématique métier. Notre IA analyse votre situation et vous propose un premier diagnostic stratégique personnalisé.',
    'ai.label': 'Votre problématique',
    'ai.placeholder': 'Ex: Nous passons trop de temps à trier manuellement les milliers d\'emails reçus chaque jour par notre service client...',
    'ai.button_loading': 'Analyse stratégique...',
    'ai.button': 'Lancer le diagnostic',
    'ai.why_title': 'Approche Stratégique',
    'ai.why_desc': 'Ce diagnostic identifie les leviers de valeur et les prochaines étapes clés pour transformer votre problématique en avantage compétitif.',
    'ai.empty_state': 'Votre diagnostic s\'affichera ici',
    'ai.loading_state': 'Analyse de votre problématique...',
    'ai.result_title': 'Diagnostic Stratégique',
    'ai.maturity': 'Maturité',
    'ai.assessment': 'Analyse de la situation',
    'ai.recommendations': 'Recommandations',
    'ai.impact': 'Impact Business',
    'ai.next_steps': 'Prochaines étapes',
    'ai.disclaimer': 'Ce diagnostic est une première évaluation stratégique générée par IA.',
    'ai.transfer': 'Discuter de ce diagnostic avec un expert Neuxovia',

    // Why Us
    'why.badge': 'Pourquoi Neuxovia ?',
    'why.title1': 'L\'excellence au service',
    'why.title2': 'de votre transformation.',
    'why.subtitle': 'Plus qu\'un cabinet de conseil, nous sommes votre partenaire stratégique pour naviguer dans l\'ère de l\'Intelligence Artificielle avec confiance et clarté.',
    'why.tag1': 'Expertise IA',
    'why.tag2': 'Audit Stratégique',
    'why.tag3': 'Innovation',
    'why.1.title': 'Confidentialité & Sécurité',
    'why.1.desc': 'Nous traitons vos données avec le plus haut niveau de sécurité. Vos informations stratégiques restent votre propriété exclusive.',
    'why.2.title': 'Pragmatisme Opérationnel',
    'why.2.desc': 'Nous ne recommandons que des solutions dont le ROI est démontrable et dont l\'intégration est techniquement viable.',
    'why.3.title': 'Accompagnement Humain',
    'why.3.desc': 'L\'IA n\'est rien sans l\'humain. Nous plaçons vos collaborateurs au centre de la transformation pour garantir l\'adoption.',
    'why.4.title': 'Excellence Technique',
    'why.4.desc': 'Nos experts maîtrisent les dernières avancées en IA générative et Machine Learning pour vous offrir le meilleur de la technologie.',

    // FAQ
    'faq.badge': 'Questions Fréquentes',
    'faq.title': 'Des réponses claires à vos interrogations.',
    'faq.1.q': 'Comment garantissez-vous la sécurité de nos données ?',
    'faq.1.a': 'La sécurité est notre priorité absolue. Nous privilégions des architectures \'Private Cloud\' ou des instances dédiées de LLM où vos données ne sont jamais utilisées pour l\'entraînement de modèles publics. Nous signons systématiquement des accords de confidentialité (NDA) stricts.',
    'faq.2.q': 'Quel est le délai moyen pour voir un premier ROI ?',
    'faq.2.a': 'Grâce à notre approche par \'Quick Wins\', nous visons des résultats tangibles en 4 à 8 semaines. L\'automatisation de processus répétitifs offre généralement un retour sur investissement immédiat en termes de gain de temps et de réduction d\'erreurs.',
    'faq.3.q': 'Est-ce que l\'IA va remplacer mes collaborateurs ?',
    'faq.3.a': 'Notre vision est celle de l\'IA augmentée. L\'objectif est de libérer vos équipes des tâches à faible valeur ajoutée pour qu\'elles se concentrent sur leur expertise métier. Nous accompagnons ce changement par de la formation pour que l\'IA devienne un allié, pas une menace.',
    'faq.4.q': 'Proposez-vous des solutions clé en main ou du conseil pur ?',
    'faq.4.a': 'Nous proposons les deux. Nous pouvons intervenir en amont pour l\'audit et la stratégie (conseil), mais aussi piloter l\'intégration technique et le déploiement opérationnel des solutions identifiées.',

    // Contact
    'contact.title': 'Débutons la conversation.',
    'contact.subtitle': 'Pour un audit de votre existant ou une consultation stratégique sur l\'intégration de l\'IA, nos experts sont à votre écoute.',
    'contact.hq': 'Siège Social',
    'contact.direct': 'Contact Direct',
    'contact.email_label': 'Email',
    'contact.success.title': 'Message envoyé !',
    'contact.success.desc': 'Merci de nous avoir contactés. Nos experts reviendront vers vous sous 24h ouvrées.',
    'contact.success.btn': 'Envoyer un autre message',
    'contact.form.fn': 'Prénom',
    'contact.form.ln': 'Nom',
    'contact.form.email': 'Email Professionnel',
    'contact.form.phone': 'Téléphone (Optionnel)',
    'contact.form.company': 'Société (Optionnel)',
    'contact.form.message': 'Message',
    'contact.form.pdf': 'Note de cadrage jointe',
    'contact.form.submit': 'Envoyer la demande',
    'contact.form.loading': 'Envoi en cours...',

    // Footer
    'footer.desc': 'Cabinet de conseil spécialisé dans l\'audit et l\'intégration stratégique de l\'Intelligence Artificielle pour les entreprises.',
    'footer.nav': 'Navigation',
    'footer.home': 'Accueil',
    'footer.legal': 'Légal',
    'footer.legal.mentions': 'Mentions Légales',
    'footer.legal.privacy': 'Confidentialité',
    'footer.legal.careers': 'Carrières',
    'footer.rights': 'Tous droits réservés.',

    // Legal
    'legal.title': 'Mentions Légales',
    'legal.publisher.title': 'Éditeur du site',
    'legal.publisher.content': 'Neuxovia, société en cours de création.<br/>Capital social : 300 €<br/>Siège social : 18 rue Georges Aimé, 57000 Metz, France<br/>Immatriculation : En cours d\'immatriculation au RCS de Metz<br/>Directeur de la publication : Baptiste Riva',
    'legal.contact.title': 'Contact',
    'legal.contact.content': 'Email : baptiste@neuxovia.com',
    'legal.host.title': 'Hébergement',
    'legal.host.content': 'Ce site est hébergé sur un serveur dédié par la société OneProvider.',
    'legal.ip.title': 'Propriété Intellectuelle',
    'legal.ip.content': 'L\'ensemble de ce site relève de la législation française et internationale sur le droit d\'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques. La reproduction de tout ou partie de ce site sur un support électronique quel qu\'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.',
    'legal.liability.title': 'Limitation de Responsabilité',
    'legal.liability.content': 'Neuxovia s\'efforce d\'assurer au mieux de ses possibilités l\'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Neuxovia décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site. Les résultats fournis par le simulateur IA sont donnés à titre indicatif et ne sauraient engager la responsabilité de Neuxovia.',
    'legal.jurisdiction.title': 'Droit Applicable et Juridiction',
    'legal.jurisdiction.content': 'Tout litige en relation avec l\'utilisation du site est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Metz.',

    // Privacy
    'privacy.title': 'Politique de Confidentialité',
    'privacy.intro': 'La protection de vos données personnelles est une priorité absolue pour Neuxovia. En tant que cabinet de conseil en Intelligence Artificielle, nous appliquons à nous-mêmes les standards de sécurité et de confidentialité les plus stricts que nous recommandons à nos clients. Cette politique détaille de manière transparente la façon dont nous traitons vos informations conformément au Règlement Général sur la Protection des Données (RGPD).',
    'privacy.controller.title': '1. Responsable du traitement',
    'privacy.controller.content': 'Le responsable du traitement des données personnelles collectées sur ce site est Baptiste Riva, agissant pour le compte de Neuxovia (société en cours de création), domiciliée au 18 rue Georges Aimé, 57000 Metz.',
    'privacy.data.title': '2. Données collectées',
    'privacy.data.content': 'Nous veillons à ne collecter que les données strictement nécessaires (principe de minimisation). Cela inclut :<br/><br/>• <strong>Données d\'identification</strong> : Nom, prénom, adresse email professionnelle, numéro de téléphone, nom de l\'entreprise.<br/>• <strong>Données de contenu</strong> : Messages envoyés via le formulaire de contact, descriptions de problématiques soumises au simulateur IA, documents joints (ex: notes de cadrage).<br/>• <strong>Données techniques</strong> : Adresse IP, logs de connexion, type de navigateur (exclusivement à des fins de sécurité et de débogage).',
    'privacy.basis.title': '3. Base légale et finalités du traitement',
    'privacy.basis.content': 'Les traitements de données reposent sur les bases légales suivantes :<br/><br/>• <strong>Votre consentement</strong> : pour le traitement de vos demandes de contact et l\'utilisation du simulateur IA.<br/>• <strong>L\'exécution de mesures précontractuelles</strong> : pour l\'élaboration de devis, d\'audits ou de recommandations suite à votre demande.<br/>• <strong>Notre intérêt légitime</strong> : pour assurer la sécurité du site web, prévenir les fraudes et améliorer nos services techniques.',
    'privacy.retention.title': '4. Durée de conservation',
    'privacy.retention.content': 'Vos données sont conservées uniquement pour la durée nécessaire aux finalités pour lesquelles elles ont été collectées :<br/><br/>• <strong>Données des prospects</strong> : 3 ans à compter du dernier contact émanant du prospect.<br/>• <strong>Données issues du simulateur IA</strong> : supprimées immédiatement après la génération du rapport ou conservées maximum 30 jours à des fins d\'amélioration technique (sans identification personnelle).<br/>• <strong>Logs de sécurité</strong> : 6 mois maximum.',
    'privacy.sharing.title': '5. Partage et sous-traitance',
    'privacy.sharing.content': 'Vos données sont strictement confidentielles et ne sont <strong>jamais vendues à des tiers</strong>. Elles peuvent être partagées avec nos sous-traitants techniques dans le strict cadre de leurs missions :<br/><br/>• <strong>Google Cloud / Gemini API</strong> : pour la génération des diagnostics IA. Les données transitent de manière chiffrée et Google s\'engage contractuellement à ne pas les utiliser pour entraîner ses modèles publics.<br/>• <strong>OneProvider</strong> : pour l\'hébergement sécurisé du site web.',
    'privacy.security.title': '6. Sécurité des données',
    'privacy.security.content': 'Neuxovia met en œuvre des mesures techniques et organisationnelles robustes pour protéger vos données personnelles contre l\'altération, la perte accidentelle ou l\'accès non autorisé. Cela inclut le chiffrement des communications (HTTPS/TLS), la sécurisation des serveurs, et des accès restreints aux seules personnes habilitées.',
    'privacy.rights.title': '7. Vos droits (RGPD)',
    'privacy.rights.content': 'Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants : droit d\'accès, de rectification, d\'effacement (droit à l\'oubli), de limitation du traitement, de portabilité de vos données, et droit d\'opposition.<br/><br/>Pour exercer ces droits, contactez-nous directement à : <strong>baptiste@neuxovia.com</strong>.<br/><br/>Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la Commission Nationale de l\'Informatique et des Libertés (CNIL - www.cnil.fr).',
    'privacy.cookies.title': '8. Politique des Cookies',
    'privacy.cookies.content': 'Un "cookie" est un petit fichier texte déposé sur votre terminal. Ce site utilise <strong>uniquement des cookies techniques strictement nécessaires</strong> à son fonctionnement (par exemple, pour mémoriser votre préférence de langue). Ces cookies sont exemptés de recueil de consentement préalable. Nous n\'utilisons aucun cookie de traçage publicitaire ou d\'analyse comportementale intrusif.',
  },
  en: {
    // Nav
    'nav.expertise': 'Expertise',
    'nav.method': 'Methodology',
    'nav.faq': 'FAQ',
    'nav.ai_simulator': 'AI Simulator',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': 'Artificial Intelligence Audit & Consulting',
    'hero.title1': 'Transform your business',
    'hero.title2': 'with AI.',
    'hero.subtitle': 'Neuxovia audits your existing infrastructure and designs tailor-made Artificial Intelligence solutions to optimize your processes, reduce costs, and accelerate growth.',
    'hero.cta1': 'Simulate my AI project',
    'hero.cta2': 'Our Expertise',
    'hero.trust': 'They trust us for their AI strategy',
    
    // Services
    'services.badge': 'Audit',
    'services.badge2': 'AI Integration',
    'services.title': 'Our Expertise',
    'services.subtitle': 'Comprehensive support for your AI transformation.',
    'services.1.title': 'Existing Infrastructure Audit',
    'services.1.desc': 'In-depth analysis of your business processes, data infrastructure, and current tools to identify AI opportunities.',
    'services.2.title': 'AI Strategy & Consulting',
    'services.2.desc': 'Definition of an AI roadmap aligned with your strategic objectives, ROI calculation, and selection of priority use cases.',
    'services.3.title': 'Management & Integration',
    'services.3.desc': 'Selection and deployment of the best market solutions (LLMs, agents, automation) for seamless integration into your ecosystem.',
    'services.4.title': 'Process Optimization',
    'services.4.desc': 'Intelligent automation of repetitive tasks to free up your teams\' time and increase overall productivity.',
    'services.5.title': 'Data & Business Intelligence',
    'services.5.desc': 'Advanced exploitation of your data for prediction, recommendation, and strategic decision support.',
    'services.6.title': 'Secure & Ethical AI',
    'services.6.desc': 'Deployment of AI solutions that respect data privacy (GDPR) and provide transparent decision-making.',

    // Methodology
    'method.badge': 'Our Approach',
    'method.title1': 'A rigorous methodology',
    'method.title2': 'for concrete results.',
    'method.subtitle': 'Because every company is unique, we have developed a structured intervention framework that guarantees the technical relevance and economic viability of your AI projects.',
    'method.1.title': 'Audit & Diagnostics',
    'method.1.desc': 'We analyze your business processes, data flows, and existing infrastructures to identify optimization opportunities through AI.',
    'method.1.d1': 'Data quality analysis',
    'method.1.d2': 'Audit of manual processes',
    'method.1.d3': 'Identification of value pools',
    'method.2.title': 'Strategy & Scoping',
    'method.2.desc': 'We define a pragmatic roadmap, select the appropriate technologies, and evaluate the potential ROI of each initiative.',
    'method.2.d1': 'Model selection (LLM, ML)',
    'method.2.d2': 'Business Case & ROI',
    'method.2.d3': 'Target architecture design',
    'method.3.title': 'Support & Change Management',
    'method.3.desc': 'We support you in operational deployment and change management to ensure successful adoption by your teams.',
    'method.3.d1': 'Implementation management',
    'method.3.d2': 'User training',
    'method.3.d3': 'Performance monitoring',

    // AI Tool
    'ai.badge': 'Assessment & Opportunities',
    'ai.title': 'Evaluate your AI potential',
    'ai.subtitle': 'Describe your business challenge. Our AI analyzes your situation and provides a personalized strategic assessment.',
    'ai.label': 'Your business challenge',
    'ai.placeholder': 'Ex: We spend too much time manually sorting thousands of emails received daily by our customer service...',
    'ai.button_loading': 'Strategic analysis...',
    'ai.button': 'Run assessment',
    'ai.why_title': 'Strategic Approach',
    'ai.why_desc': 'This assessment identifies value drivers and key next steps to turn your challenge into a competitive advantage.',
    'ai.empty_state': 'Your assessment will appear here',
    'ai.loading_state': 'Analyzing your challenge...',
    'ai.result_title': 'Strategic Assessment',
    'ai.maturity': 'Maturity',
    'ai.assessment': 'Situation Analysis',
    'ai.recommendations': 'Strategic Recommendations',
    'ai.impact': 'Expected Business Impact',
    'ai.next_steps': 'Recommended Next Steps',
    'ai.disclaimer': 'This assessment is an initial strategic evaluation generated by AI.',
    'ai.transfer': 'Discuss this assessment with a Neuxovia expert',

    // Why Us
    'why.badge': 'Why Neuxovia?',
    'why.title1': 'Excellence serving',
    'why.title2': 'your transformation.',
    'why.subtitle': 'More than a consulting firm, we are your strategic partner to navigate the Artificial Intelligence era with confidence and clarity.',
    'why.tag1': 'AI Expertise',
    'why.tag2': 'Strategic Audit',
    'why.tag3': 'Innovation',
    'why.1.title': 'Confidentiality & Security',
    'why.1.desc': 'We handle your data with the highest level of security. Your strategic information remains your exclusive property.',
    'why.2.title': 'Operational Pragmatism',
    'why.2.desc': 'We only recommend solutions with demonstrable ROI and technically viable integration.',
    'why.3.title': 'Human-Centric Support',
    'why.3.desc': 'AI is nothing without humans. We place your employees at the center of the transformation to ensure adoption.',
    'why.4.title': 'Technical Excellence',
    'why.4.desc': 'Our experts master the latest advances in Generative AI and Machine Learning to offer you the best of technology.',

    // FAQ
    'faq.badge': 'Frequently Asked Questions',
    'faq.title': 'Clear answers to your questions.',
    'faq.1.q': 'How do you guarantee the security of our data?',
    'faq.1.a': 'Security is our absolute priority. We favor \'Private Cloud\' architectures or dedicated LLM instances where your data is never used to train public models. We systematically sign strict Non-Disclosure Agreements (NDAs).',
    'faq.2.q': 'What is the average timeframe to see an initial ROI?',
    'faq.2.a': 'Through our \'Quick Wins\' approach, we aim for tangible results in 4 to 8 weeks. Automating repetitive processes generally offers an immediate return on investment in terms of time savings and error reduction.',
    'faq.3.q': 'Will AI replace my employees?',
    'faq.3.a': 'Our vision is that of augmented AI. The goal is to free your teams from low value-added tasks so they can focus on their core expertise. We support this change through training so that AI becomes an ally, not a threat.',
    'faq.4.q': 'Do you offer turnkey solutions or pure consulting?',
    'faq.4.a': 'We offer both. We can intervene upstream for audit and strategy (consulting), but also manage the technical integration and operational deployment of the identified solutions.',

    // Contact
    'contact.title': 'Let\'s start the conversation.',
    'contact.subtitle': 'For an audit of your existing infrastructure or a strategic consultation on AI integration, our experts are at your disposal.',
    'contact.hq': 'Headquarters',
    'contact.direct': 'Direct Contact',
    'contact.email_label': 'Email',
    'contact.success.title': 'Message sent!',
    'contact.success.desc': 'Thank you for contacting us. Our experts will get back to you within 24 business hours.',
    'contact.success.btn': 'Send another message',
    'contact.form.fn': 'First Name',
    'contact.form.ln': 'Last Name',
    'contact.form.email': 'Professional Email',
    'contact.form.phone': 'Phone (Optional)',
    'contact.form.company': 'Company (Optional)',
    'contact.form.message': 'Message',
    'contact.form.pdf': 'Attached scoping note',
    'contact.form.submit': 'Send Request',
    'contact.form.loading': 'Sending...',

    // Footer
    'footer.desc': 'Consulting firm specialized in the audit and strategic integration of Artificial Intelligence for businesses.',
    'footer.nav': 'Navigation',
    'footer.home': 'Home',
    'footer.legal': 'Legal',
    'footer.legal.mentions': 'Legal Notice',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.careers': 'Careers',
    'footer.rights': 'All rights reserved.',

    // Legal
    'legal.title': 'Legal Notice',
    'legal.publisher.title': 'Website Publisher',
    'legal.publisher.content': 'Neuxovia, company in formation.<br/>Share capital: €300<br/>Registered office: 18 rue Georges Aimé, 57000 Metz, France<br/>Registration: Pending registration with the Metz Trade and Companies Register (RCS)<br/>Director of Publication: Baptiste Riva',
    'legal.contact.title': 'Contact',
    'legal.contact.content': 'Email: baptiste@neuxovia.com',
    'legal.host.title': 'Hosting',
    'legal.host.content': 'This website is hosted on a dedicated server by OneProvider.',
    'legal.ip.title': 'Intellectual Property',
    'legal.ip.content': 'The entire content of this site is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations. The reproduction of all or part of this site on any electronic medium whatsoever is strictly prohibited without the express permission of the publication director.',
    'legal.liability.title': 'Limitation of Liability',
    'legal.liability.content': 'Neuxovia strives to ensure the accuracy and updating of the information published on this site to the best of its ability. However, Neuxovia declines all responsibility for any imprecision, inaccuracy, or omission relating to information available on the site. The results provided by the AI simulator are given for informational purposes only and do not engage Neuxovia\'s liability.',
    'legal.jurisdiction.title': 'Applicable Law and Jurisdiction',
    'legal.jurisdiction.content': 'Any dispute relating to the use of the site is subject to French law. Exclusive jurisdiction is granted to the competent courts of Metz.',

    // Privacy
    'privacy.title': 'Privacy Policy',
    'privacy.intro': 'Protecting your personal data is an absolute priority for Neuxovia. As an Artificial Intelligence consulting firm, we apply the same strict security and confidentiality standards to ourselves that we recommend to our clients. This policy transparently details how we process your information in accordance with the General Data Protection Regulation (GDPR).',
    'privacy.controller.title': '1. Data Controller',
    'privacy.controller.content': 'The controller of personal data collected on this site is Baptiste Riva, acting on behalf of Neuxovia (company in formation), located at 18 rue Georges Aimé, 57000 Metz, France.',
    'privacy.data.title': '2. Data Collected',
    'privacy.data.content': 'We ensure that we only collect strictly necessary data (data minimization principle). This includes:<br/><br/>• <strong>Identification data</strong>: First name, last name, professional email address, phone number, company name.<br/>• <strong>Content data</strong>: Messages sent via the contact form, descriptions of challenges submitted to the AI simulator, attached documents (e.g., scoping notes).<br/>• <strong>Technical data</strong>: IP address, connection logs, browser type (exclusively for security and debugging purposes).',
    'privacy.basis.title': '3. Legal Basis and Purposes of Processing',
    'privacy.basis.content': 'Data processing is based on the following legal grounds:<br/><br/>• <strong>Your consent</strong>: for processing your contact requests and using the AI simulator.<br/>• <strong>Execution of pre-contractual measures</strong>: for preparing quotes, audits, or recommendations following your request.<br/>• <strong>Our legitimate interest</strong>: to ensure website security, prevent fraud, and improve our technical services.',
    'privacy.retention.title': '4. Data Retention Period',
    'privacy.retention.content': 'Your data is kept only for the time necessary for the purposes for which it was collected:<br/><br/>• <strong>Prospect data</strong>: 3 years from the last contact originating from the prospect.<br/>• <strong>AI simulator data</strong>: deleted immediately after report generation or kept for a maximum of 30 days for technical improvement purposes (without personal identification).<br/>• <strong>Security logs</strong>: maximum 6 months.',
    'privacy.sharing.title': '5. Sharing and Subcontracting',
    'privacy.sharing.content': 'Your data is strictly confidential and is <strong>never sold to third parties</strong>. It may be shared with our technical subcontractors strictly within the scope of their missions:<br/><br/>• <strong>Google Cloud / Gemini API</strong>: for generating AI assessments. Data is transmitted securely (encrypted) and Google contractually commits not to use it to train its public models.<br/>• <strong>OneProvider</strong>: for secure website hosting.',
    'privacy.security.title': '6. Data Security',
    'privacy.security.content': 'Neuxovia implements robust technical and organizational measures to protect your personal data against alteration, accidental loss, or unauthorized access. This includes communication encryption (HTTPS/TLS), server security, and restricted access to authorized personnel only.',
    'privacy.rights.title': '7. Your Rights (GDPR)',
    'privacy.rights.content': 'In accordance with the GDPR and the French Data Protection Act, you have the following rights: right of access, rectification, erasure (right to be forgotten), restriction of processing, data portability, and right to object.<br/><br/>To exercise these rights, contact us directly at: <strong>baptiste@neuxovia.com</strong>.<br/><br/>If you believe, after contacting us, that your rights are not respected, you can submit a complaint to the French Data Protection Authority (CNIL - www.cnil.fr).',
    'privacy.cookies.title': '8. Cookie Policy',
    'privacy.cookies.content': 'A "cookie" is a small text file placed on your device. This site uses <strong>only technical cookies strictly necessary</strong> for its operation (e.g., to remember your language preference). These cookies are exempt from prior consent collection. We do not use any advertising tracking or intrusive behavioral analysis cookies.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('fr');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check local storage first
    const savedLang = localStorage.getItem('neuxovia_lang') as Language;
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      setLanguageState(savedLang);
      setIsInitialized(true);
      return;
    }

    // Browser language detection
    // France -> fr
    // Luxembourg (fr-LU, de-LU, lb-LU) -> en
    // Rest of the world -> en
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    let defaultLang: Language = 'en';
    
    if (browserLang) {
      const lowerLang = browserLang.toLowerCase();
      // If exactly fr-FR or just fr (assuming France if not specified)
      if (lowerLang === 'fr-fr' || lowerLang === 'fr') {
        defaultLang = 'fr';
      } 
      // If it's Luxembourg (fr-lu, de-lu, lb-lu), it falls through to 'en'
      // All other languages fall through to 'en'
    }

    setLanguageState(defaultLang);
    setIsInitialized(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('neuxovia_lang', lang);
  };

  const t = (key: string): string => {
    // Simple flat key lookup for now
    if (translations[language][key as keyof typeof translations['fr']]) {
      return translations[language][key as keyof typeof translations['fr']];
    }
    
    return key; // Fallback to key if translation missing
  };

  if (!isInitialized) return null; // Prevent hydration mismatch

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
