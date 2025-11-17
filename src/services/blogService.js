// src/services/blogService.js
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebaseConfig";

const BLOG_COLLECTION = "blogs";
const blogsRef = collection(db, BLOG_COLLECTION);

// Utility — auto-generate slug
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();

// CREATE
export const createBlog = async ({
  title,
  excerpt,
  content,
  published = false,
  imageFile,

  seoTitle,
  seoDescription,
  seoKeywords,
}) => {
  let imageUrl = null;

  if (imageFile) {
    const storageRef = ref(storage, `blogs/${Date.now()}_${imageFile.name}`);
    const snap = await uploadBytes(storageRef, imageFile);
    imageUrl = await getDownloadURL(snap.ref);
  }

  const slug = slugify(title);

  return await addDoc(blogsRef, {
    title,
    slug,
    excerpt,
    content,
    published,
    imageUrl,

    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt,
    seoKeywords: seoKeywords || "",

    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
};

// UPDATE
export const updateBlog = async (
  id,
  {
    title,
    excerpt,
    content,
    published,
    imageFile,

    seoTitle,
    seoDescription,
    seoKeywords,
  }
) => {
  const docRef = doc(db, BLOG_COLLECTION, id);
  const payload = {
    title,
    excerpt,
    content,
    published,
    updatedAt: Date.now(),

    seoTitle,
    seoDescription,
    seoKeywords,
  };

  // Slug should NOT change if blog is already created
  // But if you want to allow slug editing, uncomment:
  // payload.slug = slugify(title);

  if (imageFile) {
    const storageRef = ref(storage, `blogs/${Date.now()}_${imageFile.name}`);
    const snap = await uploadBytes(storageRef, imageFile);
    payload.imageUrl = await getDownloadURL(snap.ref);
  }

  return await updateDoc(docRef, payload);
};

// DELETE
export const deleteBlog = async (id) => {
  return await deleteDoc(doc(db, BLOG_COLLECTION, id));
};

// GET SINGLE
export const getBlog = async (id) => {
  const snap = await getDoc(doc(db, BLOG_COLLECTION, id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

// GET BY SLUG
export const getBlogBySlug = async (slug) => {
  const q = query(
    blogsRef,
    where("slug", "==", slug),
    where("published", "==", true)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  const d = snap.docs[0];
  return { id: d.id, ...d.data() };
};


// REALTIME LISTENER
export const subscribeBlogs = ({ callback, onlyPublished = false }) => {
  const q = onlyPublished
    ? query(blogsRef, where("published", "==", true), orderBy("createdAt", "desc"))
    : query(blogsRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(items);
  });
};




