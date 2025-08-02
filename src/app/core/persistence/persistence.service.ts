import { Injectable, OnDestroy } from '@angular/core';
import { defer, from, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay, takeUntil } from 'rxjs/operators';
import PouchDB from 'pouchdb';
import { DocEnvelope } from '../model/doc-envelope.model';

@Injectable({ providedIn: 'root' })
export class PersistenceService implements OnDestroy {
  private db = new PouchDB('app-db');
  private destroy$ = new Subject<void>();

  /**
   * Live stream of all DB changes (shared)
   */
  readonly changes$: Observable<PouchDB.Core.ChangesResponseChange<{}>> = new Observable<PouchDB.Core.ChangesResponseChange<{}>>(observer => {
    const feed = this.db
      .changes({ since: 'now', live: true, include_docs: true })
      .on('change', change => observer.next(change))
      .on('error', err => observer.error(err));
    return () => feed.cancel();
  }).pipe(takeUntil(this.destroy$), shareReplay(1));

  /**
   * Get a single document envelope by ID
   */
  getDoc<T>(id: string): Observable<DocEnvelope<T> | undefined> {
    return defer(() =>
      from(this.db.get<DocEnvelope<T>>(id)).pipe(
        catchError(err => err.status === 404 ? of(undefined) : throwError(() => err))
      )
    );
  }

  /**
   * Get all document envelopes by key prefix
   */
  getAllByPrefix<T>(prefix: string): Observable<DocEnvelope<T>[]> {
    return defer(() =>
      from(this.db.allDocs<DocEnvelope<T>>({
        include_docs: true,
        startkey: `${prefix}:`,
        endkey: `${prefix}:￿`
      }))
    ).pipe(
      map(result => result.rows.map(row => row.doc!).filter(Boolean)),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Insert or update a document envelope
   */
  putDoc<T>(doc: DocEnvelope<T>): Observable<any> {
    return defer(() => from(this.db.put(doc)));
  }

  /**
   * Remove a document envelope
   */
  removeDoc<T>(doc: DocEnvelope<T>): Observable<any> {
    return defer(() => from(this.db.remove(doc._id, doc._rev!)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
