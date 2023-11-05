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
        const products = await productModel
        .find({})
        .populate('category')
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1})
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

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category")
        res.status(200).send({
            success: true,
            message: "Get single product successfully",
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting sing product'
        })
    }
}

//get photo controller
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel
        .findById(req.params.pid)
        .select("photo")
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in getting photo'
        })
    }
}

//delete product
export const deleteProductController = async (req, res) => {
    try {
        await productModel
        .findByIdAndDelete(req.params.pid)
        .select("-photo")
        res.status(200).send({
            success: true,
            message: "Delete single product successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in deleting photo'
        })
    }
}

export const updateProductController = async (req, res) => {
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
        const products = await productModel.findByIdAndUpdate(req.params.pid, 
            {...req.fields, slug: slugify(name)}, {new: true}
            )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save()
        res.status(201).send({
            success: true,
            message: 'Product updated successfully',
            products
        })
    } catch (error) 
    {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating product'
        })
    }
}

//filters
export const productFiltersController = async (req, res) =>  {
    try {
        const {checked, radio} = req.body
        let args = {}
        if (checked.length > 0) {
            args.category = checked
        }
        if (radio.length) args.price = {$gte : radio[0], $lte: radio[1]}
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) 
    {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in filtering product'
        })
    }
}