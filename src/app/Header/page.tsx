'use client'
import Link from 'next/link'
import React, { useEffect, useContext } from 'react'
import userContext from '../appContext'


function Page() {
    const { dataUser, setDataUser } = useContext(userContext)
    const dataUserStorage = localStorage.getItem('user')

    async function Exit(){
        localStorage.setItem('user', '')
        setDataUser({})
    }

  return (
    <section className='w-full h-[10%] bg-[#F7C036] flex flex-col justify-center items-center'>
        <div className='flex w-[70%] max-lg:w-[95%] justify-between'>
            <Link href={'/'} className='text-[40px] max-md:text-[30px] max-sm:text-[25px] text-white font-[600] group hover:scale-110 duration-200 flex'>Note App <span className='group-hover:hidden'>📔</span> <span className='hidden group-hover:flex'>📖</span></Link>
            {dataUserStorage ? 
                <div className='flex'>
                    <p className='max-w-[200px] text-ellipsis overflow-hidden text-[40px] max-md:text-[30px] max-sm:text-[25px] text-white font-[600] font-poppins mr-[20px]'>{dataUser?.name}</p>
                    <div onClick={() => Exit()} className='flex flex-col justify-center mr-[20px]'>
                        <Link href={'/login'} className='group w-full bg-[#f43838] px-[10px] max-sm:px-[5px] py-[3px] max-sm:py-[1px]  text-[25px] max-sm:text-[20px] outline-none rounded-[4px] text-white duration-300 hover:scale-110'>
                            <p className='relative after:w-[0%] he after:h-[2px] leading-6 font-[600] after:bg-white after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Sair</p>
                        </Link>
                    </div>
                </div>
            : 
                <div className='flex'>
                    <div className='flex flex-col justify-center mr-[20px]'>
                        <Link href={'/cadastrar'} className='group w-full bg-[#eb4848] px-[10px] max-sm:px-[5px] py-[8px] max-sm:py-[5px] text-[25px] max-sm:text-[20px] outline-none rounded-[4px] text-white duration-300 hover:scale-110'>
                            <p className='relative after:w-[0%] he after:h-[2px] leading-5 after:bg-white after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Cadastrar</p>
                        </Link>
                    </div>

                    <div className='flex flex-col justify-center mr-[20px]'>
                        <Link href={'/login'} className='group w-full outline-1 outline-white px-[10px] max-sm:px-[5px]  py-[3px] max-sm:py-[1px]  text-[25px] max-sm:text-[20px] outline-none rounded-[4px] text-white duration-300 hover:scale-110'>
                            <p className='relative after:w-[0%] he after:h-[2px] leading-6 after:bg-white after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Logar</p>
                        </Link>
                    </div>
                </div>
            }
        </div>
    </section>
  )
}

export default Page