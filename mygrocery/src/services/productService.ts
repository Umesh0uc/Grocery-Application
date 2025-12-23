import axios from "axios";
import { endpoints } from "../utils/utils";

export const getAllProducts = async () => {
    try{
        const response = await axios.get( endpoints.allProducts, {headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }} );
        const { data } = response;
        if(response.status === 200){
            if(data.success){
                return data.data;
            }
            else{
                throw new Error(data.error || 'Failed to fetch products');
            }
        }
    }
    catch(e: any){
        console.error(e?.message);
        return false;
    }
};