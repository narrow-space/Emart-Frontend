import { commonrequest } from "../Commonrequest"
import { BASE_URL } from "../Helper"


///add to cart prodct api///
export const addToCartAPi = async (data, header) => {
    console.log(data)
    return await commonrequest("POST", `${BASE_URL}/carts/api/addtocart/${data.productid}`, data, header, "user")

}
///get cart product api
export const getCartAPi = async (data, header) => {
    return await commonrequest("GET", `${BASE_URL}/carts/api/getcart`, "", header, "user")

}