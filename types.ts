import React from 'react';

export type AppId = 
  | 'about' 
  | 'projects' 
  | 'skills' 
  | 'terminal' 
  | 'education' 
  | 'game' 
  | 'shooter'
  | 'ai-assistant' 
  | 'mail' 
  | 'settings' 
  | 'koratuwa' 
  | 'fotnews' 
  | 'n8n' 
  | 'phone';

export interface AppConfig {
  id: AppId;
  title: string;
  icon: any; // Lucide Icon component
  component: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
}

export interface WindowState {
  id: AppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized?: boolean;
  zIndex: number;
  position?: { x: number; y: number };
}

export type ProjectCategory = 'Web Development' | 'Mobile Applications' | 'AI & Automation';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  tech: string;
  description: string;
  features?: string[];
  githubUrl?: string;
  image: string;
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}