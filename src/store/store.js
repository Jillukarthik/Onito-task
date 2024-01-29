import { configureStore } from "@reduxjs/toolkit";
import AddInfoSlice from "./feacture/AddInfoSlice";

export default configureStore({
    reducer:{
        AddInfoReducer:AddInfoSlice
    }
})