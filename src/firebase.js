import firebase from "firebase";
import "firebase/auth";
export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyCyIOFy7AMJCU0BHgfDCmPW84Hn4_CuCkQ",
    authDomain: "reactjs-chat-7da02.firebaseapp.com",
    projectId: "reactjs-chat-7da02",
    storageBucket: "reactjs-chat-7da02.appspot.com",
    messagingSenderId: "264470538972",
    appId: "1:264470538972:web:5318d9e1afb52be0516219",
  })
  .auth();
