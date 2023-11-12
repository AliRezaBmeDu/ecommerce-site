import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default const useCategory = () => {
    const reactApi = process.env.REACT_APP_API
    const [categories, setCategories] = useState([])

    // get cat
    const getCategories = async () => {
        try {
            const {data} = axios.get(`${reactApi}/api/v1/category/get-category`)
            setCategories(data?.categoy)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategories()
    },[])
    
  return categories;
}
