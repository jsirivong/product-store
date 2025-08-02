import { useState } from 'react';
import axios, { type AxiosResponse } from 'axios'
import type Product from '../types/ProductType';

const BASE_URL = "http://localhost:3000";

export default function useProducts(){
    // products state
    const [ products, setProducts ] = useState<Array<Product>>([]);
    // loading state
    const [ loading, setLoading ] = useState<boolean>(false);
    // error state
    const [ error, setError ] = useState<string | null>(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response: AxiosResponse = await axios.get(`${BASE_URL}/api/products`);
            setProducts(response.data.data);
            setError(null);
        } catch(err){
            console.log("Error!: ", err);
            setError("Error");
        } finally {
            setLoading(false);
        }
    }

    return [products, setProducts, loading, setLoading, error, setError, fetchProducts]
}