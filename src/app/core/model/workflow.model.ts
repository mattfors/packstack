export interface Workflow {
  id: string;
  label?: string;
  children?: Workflow[];
  type?: string;
  subtype?: string
}
