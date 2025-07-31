import PouchDB from 'pouchdb';
import helloWorldWorkflow from '../workflows/hello-world.workflow.json';

const db = new PouchDB('app-db');

export async function preloadWorkflows() {
  console.log("Preloading workflows...");
  const workflows = [helloWorldWorkflow]; // Add other workflow imports here

  for (const workflow of workflows) {
    console.log("Trying to preload workflow:", workflow.id);
    const docId = `workflow:${workflow.id}`;
    try {
      const existingDoc = await db.get(docId);
      console.log(`Workflow ${docId} already exists. Replacing...`);
      const updatedDoc = {
        ...existingDoc,
        ...workflow,
        _id: docId,
        _rev: existingDoc._rev, // Required for updating the document
      };
      await db.put(updatedDoc);
      console.log(`Workflow ${docId} replaced successfully.`);
    } catch (error) {
      // If the document does not exist, we catch the 404 error and add it
      if (isPouchError(error) && error.status === 404) {
        console.log(`Workflow ${docId} not found. Adding to PouchDB...`);
        const newDoc = {
          _id: docId,
          ...workflow,
        };
        await db.put(newDoc);
        console.log(`Workflow ${docId} added successfully.`);
      } else {
        console.error(`Error checking workflow ${docId}:`, error);
      }
    }
  }
}
function isPouchError(error: unknown): error is PouchDB.Core.Error {
  return typeof error === 'object' && error !== null && 'status' in error;
}
