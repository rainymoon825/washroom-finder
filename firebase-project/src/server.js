// src/server.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push } from 'firebase/database';
import firebaseConfig from './config/firebaseConfig';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// References to database nodes
const userList = ref(database, 'users');
const reviewList = ref(database, 'reviews');
const washroomList = ref(database, 'washrooms');

// Function to add a user to the database
function addUser(name, points) {
  push(userList, {
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
function addWashroom(type, rating, image, openTimes, coordinates, neighborhood) {
  push(washroomList, {
    type: type,
    rating: rating,
    image: image,
    openTimes: openTimes,
    coordinates: coordinates,
    neighborhood: neighborhood
  })
    .then(() => {
      console.log(`Washroom added successfully!`);
    })
    .catch((error) => {
      console.error("Error adding washroom:", error);
    });
}

// Function to add a review to the database
function addReview(washroomId, userId, comment, stars) {
  push(reviewList, {
    washroomId: washroomId,
    userId: userId,
    comment: comment,
    stars: stars,
    timestamp: Date.now()
  })
    .then(() => {
      console.log(`Review added successfully for washroom ${washroomId}!`);
    })
    .catch((error) => {
      console.error("Error adding review:", error);
    });
}