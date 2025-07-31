export interface Workflow {
  _id: string;
  _rev?: string;
  id: string;
  label?: string;
  children?: Workflow[];
  type?: string;
  subtype?: string
}
