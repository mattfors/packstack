import { Workflow } from '../../../core/model/workflow.model';

export const defaultWorkflows: Workflow[] = [
  {
    id: 'hello-world',
    label: 'Hello World Demo',
    type: 'workflow',
    children: [
      {
        id: 'step-1',
        type: 'workflow',
        subtype: 'stepper',
        label: 'Say Hello',
        children: [
          {
            id: 'step-1-1',
            subtype: 'step',
            label: 'Greeting'
          },
          {
            id: 'step-1-2',
            subtype: 'step',
            label: 'Goodbye'
          }
        ]
      },
      {
        id: 'step-2',
        type: 'workflow',
        subtype: 'stepper',
        label: 'Say Hola',
        children: [
          {
            id: 'step-2-1',
            subtype: 'step',
            label: 'Buenos dias!'
          },
          {
            id: 'step-2-2',
            subtype: 'step',
            label: 'Buenos noches!'
          }
        ]
      }
    ]
  },

  {
    id: 'picking',
    label: 'Picking',
    type: 'workflow',
    children: [
      {
        id: 'list-work',
        type: 'workflow',
        subtype: 'table',
        label: 'List Work',
      },
      {
        id: 'perform-work',
        type: 'workflow',
        subtype: 'stepper',
        label: 'Pick',
        children: [
          {
            id: 'scan-bin',
            subtype: 'step',
            label: 'Scan Bin'
          },
          {
            id: 'scan-carton',
            subtype: 'step',
            label: 'Scan Carton'
          },
          {
            id: 'country-of-origin',
            subtype: 'step',
            label: 'Verify Country of Origin'
          },
          {
            id: 'scan-parts',
            subtype: 'step',
            label: 'Scan Parts'
          },
          {
            id: 'rescan-carton',
            subtype: 'step',
            label: 'ReScan Carton'
          }
        ]
      }
    ]
  }
];
