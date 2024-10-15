import React from 'react'
import CustomButton from '../../modules/CustomButton'

const CategoriesBox = ({ name, count, description, id, color }) => {
    console.log(`bg-['${color}']`)
    return (
        <div className='shadow  rounded-custom '>
            <div style={{ borderColor: color }} className='w-full h-0 border-b-[20px] lg:border-b-[30px] rounded-t-xl rounded-b-[40px] -inset-3translate-y-2 '></div>
            <div className='p-3 flex flex-col gap-3 justify-between h-[85%]'>
                <div className='flex justify-between'>
                    <h3 className=' text-14 lg:text-20 font-bold'>
                        {name}
                    </h3>
                    <span className='text-10 lg:text-14'>   تعداد : {count} </span>
                </div>
                <p className='line-clamp-2 text-10 lg:text-14'>
                    {description}
                </p>
                <div className='flex justify-end'>
                    <CustomButton className='!text-10 lg:!text-14 px-4 h-6 lg:h-8 py-0 rounded-full' style={{ backgroundColor: color }}>
                        مشاهده
                    </CustomButton>
                </div>
            </div>
        </div>
    )
}

export default CategoriesBox