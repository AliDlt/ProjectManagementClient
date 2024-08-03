import { useQuery } from '@tanstack/react-query'
import { userInfo } from '../services/user'

const useUserName = (id) => {
    return useQuery({
        queryKey : 'username',
        queryFn: ()=>{return userInfo(id)}
    })
}

export default useUserName