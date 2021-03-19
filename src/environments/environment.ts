// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyD21o0jPYzzIVis8NxL8QWASLmipJpTTdY',
  authDomain: 'harry-firebase.firebaseapp.com',
  databaseURL: 'https://harry-firebase.firebaseio.com',
  projectId: 'harry-firebase',
  storageBucket: 'harry-firebase.appspot.com',
  messagingSenderId: '429027775138',
  appId: '1:429027775138:web:8dbb12c0dd9f38db0fbdfb',
  measurementId: 'G-RMVRHZP2FX'
};

export const environment = {
  useEmulators: true,
  production: false,
  firebaseConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
