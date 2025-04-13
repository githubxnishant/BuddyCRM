import React from 'react'

const DashboardStatCard = () => {
    return (
        <>
            <div className='w-1/4 h-auto border-2 px-5 py-3 border-[#27272a] rounded-lg my-8 mx-2'>
                <p className='text-white'>Total Clients</p>
                <h1 className='text-white m-2 text-5xl'>5+</h1>
                <p className='text-[#a1a1aa] mt-6 text-sm'>Visitors for the last month</p>
            </div>
        </>
    )
}

export default DashboardStatCard