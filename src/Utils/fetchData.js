import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const getAllFeeds = async (firestoreDb) => {
  const feeds = await getDocs(
    query(collection(firestoreDb, "videos"), orderBy("id", "desc"))
  );

  return feeds.docs.map(doc => doc.data());
};
