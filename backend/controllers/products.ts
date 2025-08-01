import express, { type Request, type Response } from 'express';
import { sql } from '../config/database.ts';

export async function getProducts(req: Request, res: Response){
    try {
        const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
        
        console.log("fetched products", products);
        res.status(200).json({success: true, data: products});
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({success: false, message: `Accessing products from database was unsuccessful. ${err.message}`});
    }
}

export async function createProduct(req: Request, res: Response){
    const { name, price, image } = req.body;

    if (!name || !price || !image){
        return res.status(400).json({success: false, message: "Please provide all fields."});
    }

    try {
        const newProduct = await sql`
            INSERT INTO products (name, price, image)
            VALUES (${name}, ${price}, ${image})
            RETURNING *
            `

        console.log("new product added: ", newProduct)

        res.status(201).json({success: true, data: newProduct[0]});
    } catch (err){
        console.log("Error: ", err);
        res.status(500).json({success: false, message: `Unable to add product to database. ${err}`});
    }
}

export async function getProduct(req: Request, res: Response){
    const { id } = req.params; 

    try {
        const newProduct = await sql`
            SELECT * FROM products WHERE id = ${id}
        `

        res.status(200).json({success: true, data: newProduct});
    } catch (err){
        console.log("Error: ", err);
        res.status(500).json({success: false, message: `Unable to get product from database. ${err}`});
    }
}

export async function updateProduct(req: Request, res: Response){
    const { id } = req.params;
    const { name, price, image } = req.body;

    try {
        const updatedProducts = await sql`
            UPDATE products
            SET name=${name}, price=${price}, image=${image}
            WHERE id=${id}
            RETURNING *
        `

        if (updatedProducts.length === 0){
            return res.status(404).json({
                success: false, 
                message: "Resource/Product not found."
            });
        }

        res.status(200).json({success: true, data: updatedProducts[0]});
    } catch (err){
        console.log("Error: ", err);
        res.status(500).json({success: false, message: `Unable to get product from database. ${err}`});
    }
}

export async function deleteProduct(req: Request, res: Response){
    const { id } = req.params;

    try {
        const deletedProducts = await sql`
            DELETE FROM products WHERE id=${id}
            RETURNING *
        `;

        if (deletedProducts.length === 0){
            return res.status(404).json({
                success: false,
                message: "Product/Resource not found"
            })
        }

        return res.status(200).json({message: true, data: deletedProducts[0]});
    } catch (err){
        console.log("Error: ", err);
        res.status(500).json({success: false, message: `Unable to delete product from database. ${err}`});
    }
}