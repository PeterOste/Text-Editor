import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Adding content to the database');

  // Open jate database with version 1
  const jateDb = await openDB('jate', 1);

  // Create readonly for jate object
  const tx = jateDb.transaction('jate', 'readwrite');

  // Access to jate object within the transaction
  const store = tx.objectStore('jate');

  try {
    // Add content to jate object with add method, a key will be generated
    const key = await store.add(content);

    console.log(`Content added with key: ${key}`);

    // Complete transaction
    await tx.done;
  } catch (error) {
    // Error handling
    console.error('There was an error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Open jate database with version 1
  const jateDb = await openDB('jate', 1);

  // Create readonly for jate object
  const tx = jateDb.transaction('jate', 'readonly');

  // Access to jate object within the transaction
  const store = tx.objectStore('jate');

  // Retrieve all data from jate object
  const request = store.getAll();

  // Wait for the request to complete and then store the result in the result variable
  const result = await request;

  console.log('result.value', result);

  // Return retrieved data as the result
  return result;
};

initdb();
