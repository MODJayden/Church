import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import gateReducer from "./gateSlice";
import activityReducer from "./activitySlice";
import serviceImageReducer from "./serviceImage";

const store= configureStore({
    reducer: {
        user: userReducer,
        gate: gateReducer,
        activity: activityReducer,
        serviceImage: serviceImageReducer,
      
    },
});

export default store;