import { configureStore } from "@reduxjs/toolkit"
import Adminslice from "../Slice/adminAuthslice/adminAuthslice"
import ProductSlice from "../Slice/ProductSlice/ProductSlice"
import categorySlice from "../Slice/categorySlice/categorySlice"
import brandSlice from "../Slice/brandSlice/brandSlice"
import BannerSlice from "../Slice/bannerSlice/bannerSlice"
import userAuthSlice from "../Slice/Userauthslice/userAuthSlice"
import cartSlice from "../Slice/cartSlice/cartSlice"





export const store = configureStore({
    reducer: {
        Admin: Adminslice,
        products: ProductSlice,
        category: categorySlice,
        brand: brandSlice,
        banner: BannerSlice,
        user: userAuthSlice,
        cart: cartSlice
    }
})