import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWdGmUVwRdiHKJcT5KO94ATn3IW0Ap5Gk",
  authDomain: "image-gallery-31092.firebaseapp.com",
  projectId: "image-gallery-31092",
  storageBucket: "image-gallery-31092.appspot.com",
  messagingSenderId: "641285771628",
  appId: "1:641285771628:web:381f717c7f87b9348d6349",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, storage };
