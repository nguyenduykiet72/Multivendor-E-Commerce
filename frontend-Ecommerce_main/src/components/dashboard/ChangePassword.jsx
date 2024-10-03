import React from 'react'

const ChangePassword = () => {
  return (
    <div className='p-4 bg-white'>
        <h2 className='pb-5 text-xl text-slate-800'>Change Password</h2>
        <form>
            <div className='flex flex-col gap-1 mb-2'>
                <label htmlFor="old_password">Old Password</label>
                <input className='px-3 py-1 border rounded-md outline-none text-slate-800' type="password" name="old_password" id="old_password" placeholder='Old Password'/>
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <label htmlFor="new_password">New Password</label>
                <input className='px-3 py-1 border rounded-md outline-none text-slate-800' type="password" name="new_password" id="new_password" placeholder='New Password'/>
            </div>
            <div className='flex flex-col gap-1 mb-2'>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input className='px-3 py-1 border rounded-md outline-none text-slate-800' type="password" name="confirm_password" id="confirm_password" placeholder='Confirm Password'/>
            </div>
            <div>
                <button className='px-8 py-2 bg-[#059473] text-white shadow-md hover:shadow-green-500/30 rounded-md'>Update Password</button>
            </div>
        </form>
    </div>
  )
}

export default ChangePassword