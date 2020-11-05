import Firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import dotenv from  "dotenv"
import { seedDatabase } from "../seed"

dotenv.config()

const config = {
    apiKey: process.env.API_KEY,
    authDomain: "movie-deck.firebaseapp.com",
    databaseURL: "https://movie-deck.firebaseio.com",
    projectId: "movie-deck",
    storageBucket: "movie-deck.appspot.com",
    messagingSenderId: "697846336818",
    appId: "1:697846336818:web:aabb7c20a78e7bb18e5b2b"
}

const firebase = Firebase.initializeApp(config)
// seedDatabase(firebase)
export { firebase }