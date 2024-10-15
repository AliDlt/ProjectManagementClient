import { useMutation, useQuery } from "@tanstack/react-query"
import { uploadFile } from "../../services/files"

const useUpload = () => {
    console.log('first')
    return useMutation({
        mutationFn: uploadFile,
        mutationKey: ['upload-file']
    })
}

export default useUpload