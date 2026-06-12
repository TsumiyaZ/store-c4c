const apiEndpoint = 'https://store.c4c2026.xyz/api/products';
import { Datum, ProductResGet } from "./interface/response/product_res_get";


export async function getAllProduct(): Promise<Datum[] | undefined>{
    try {
        const res = await fetch(apiEndpoint, {
            cache: 'no-store'
        });
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const result: ProductResGet = await res.json();
        return result.data;    
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}