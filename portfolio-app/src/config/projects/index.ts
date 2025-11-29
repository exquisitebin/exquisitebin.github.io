import mlvetData from './mlvet.json';

export interface ProjectLinks {
  live?: string;
  repository?: string;
  demo?: string;
  documentation?: string;
}

export interface ProjectMetadata {
  status: 'active' | 'completed' | 'archived' | 'in-progress';
  startDate: string; // YYYY-MM format
  endDate: string | null; // YYYY-MM format or null
  featured: boolean;
  displayOrder: number;
}

export interface ProjectTechnologies {
  languages: string[];
  frameworks: string[];
  databases: string[];
  tools: string[];
  operatingSystems: string[];
  platforms: string[];
  versionControl: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface ProjectTechnicalDetails {
  architecture?: string;
  mlModels?: string;
  performance?: string;
  [key: string]: string | undefined;
}

export interface ProjectDetailedContent {
  overview?: string;
  features?: ProjectFeature[];
  challenges?: string[];
  outcomes?: string[];
  technicalDetails?: ProjectTechnicalDetails;
}

export interface ProjectTeam {
  size: number;
  role: string;
  responsibilities: string[];
}

export interface ProjectConfig {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  links: ProjectLinks;
  images: string[];
  metadata: ProjectMetadata;
  technologies: ProjectTechnologies;
  skills: string[];
  highlights: string[];
  detailedContent?: ProjectDetailedContent;
  team?: ProjectTeam;
}

// Load all projects
const projectConfigs: ProjectConfig[] = [
  mlvetData as ProjectConfig,
  // Add more projects here as you create them
];

// Helper functions for filtering and sorting
export const getAllProjects = (): ProjectConfig[] => {
  return [...projectConfigs].sort((a, b) => a.metadata.displayOrder - b.metadata.displayOrder);
};

export const getFeaturedProjects = (): ProjectConfig[] => {
  return projectConfigs.filter(p => p.metadata.featured);
};

export const getProjectById = (id: string): ProjectConfig | undefined => {
  return projectConfigs.find(p => p.id === id);
};

export const getProjectsByTechnology = (tech: string): ProjectConfig[] => {
  return projectConfigs.filter(p => 
    Object.values(p.technologies).flat().includes(tech)
  );
};

export const getProjectsByStatus = (status: ProjectMetadata['status']): ProjectConfig[] => {
  return projectConfigs.filter(p => p.metadata.status === status);
};

export default projectConfigs;
