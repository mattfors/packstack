import { Component, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import PouchDB from 'pouchdb';

@Component({
  selector: 'app-pouch-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>PouchDB Demo</h1>
      <p *ngIf="error()">{{ error() }}</p>
      <p *ngIf="message()">Message: {{ message() }}</p>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 1.5rem;
      color: #333;
    }
    p {
      font-size: 1rem;
      color: #555;
    }
  `]
})
export class PouchDemoComponent {
  private db = new PouchDB('hello-world-db');
  message: WritableSignal<string | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  constructor() {
    this.initDB();
  }

  private async initDB() {
    try {
      const doc = await this.db.get('test').catch(async (err: any) => {
        if (err.status === 404) {
          const newDoc = { _id: 'test', message: 'Hello, PouchDB!' };
          await this.db.put(newDoc);
          return newDoc;
        }
        throw err;
      }) as { _id: string; message: string }; // Explicitly cast `doc` type

      this.message.set(doc.message); // Use `set` instead of `update`
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.error.set(`Error: ${err.message}`); // Use `set` instead of `update`
      }
    }
  }
}
