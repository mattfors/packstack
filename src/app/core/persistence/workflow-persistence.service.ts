import { Injectable } from '@angular/core';
import { combineLatest, defer, forkJoin, map, Observable, of, take, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { PersistenceService } from './persistence.service';
import { Workflow } from '../model/workflow.model';
import { DocEnvelope } from '../model/doc-envelope.model';


@Injectable({ providedIn: 'root' })
export class WorkflowPersistenceService {
  private readonly prefix = 'workflow';

  constructor(private persistence: PersistenceService) {}

  /**
   * Observe a single workflow by ID (returns full envelope)
   */
  workflowEnvelope$(id: string): Observable<DocEnvelope<Workflow> | undefined> {
    return combineLatest([
      this.persistence.getDoc<Workflow>(id),
      this.persistence.changes$.pipe(startWith(null))
    ]).pipe(
      switchMap(() => this.persistence.getDoc<Workflow>(id)),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  /**
   * Observe a single workflow by ID (unwraps envelope for consumer use)
   */
  workflow$(id: string): Observable<Workflow | undefined> {
    const _id = `workflow:${id}`;
    return this.workflowEnvelope$(_id).pipe(map(env => env?.data));
  }

  /**
   * Observe all workflow documents as full envelopes
   */
  allWorkflowEnvelopes$(): Observable<DocEnvelope<Workflow>[]> {
    return this.persistence.changes$.pipe(
      startWith(null),
      switchMap(() => this.persistence.getAllByPrefix<Workflow>(this.prefix)),
      catchError(err => {
        console.error('Error loading workflow envelopes:', err);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  /**
   * Observe all workflows (unwraps envelopes)
   */
  allWorkflows$(): Observable<Workflow[]> {
    return this.allWorkflowEnvelopes$().pipe(map(envelopes => envelopes.map(env => env.data)));
  }

  /**
   * Save or update a workflow envelope
   */
  saveWorkflow(envelope: DocEnvelope<Workflow>): Observable<any> {
    return defer(() => this.persistence.putDoc(envelope));
  }

  /**
   * Delete a workflow envelope
   */
  deleteWorkflow(envelope: DocEnvelope<Workflow>): Observable<any> {
    if (!envelope._rev) {
      return throwError(() => new Error('Cannot delete workflow without _rev'));
    }
    return this.persistence.removeDoc(envelope);
  }

  /**
   * Create or update a workflow document from raw `Workflow`.
   * Will auto-derive _id and include _rev if the document exists.
   */
  installOrUpdateWorkflow(workflow: Workflow): Observable<void> {
    const _id = `workflow:${workflow.id}`;
    return this.workflowEnvelope$(_id).pipe(
      take(1), // Important: complete the inner stream
      switchMap(existing => {
        const envelope: DocEnvelope<Workflow> = {
          _id,
          _rev: existing?._rev, // Use _rev if it exists
          data: workflow
        };
        return this.saveWorkflow(envelope);
      }),
      map(() => void 0)
    );
  }

  /**
   * Bulk create or update a list of workflows.
   */
  installOrUpdateMany(workflows: Workflow[]): Observable<void[]> {
    return forkJoin(
      workflows.map(wf => this.installOrUpdateWorkflow(wf))
    );
  }

}
