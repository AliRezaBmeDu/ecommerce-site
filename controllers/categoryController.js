import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController = async (req, res) => {
    try{
        const { name } = req.body
        if(!name) {
            return res.status(401).send({
                message: "Name is required"
            })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if(existingCategory) {
            return res.status(401).send({
                message: "Category already exists"
            })
        }
        const category = await new categoryModel({ name, slug: slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true})
        res.status(200).send({
            success: true,
            message: "category updated",
            category
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating"
        })
    }
}

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message:'All categories list',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error while getting category'
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const singleCategory = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: 'Get single category successfully',
            singleCategory
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting single category',
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Cattegory Deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting',
            error
        })
    }
}