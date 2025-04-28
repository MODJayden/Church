import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gateReducer from "./gateSlice";
import activityReducer from "./activitySlice";

const store= configureStore({
    reducer: {
        user: userReducer,
        gate: gateReducer,
        activity: activityReducer,
      
    },
});

export default store;