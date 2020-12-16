import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBb-2U2Z0XfD6kO_WTi8Yi7y99tHDlR_cY',
    authDomain: 'test-f15bd.firebaseapp.com',
    databaseURL: 'https://test-f15bd.firebaseio.com',
    projectId: 'test-f15bd',
    storageBucket: 'test-f15bd.appspot.com',
    messagingSenderId: '636048479254',
    appId: '1:636048479254:web:904bc151db7b091c205137',
    measurementId: 'G-YFKRPX5R1H',
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();