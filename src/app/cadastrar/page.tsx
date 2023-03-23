import React from 'react'
import Form from '@/components/SignUp/form'

function Page() {
  return (
    <section className='flex w-full justify-center mt-[100px] font-[600]'>
        <div className='w-[90%] max-w-[500px]'>
            <p className='text-[40px] max-md:text-[30px]'>Cadastrar</p>
            <Form />
        </div>  
    </section>
  )
}

export default Page