import firebase from "firebase";

let app: firebase.app.App | null = null;

const firebaseConfig = {
  apiKey: "AIzaSyBT80xjkiTeN7l3SJlP2II0DzRxgiZuj9I",
  authDomain: "blog-1f990.firebaseapp.com",
  databaseURL: "https://blog-1f990.firebaseio.com",
  projectId: "blog-1f990",
  storageBucket: "blog-1f990.appspot.com",
  messagingSenderId: "961806574990",
  appId: "1:961806574990:web:c239013b1e8d13b26d70df"
};

// initialise
if (!firebase.apps[0]) {
  app = firebase.initializeApp(firebaseConfig);
}

const updateUserFiles = files => {
  const ref = `files/${app.auth().currentUser.uid}`;
  app
    .database()
    .ref(ref)
    .set(files);
};

const getUserFiles = async () => {
  const ref = `files/${app.auth().currentUser.uid}`;
  const files = await app
    .database()
    .ref(ref)
    .once("value");
  // console.log(files.val());
  return files.val();
};

export default {
  getUserFiles,
  updateUserFiles,
  app
};
