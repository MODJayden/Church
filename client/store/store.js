import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gateReducer from "./gateSlice";

const store= configureStore({
    reducer: {
        user: userReducer,
        gate: gateReducer,
      
    },
});

export default store;