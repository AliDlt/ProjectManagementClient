import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { updateReport } from '../../services/reports'

const useUpdateReport = () => {
    return useMutation({
        mutationFn : updateReport,
        mutationKey : 'update-report'
    })
}

export default useUpdateReport