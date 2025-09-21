import { db } from './firebaseConfig';
import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, setDoc, query, where } from 'firebase/firestore';

export const firestore = {
  // Products
  getProducts: async () => {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  getProduct: async (id) => {
    const docRef = doc(db, 'products', id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },

  addProduct: async (product) => {
    const productsRef = collection(db, 'products');
    return addDoc(productsRef, product);
  },

  updateProduct: async (id, updates) => {
    const docRef = doc(db, 'products', id);
    return updateDoc(docRef, updates);
  },

  deleteProduct: async (id) => {
    const docRef = doc(db, 'products', id);
    return deleteDoc(docRef);
  },

  // Users
  getUser: async (uid) => {
    const docRef = doc(db, 'users', uid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },

  getUserByPhone: async (phoneNumber) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    // Assuming phone number is unique, return the first match
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  addUser: async (uid, userData) => {
    const docRef = doc(db, 'users', uid);
    return setDoc(docRef, userData);
  },

  getUser: async (uid) => {
    const docRef = doc(db, 'users', uid);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  },

  getUserByPhone: async (phoneNumber) => {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('phoneNumber', '==', phoneNumber));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  updateUser: async (uid, updates) => {
    const docRef = doc(db, 'users', uid);
    return updateDoc(docRef, updates);
  },

  // Orders
  getOrders: async (userId) => {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  addOrder: async (order) => {
    const ordersRef = collection(db, 'orders');
    return addDoc(ordersRef, order);
  },

  // Analytics
  getAnalytics: async () => {
    const analyticsRef = collection(db, 'analytics');
    const snapshot = await getDocs(analyticsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
};
