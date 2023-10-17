import { collection, getDocs } from "firebase/firestore";
import { db } from "../Dbconfig/dbconfig";

export async function  employeeLoader()
{
    const querySnapshot = await getDocs(collection(db, "Employees"));
    return querySnapshot.docs;
}

