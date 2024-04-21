import toast from "react-hot-toast";
import { addToCartAPi, getCartAPi } from "../../../api/Cartapi/CartAPi";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

///add to cart//
export const addtoCart = createAsyncThunk("addtoCart", async (data) => {
    try {
        const response = await addToCartAPi(data)
        if (response.status == 200) {
            toast.success(response.data.message)
            return response.data
        } else {
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error
    }
})
///get cart product///
export const getCart = createAsyncThunk("getCart", async (thunkApi) => {
    try {
        const response = await getCartAPi()
        if (response.status == 200) {

            return response.data
        } else {
            return thunkApi.rejectWithValue("error")
        }
    } catch (error) {
        throw error
    }
})


///create Action and reducer///

export const CartSlice = createSlice({
    name: "CartSlice",
    initialState: {
        addtoCart: [],
        getCartProduct: [],
        addToCartLoading: false,
        getCartLoading: false,
        error: null
    },
    reducers: {
        clearCartData: (state) => {
            state.getCartProduct = [];
        }
    },
    extraReducers: (builder) => {
        ////add cart
        builder.addCase(addtoCart.pending, (state) => {
            state.addToCartLoading = true;
        })
            .addCase(addtoCart.fulfilled, (state, action) => {
                state.addToCartLoading = false;
                state.addtoCart = action.payload
            })

            .addCase(addtoCart.rejected, (state, action) => {
                state.addToCartLoading = false;
                state.error = action.payload
            })

            ///get cart product 
            .addCase(getCart.pending, (state) => {
                state.getCartLoading = true;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.getCartLoading = false;
                state.getCartProduct = action.payload
            })

            .addCase(getCart.rejected, (state, action) => {
                state.getCartLoading = false;
                state.error = action.payload
            })
    }
})
export const { clearCartData } = CartSlice.actions;

export default CartSlice.reducer