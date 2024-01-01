import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function useCategory() {
    const reactApi = process.env.REACT_APP_API
    const [categories, setCategories] = useState([])

    // get cat
    const getCategories = async () => {
        try {
            const {data} = await axios.get(`${reactApi}/api/v1/category/get-category`)
            setCategories(data?.category)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    },[])
    // console.log('categories: ', categories)
  return categories;
}
