import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { userInfo } from '../services/user'
console.log(userInfo)
const useUserName = () => {
    return useQuery({
        queryKey : 'username',
        queryFn: userInfo
    })
}

export default useUserName