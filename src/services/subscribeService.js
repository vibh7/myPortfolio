// src/services/subscribeService.js
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

const subsCol = collection(db, "subscribers");

export const subscribeUser = async (email) => {
  // check duplicate
  const q = query(subsCol, where("email", "==", email));
  const snaps = await getDocs(q);
  if (!snaps.empty) {
    return { alreadySubscribed: true };
  }
  const res = await addDoc(subsCol, { email, createdAt: new Date().toISOString() });
  return { id: res.id };
};

export const listSubscribers = async () => {
  const snaps = await getDocs(subsCol);
  return snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
};
