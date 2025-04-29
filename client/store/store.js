import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gateReducer from "./gateSlice";
import activityReducer from "./activitySlice";
import serviceImageReducer from "./serviceImage";
import booksReducer from "./books";
import sermonReducer from "./sermon";
import merchandiseItemReducer from "./merchandiseItemSlice"; // Added import

const store= configureStore({
    reducer: {
        user: userReducer,
        gate: gateReducer,
        activity: activityReducer,
        serviceImage: serviceImageReducer,
        books: booksReducer,
        sermon: sermonReducer,
        merchandiseItem: merchandiseItemReducer, // Added reducer
      
    },
});

export default store;