export interface WorkflowViewNode {
  id: string;
  label?: string;
  type?: string;
  subtype?: string;
  complete?: boolean;
}

export interface StepperViewNode extends WorkflowViewNode {
  subtype: 'stepper';
  activeIndex: number;
  children: WorkflowViewNode[];
}
