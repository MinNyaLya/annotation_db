import Database from 'better-sqlite3';
import { Annotation } from '../types';

class DatabaseService {
  private db: Database.Database;

  constructor() {
    this.db = new Database('annotations.db');
    this.init();
  }

  private init() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS annotations (
        id TEXT PRIMARY KEY,
        event TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        impact TEXT NOT NULL,
        description TEXT,
        financialImpact REAL NOT NULL,
        createdBy TEXT NOT NULL,
        responsibleTeam TEXT NOT NULL,
        jiraTicket TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  getAllAnnotations(): Annotation[] {
    return this.db.prepare('SELECT * FROM annotations ORDER BY createdAt DESC').all() as Annotation[];
  }

  addAnnotation(annotation: Annotation): void {
    const stmt = this.db.prepare(`
      INSERT INTO annotations (
        id, event, startDate, endDate, impact, description,
        financialImpact, createdBy, responsibleTeam, jiraTicket
      ) VALUES (
        @id, @event, @startDate, @endDate, @impact, @description,
        @financialImpact, @createdBy, @responsibleTeam, @jiraTicket
      )
    `);
    stmt.run(annotation);
  }

  deleteAnnotation(id: string): void {
    const stmt = this.db.prepare('DELETE FROM annotations WHERE id = ?');
    stmt.run(id);
  }
}

export const db = new DatabaseService();