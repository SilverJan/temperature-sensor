// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCuDIW_POlwL5xUhjOV1DfecrYOrFwHq0o",
    authDomain: "temperature-sensor-228507.firebaseapp.com",
    databaseURL: "https://temperature-sensor-228507.firebaseio.com",
    projectId: "temperature-sensor-228507",
    storageBucket: "temperature-sensor-228507.appspot.com",
    messagingSenderId: "423130109668"
  },
  baseUri: '192.168.1.69',
  mock: false
  // use the following for local JSON file mocking
  // baseUri: 'localhost:4200',
  // mock: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
