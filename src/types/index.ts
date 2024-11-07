export type Impact = 'low' | 'medium' | 'high';

export interface Annotation {
  id?: string;
  event: string;
  startDate: string;
  endDate: string;
  impact: Impact;
  description?: string;
  financialImpact: number;
  createdBy: string;
  responsibleTeam: string;
  jiraTicket?: string;
  createdAt?: Date;
}

export type SortField = keyof Pick<Annotation, 
  'event' | 
  'startDate' | 
  'endDate' | 
  'impact' | 
  'financialImpact' | 
  'responsibleTeam'
>;