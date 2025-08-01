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
          },
          {
            id: 'step-1-2',
            _id: 'step-1-2',
            subtype: 'step',
            label: 'Goodbye'
          }
        ]
      },
      {
        id: 'step-2',
        _id: 'step-2',
        type: 'workflow',
        subtype: 'stepper',
        label: 'Say Hola',
        children: [
          {
            id: 'step-2-1',
            _id: 'step-2-1',
            subtype: 'step',
            label: 'Buenos dias!'
          },
          {
            id: 'step-2-2',
            _id: 'step-2-2',
            subtype: 'step',
            label: 'Buenos noches!'
          }
        ]
      }
    ]
  }
];
