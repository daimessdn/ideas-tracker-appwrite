import { createContext, useContext, useEffect, useState } from "react";
import { ID, Query } from "appwrite";

import { tablesDB } from "../appwrite";
import { useUser } from "./user";

export const IDEAS_DATABASE_ID = "ideas-tracker"; // Replace with your database ID
export const IDEAS_TABLE_ID = "ideas"; // Replace with your table ID

const IdeasContext = createContext();


export function useIdeas() {
  return useContext(IdeasContext);
}

export function IdeasProvider(props) {
  const [ideas, setIdeas] = useState([]);
  const user = useUser();

  async function add(idea) {
    try {
      const response = await tablesDB.createRow(
        IDEAS_DATABASE_ID,
        IDEAS_TABLE_ID,
        ID.unique(),
        idea
      );
      setIdeas((ideas) => [response, ...ideas].slice(0, 50));
    } catch (err) {
      console.log(err) // handle error or show user a message
    }
  }

  async function remove(id) {
    try {
      await tablesDB.deleteRow({
        databaseId: IDEAS_DATABASE_ID,
        tableId: IDEAS_TABLE_ID,
        rowId: id
      });
      setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id));
      await init();
    } catch (err) {
      console.log(err)
    }
  }

  async function init() {
    try {
      const response = await tablesDB.listRows(
        IDEAS_DATABASE_ID,
        IDEAS_TABLE_ID,
        [Query.orderDesc("$createdAt"), Query.limit(50)]
      );

      console.log(response.rows);
      setIdeas(response.rows);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <IdeasContext.Provider value={{ current: ideas, add, remove }}>
      {props.children}
    </IdeasContext.Provider>
  );
}
