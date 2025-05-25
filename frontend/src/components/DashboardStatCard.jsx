import React from 'react'

const DashboardStatCard = ({ heading, stats, subheading }) => {
    return (
        <>
            <div className='w-1/4 h-auto border-2 px-5 py-3 border-[#27272a] rounded-lg my-8 mx-2'>
                <p className='text-white text-lg'>{heading}</p>
                <h1 className='text-white m-2 text-5xl'>{stats}</h1>
                <p className='text-[#a1a1aa] mt-3 text-sm'>{subheading}</p>
            </div>
        </>
    )
}

export default DashboardStatCard