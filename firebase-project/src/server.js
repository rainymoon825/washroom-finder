// src/server.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';
import firebaseConfig from './config/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add a user to the database
function addUser(userId, name, points) {
  set(ref(database, 'users/' + userId), {
    name: name,
    points: points
  })
    .then(() => {
      console.log(`User ${name} added successfully!`);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}

// Function to add a washroom to the database
function addWashroom(washroomId, type, rating, image, openTimes, coordinates, neighborhood) {
  set(ref(database, 'washrooms/' + washroomId), {
    type: type,
    rating: rating,
    image: image,
    openTimes: openTimes,
    coordinates: coordinates,
    neighborhood: neighborhood
  })
    .then(() => {
      console.log(`Washroom ${washroomId} added successfully!`);
    })
    .catch((error) => {
      console.error("Error adding washroom:", error);
    });
}

// Function to add a review to a washroom
function addReview(washroomId, reviewId, userId, comment, stars) {
  const reviewRef = ref(database, `washrooms/${washroomId}/reviews/${reviewId}`);
  set(reviewRef, {
    userId: userId,
    comment: comment,
    stars: stars,
    timestamp: Date.now()
  })
    .then(() => {
      console.log(`Review added successfully to washroom ${washroomId}!`);
    })
    .catch((error) => {
      console.error("Error adding review:", error);
    });
}