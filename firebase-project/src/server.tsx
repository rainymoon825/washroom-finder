// src/server.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, get, DataSnapshot } from 'firebase/database';
import type { DatabaseReference } from 'firebase/database';
import firebaseConfig from './config/firebaseConfig';

export interface Washroom {
  id?: string;
  type: string;
  rating: number | null;
  image: string | null;
  openTimes: any | null;
  coordinates: { lat: number; lon: number };
  neighborhood: string | null;
}

export interface User {
  name: string;
  points: number;
}

export interface Review {
  washroomId: string;
  userId: string;
  comment: string;
  stars: number;
  timestamp: number;
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userList: DatabaseReference = ref(database, 'users');
const reviewList: DatabaseReference = ref(database, 'reviews');
const washroomList: DatabaseReference = ref(database, 'washrooms');

export async function addUser(name: string, points: number): Promise<void> {
  try {
    await push(userList, { name, points });
    console.log(`User ${name} added successfully!`);
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

export async function addWashroom(
  type: string,
  rating: number | null,
  image: string | null,
  openTimes: any | null,
  coordinates: { lat: number; lng: number },
  neighborhood: string
): Promise<void> {
  try {
    await push(washroomList, { type, rating, image, openTimes, coordinates, neighborhood });
    console.log(`Washroom added successfully!`);
  } catch (error) {
    console.error("Error adding washroom:", error);
  }
}

export async function addReview(
  washroomId: string,
  userId: string,
  comment: string,
  stars: number
): Promise<void> {
  try {
    await push(reviewList, { washroomId, userId, comment, stars, timestamp: Date.now() });
    console.log(`Review added successfully for washroom ${washroomId}!`);
  } catch (error) {
    console.error("Error adding review:", error);
  }
}

export async function getWashrooms(): Promise<{ [key: string]: Washroom } | null> {
  try {
    const snapshot: DataSnapshot = await get(washroomList);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No users available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUsers(): Promise<{ [key: string]: User } | null> {
  try {
    const snapshot: DataSnapshot = await get(userList);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No users available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReviews(): Promise<{ [key: string]: Review } | null> {
  try {
    const snapshot: DataSnapshot = await get(reviewList);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No reviews available");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
