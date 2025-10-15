// saveApplicationToFirestore.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase/firebase";

export async function saveApplicationToFirestore(userId, job, candidate, resumeUrl, results = null) {
  console.log("**** saveApplicationToFirestore ****** ",  " -- userId --- ", userId, " -- job --- ", job, " -- candidate --- ", candidate, " -- resumeUrl --- ", resumeUrl, )
  const docRef = await addDoc(collection(db, "applications"), {
    userId,
    job,
    candidate,
    resumeUrl: resumeUrl || null,
    results,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
