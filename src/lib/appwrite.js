import { Client, TablesDB, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject("68be58a30014c8d1878a"); // Replace with your project ID

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
