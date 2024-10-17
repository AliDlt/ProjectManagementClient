import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getCategories } from '../../services/categories'

const useCategories = (type) => {
    return useQuery({
        queryFn: () => getCategories(type),
        queryKey: ['get-categories', type],
        staleTime: 1000 * 60 * 5,

    })
}

export default useCategories