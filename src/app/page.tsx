import React from 'react'
import Form from '../components/Home/form'
import Head from "next/head";
import FaviIcon from '../../public/note-svgrepo-com.svg'

function Page() {
  return (
    <section className='flex w-full justify-center mt-[30px] font-[600]'>
              <Head>
        <link rel="shortcut icon" href={FaviIcon} />
      </Head>
        <div className='w-[90%] max-w-[500px]'>
            <p className='text-[40px] max-md:text-[30px]'>Criar nova nota</p>
            <Form />
        </div>
    </section>
  )
}

export default Page