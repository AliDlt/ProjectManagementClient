import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { addCategory } from '../../services/categories'

const useAddCategory = () => {
    return useMutation({
        mutationFn: addCategory,
        mutationKey: "add-category"
    })
}

export default useAddCategory