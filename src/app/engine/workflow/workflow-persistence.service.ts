import { Injectable } from '@angular/core';
import { combineLatest, defer, Observable, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { PersistenceService } from '../../core/persistence/persistence.service';
import { Workflow } from '../../core/model/workflow.model';


@Injectable({ providedIn: 'root' })
export class WorkflowPersistenceService {
  private readonly prefix = 'workflow';

  constructor(private persistence: PersistenceService) {}

  /**
   * Observe a single workflow by ID.
   */
  workflow$(id: string): Observable<Workflow | undefined> {
    return combineLatest([
      this.persistence.getDoc<Workflow>(id),
      this.persistence.changes$.pipe(startWith(null))
    ]).pipe(
      switchMap(() => this.persistence.getDoc<Workflow>(id)),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  /**
   * Observe all workflows with IDs starting with "workflow:"
   */
  allWorkflows$(): Observable<Workflow[]> {
    return this.persistence.changes$.pipe(
      startWith(null),
      switchMap(() => this.persistence.getAllByPrefix<Workflow>(this.prefix)),
      catchError(err => {
        console.error('Error loading workflows:', err);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  /**
   * Save or update a workflow
   */
  saveWorkflow(workflow: Workflow): Observable<any> {
    return defer(() => this.persistence.putDoc(workflow));
  }

  /**
   * Delete a workflow (must include _rev)
   */
  deleteWorkflow(workflow: Workflow): Observable<any> {
    if (!workflow._rev) {
      return throwError(() => new Error('Cannot delete workflow without _rev'));
    }

    // Narrowed type: TypeScript knows _rev is a string here
    const deletable = workflow as Workflow & { _rev: string };

    return this.persistence.removeDoc(deletable);
  }
}
