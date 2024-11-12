import SummaryApi from "../common"
import {toast} from "react-toastify"

const addToBasket = async(e,id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(SummaryApi.addToBasketProduct.url, {
        method: SummaryApi.addToBasketProduct.method,
        credentials: "include",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            productId: id
        })
    })

    const responseData = await response.json();
    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast(responseData.message)
    }
    return responseData
}

export default addToBasket