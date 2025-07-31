import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideWorkflowInitializer } from './engine/workflow/workflow.initializer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideWorkflowInitializer()
    //provideAppInitializer(() => preloadWorkflows()),
  ]
};
