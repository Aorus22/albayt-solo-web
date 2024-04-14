import React from 'react'

type formProps = {
    label: string;
    formtype: string;
    form_id: string;
    form_name: string;
    form_placeholder: string;
}

const Template_form = ({label, formtype, form_id, form_name, form_placeholder}: formProps) => {
  return (
    <>
        <div className='flex flex-col relative w-full'>
            <label className='font-medium text-[#f14310] text-[14px] md:text-[16px] lg:text-lg'>
                {label}
            </label>
            <input type={formtype} id={form_id} name={form_name} placeholder={form_placeholder} className='py-1 md:py-2 px-2 md:px-4 my-1 md:my-2 rounded-md appearance-none text-white border bg-[#f14310] placeholder:text-white placeholder:text-[12px] lg:placeholder:text-[14px] focus:outline-[#89060b] focus:shadow-none' />
        </div>
    </>
  )
}

export default Template_form