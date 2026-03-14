export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface ProjectScopeResponse {
  assessment: string;
  strategicRecommendations: string[];
  businessImpact: string;
  nextSteps: string;
}

export type Page = 'home' | 'legal' | 'privacy' | 'careers' | 'projects';
