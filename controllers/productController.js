import productModel from "../models/productModel.js";
import slugify from 'slugify';
import fs from 'fs';

export const createProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            slug,
            price,
            category,
            quantity,
            shipping
        } = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error: "name is required"})
            case !description:
                return res.status(500).send({error: "description is required"})
            case !category:
                return res.status(500).send({error: "category is required"})
            case !quantity:
                return res.status(500).send({error: "quantity is required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({
                    error: "photo and photo.size is less than 1000000 is required"
                })
                            
        }
        const products = new productModel({...req.fields, slug: slugify(name)})
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })
    } catch (error) 
    {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in creating product'
        })
    }
}

export const getProductController = async (req,res) => {
    try{
        const products = await productModel.find({}).select("-photo").limit(12).sort({createdAt: -1})
        res.status(200).send({
            success: true,
            totalCount: products.length,
            message: "Get products successfully",
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting product'
        })
    }
}