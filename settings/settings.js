import { useEffect } from "react";
import storage from "./storage.js";


export const saveNew = (key, newData) => {
  storage.save({
    key: key, // Note: Do not use underscore("_") in key!
    data: newData,

    // if expires not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    expires: null
  });
}




export function loadSetSettings(key) {
  storage
    .load({
      key: key,

      // autoSync (default: true) means if data is not found or has expired,
      // then invoke the corresponding sync method
      autoSync: true,

      // syncInBackground (default: true) means if data expired,
      // return the outdated data first while invoking the sync method.
      // If syncInBackground is set to false, and there is expired data,
      // it will wait for the new data and return only after the sync completed.
      // (This, of course, is slower)
      syncInBackground: true,

      // you can pass extra params to the sync method
      // see sync example below
      syncParams: {
        extraFetchOptions: {
          // blahblah
        },
        someFlag: true
      }
    })
    .then(ret => {
      // found data go to then()
      console.log('loadSetSettings: ', ret)
    })
    .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
}