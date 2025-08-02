export interface DocEnvelope<T> {
  _id: string;
  _rev?: string;
  data: T;
}
