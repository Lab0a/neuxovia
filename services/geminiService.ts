import { GoogleGenAI, Type } from "@google/genai";
import { ProjectScopeResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectScope = async (projectDescription: string, language: 'fr' | 'en' = 'fr'): Promise<ProjectScopeResponse> => {
  try {
    const promptFr = `Tu es le Directeur de la Stratégie IA chez Neuxovia, un cabinet de conseil d'élite en Intelligence Artificielle.
      Ton rôle est d'analyser la problématique métier d'un client et de lui fournir un premier diagnostic stratégique qui l'oriente vers une prise de contact avec nos experts.
      
      Ne sois pas trop technique. Concentre-toi sur la valeur métier et l'importance d'un accompagnement personnalisé par Neuxovia.
      
      Analyse la demande suivante : "${projectDescription}".
      
      Génère une réponse JSON structurée avec :
      1. 'assessment': Un diagnostic de la situation actuelle mettant en avant les points de friction et les opportunités manquées.
      2. 'strategicRecommendations': 3 recommandations stratégiques à haut niveau qui montrent la direction à prendre.
      3. 'businessImpact': L'impact positif majeur qu'une intervention de Neuxovia pourrait avoir sur leur business.
      4. 'nextSteps': Une conclusion qui explique pourquoi un échange avec un consultant Neuxovia est l'étape indispensable pour transformer ce diagnostic en réalité (ex: "Un audit approfondi de vos données est nécessaire pour valider ces hypothèses et définir une feuille de route précise").
      `;

    const promptEn = `You are the AI Strategy Director at Neuxovia, a top Artificial Intelligence consulting agency.
      Your job is to read a client's business problem and give them a simple action plan. This plan must make them want to talk to our human experts.
      
      IMPORTANT: You must write your answer in simple, easy-to-understand English (Globish). Do not use complex technical words. Focus on business results and why they need Neuxovia's help.
      
      Read this problem: "${projectDescription}".
      
      Generate a structured JSON response with:
      1. 'assessment': A simple summary of their current problem and what they are missing.
      2. 'strategicRecommendations': 3 simple, clear actions they should take.
      3. 'businessImpact': The big positive results Neuxovia can bring to their company (like saving time or money).
      4. 'nextSteps': A conclusion explaining why they must talk to a Neuxovia consultant right now to make this happen (example: "We need to check your data to create a clear plan").
      `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: language === 'fr' ? promptFr : promptEn,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            assessment: { type: Type.STRING },
            strategicRecommendations: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            businessImpact: { type: Type.STRING },
            nextSteps: { type: Type.STRING }
          },
          required: ["assessment", "strategicRecommendations", "businessImpact", "nextSteps"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as ProjectScopeResponse;
    }
    
    throw new Error("No AI response generated.");

  } catch (error) {
    console.error("AI Scope Error:", error);
    throw error;
  }
};