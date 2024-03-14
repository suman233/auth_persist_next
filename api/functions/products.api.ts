import axios from "axios"

export const getProducts= async ()=> {
    const resp=await axios.get('https://fakestoreapi.com/products')
    return resp.data;
}

export const getSingleProduct = async(id: string)=>{
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
    return response?.data;
}