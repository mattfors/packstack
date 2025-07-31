import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import PouchDB from 'pouchdb';

export interface Workflow {
  _id: string;
  _rev?: string;
  id: string;
  label?: string;
  children?: Workflow[];
  type?: string;
  subtype?: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class WorkflowService {
  private db = new PouchDB<Workflow>('workflows-db');

  private workflows$ = new BehaviorSubject<Workflow[]>([]);

  constructor() {
    this.loadWorkflows();
    this.listenForChanges();
  }

  /**
   * Load all workflows from PouchDB
   */
  private async loadWorkflows(): Promise<void> {
    try {
      const result = await this.db.allDocs<Workflow>({
        include_docs: true,
        startkey: 'workflow:',
        endkey: 'workflow:\uffff'
      });
      const docs = result.rows.map(row => row.doc!).filter(Boolean);
      this.workflows$.next(docs);
    } catch (err) {
      console.error('Failed to load workflows:', err);
    }
  }

  /**
   * Listen for live updates to workflows
   */
  private listenForChanges(): void {
    this.db
      .changes({
        since: 'now',
        live: true,
        include_docs: true
      })
      .on('change', (change) => {
        if (change.id.startsWith('workflow:') && change.doc) {
          const updated = change.doc as Workflow;
          const current = this.workflows$.getValue();
          const index = current.findIndex(wf => wf._id === updated._id);

          if (index >= 0) {
            const newList = [...current];
            newList[index] = updated;
            this.workflows$.next(newList);
          } else {
            this.workflows$.next([...current, updated]);
          }
        }
      })
      .on('error', err => console.error('PouchDB changes error:', err));
  }

  /**
   * Observable of all workflows
   */
  getWorkflows(): Observable<Workflow[]> {
    return this.workflows$.asObservable();
  }

  /**
   * Get a specific workflow by ID (from the `id` field, not `_id`)
   */
  getWorkflow(id: string): Observable<Workflow | undefined> {
    return this.workflows$.pipe(
      map(list => list.find(wf => wf.id === id))
    );
  }

  /**
   * Save/update a workflow
   */
  updateWorkflow(wf: Workflow): Observable<any> {
    return new Observable(observer => {
      this.db.put(wf)
        .then(result => observer.next(result))
        .catch(err => observer.error(err))
        .finally(() => observer.complete());
    });
  }
}
