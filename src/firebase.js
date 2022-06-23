//npm i firebase

import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import secret from "./secrets";

let app=initializeApp(secret);

export let auth=getAuth(app);
export const db = getFirestore(app);
