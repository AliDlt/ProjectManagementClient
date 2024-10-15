import React from 'react'
import CategoriesBox from '../components/ui/Reports/CategoriesBox'
import CustomButton from '../components/modules/CustomButton'
import CustomInput from '../components/modules/CustomInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { searchReport } from '../yup/yup'
import { GrSearch } from 'react-icons/gr'
import { FaFilter } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import useCategories from '../hooks/useCategories'
const arr = [
    {
        name: 'ماشین ها',
        count: 10,
        id: 12,
        color: '#F1A25B',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن....'
    },
    {
        name: 'ماشین ها',
        count: 4,
        id: 10,
        color: '#007AFF',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن....'
    },
    {
        name: 'ماشین ها',
        count: 8,
        id: 15,
        color: '#0D7113',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن....'
    },
    {
        name: 'ماشین ها',
        count: 4,
        id: 13,
        color: '#601367',
        description: 'لورم ایپسوم متن ساختگی با تولید سادگی  لورم ایپسوم متن....'
    },
]
const ReportCategories = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        resolver: yupResolver(searchReport)
    })
    const { data,error} = useCategories('report')
    console.log(data)
    console.log(error)
    return (
        <div className=' container-grid flex flex-col'>
            <div className='flex justify-between col-span-10'>
                <h2 className='text-24 font-bold'>
                    گزارش ها
                </h2>
                <CustomButton>
                    افزارش گزارش
                </CustomButton>
            </div>
            <div className='flex gap-3 items-center w-full lg:w-[60%] xl:w-[50%] '>
                <div className='w-[70%]'>
                    <CustomInput control={control} className='p-2 ' icon={
                        <GrSearch className="-scale-x-100 text-custom-primary-color w-5 h-5 ml-2" />
                    }
                        placeholder={'جستجو ...'}
                        error={errors['search']} name='search' />
                </div>
                <div className='w-[30%] lg:w-[20%]'>
                    <CustomButton className='w-full h-full !text-12 lg:!text-16 px-3 py-2' >
                        <span>
                            <FaFilter />
                        </span>
                        <span>
                            فیلتر
                        </span>
                        <span>
                            <IoIosArrowDown />

                        </span>
                    </CustomButton>
                </div>

            </div>
            <div className='grid grid-cols-2 gap-3'>
                {arr.map(({ name, color, count, description, id }, key) => {
                    return <CategoriesBox name={name} description={description} key={key} color={color} count={count} id={id} />
                })}
            </div>
        </div>
    )
}

export default ReportCategories