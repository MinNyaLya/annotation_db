export interface Annotation {
  id: string;
  event: string;
  startDate: string;
  endDate: string;
  impact: 'low' | 'medium' | 'high';
  description: string;
  financialImpact: number;
  createdBy: string;
  responsibleTeam: string;
  jiraTicket: string;
}

export type SortField = 'event' | 'startDate' | 'endDate' | 'impact' | 'financialImpact' | 'responsibleTeam';