import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
var config = {
  apiKey: "AIzaSyDwUM0DfYAYY0XSX_ZxWLFmQk4LZ8h3-LA",
  authDomain: "image-3d.firebaseapp.com",
  databaseURL: "https://image-3d.firebaseio.com",
  projectId: "image-3d",
  storageBucket: "image-3d.appspot.com",
  messagingSenderId: "839184944954"
};

export default firebase.initializeApp(config);
