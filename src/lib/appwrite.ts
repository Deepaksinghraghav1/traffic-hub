import { Client, Account, Databases, ID } from 'appwrite';

// Replace with your actual credentials from Appwrite Dashboard
const APPWRITE_ENDPOINT = 'https://sgp.cloud.appwrite.io/v1'; // Singapore Region
const APPWRITE_PROJECT_ID = '6a04cf05003b13513585'; // Real Project ID


const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const APPWRITE_DATABASE_ID = '6a04d834000b87559ade';
export const APPWRITE_PROFILES_COLLECTION_ID = 'profiles';
export const APPWRITE_CAMPAIGNS_COLLECTION_ID = 'campaigns';
export const APPWRITE_CLICKS_COLLECTION_ID = 'clicks';

// Helper function for unique IDs
export const generateId = () => ID.unique();

export default client;
