import { useState, type FormEvent } from 'react';
import axios, { type AxiosResponse } from 'axios'
import type Product from '../../types/ProductType';
import toast from 'react-hot-toast';

const BASE_URL = "http://localhost:3000";

interface FormData {
    name: string,
    price: number,
    image: string
}

export default function useProducts(){
    const [ products, setProducts ] = useState<Array<Product>>([]);
    const [ loading, setLoading ] = useState<boolean>(false);
    // basically the error message
    const [ error, setError ] = useState<string | null>(null);
    const [ currentProduct, setCurrentProduct] = useState<null | Product>(null);
    const [ formData, setFormData ] = useState<FormData>({name: "", price: 0, image: ""});

    const addProduct = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // first argument is the url
            // second argument is the data sent to the server in the form of the request's body
            await axios.post(`${BASE_URL}/api/products`, formData)
            await fetchProducts();
            setFormData({name: "", price: 0, image: ""});
            toast.success("Product added successfully!");
            
            const modal = document.getElementById("product-modal") as HTMLDialogElement;
            modal.close();
        } catch(err) {
            console.log("Error!: ", err);
            setError("Error in adding product to database.");
            toast.error("Error in adding product!");
        } finally {
            setLoading(false);
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // sends a get request to the given url
            const response: AxiosResponse = await axios.get(`${BASE_URL}/api/products`);
            setProducts(response.data.data);
            setError(null);
        } catch(err){
            console.log("Error!: ", err);
            setError("Error");
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }

    const deleteProduct = async(id: number) => {
        setLoading(true);
        try {
            // sends a delete request to the given url
            await axios.delete(`${BASE_URL}/api/products/${id}`);
            setProducts(prev => prev.filter(val => val.id !== id));
            setError(null)
            toast.success("Product deleted successfully!");
        } catch (err) { 
            console.log("Error!: ", err);
            setError("Error in deleting the product!");
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchProduct = async (id: number) => {
        setLoading(true);

        try {
            const response: AxiosResponse = await axios.get(`${BASE_URL}/api/products/${id}`);
            setCurrentProduct(response.data.data[0]);
            setFormData(response.data.data[0]); // pre-fill form with current product data
            setError(null);
        } catch(err) {
            console.log("Error!: ", err);
            setError("Trouble accessing product");
            setCurrentProduct(null);
        } finally {
            setLoading(false);
        }
    }

    const updateProduct = async (id: number) => {
        setLoading(true);

        try {
            const response: AxiosResponse = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
            setCurrentProduct(response.data.data);
            toast.success("Product updated successfully");
            setError(null)
        } catch(err){
            console.log("Error!: ", err);
            setError("Trouble updating product.");
            toast.error(error);
        } finally {
            setLoading(false);
        }
    } 

    return {products, setProducts, loading, setLoading, error, setError, fetchProducts, deleteProduct, addProduct, formData, setFormData, fetchProduct, updateProduct, currentProduct};
}