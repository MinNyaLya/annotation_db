import Dexie, { Table } from 'dexie';
import { Annotation } from '../types';

export class AnnotationDatabase extends Dexie {
  annotations!: Table<Annotation>;

  constructor() {
    super('AnnotationsDB');
    this.version(1).stores({
      annotations: '++id, event, startDate, endDate, impact, financialImpact, createdBy, responsibleTeam, createdAt'
    });
  }
}

export const db = new AnnotationDatabase();