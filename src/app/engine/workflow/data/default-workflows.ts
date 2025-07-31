import { Workflow } from '../../../core/model/workflow.model';

export const defaultWorkflows: Workflow[] = [
  {
    _id: 'workflow:hello-world',
    id: 'hello-world',
    label: 'Hello World Demo',
    type: 'workflow',
    children: [
      {
        id: 'step-1',
        _id: 'step-1',
        type: 'workflow',
        subtype: 'stepper',
        label: 'Say Hello',
        children: [
          {
            id: 'step-1-1',
            _id: 'step-1-1',
            subtype: 'step',
            label: 'Greeting'
          }
        ]
      }
    ]
  }
];
