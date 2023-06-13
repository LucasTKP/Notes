'use client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Form() {
  const [eyeOff, setEyeOff] = useState<boolean>(true)
  const [dataUser, setDataUser] = useState<{name:string, email:string, password:string}>({name:'', email:'', password:''})
  const router = useRouter()

  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('user')
      if(dataLocalStorage){
          router.replace('/')
          toast.info('Você ja está logado.')
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function SignUp(){
    const pageUrl = window.location.origin
    var data 
    try{
      data = await axios.post(pageUrl + '/api/users/signUp', dataUser)
      router.replace('/login')
    } catch(e){
      throw toast.error(data?.data?.msg)
    }

  }

  function OnToast(e: { preventDefault: () => void; }){
    e.preventDefault()
    toast.promise(SignUp(),{pending:'Criando usuário...', success:'Usuário criado com sucesso!'})
  }
  
  return (
    <form onSubmit={OnToast} className='flex flex-col max-sm:mt-[10px]'>
        <ToastContainer />
        <input required maxLength={20} onChange={(text) => setDataUser({...dataUser, name:text.target.value})} className='w-full outline-none border-b-[2px] border-b-[#b7b5b5] px-[5px] text-[25px] font-poppins' placeholder='Nome' />

        <input required type='email' onChange={(text) => setDataUser({...dataUser, email:text.target.value})} className='mt-[20px] w-full outline-none border-b-[2px] border-b-[#b7b5b5] px-[5px] text-[25px] font-poppins' placeholder='Email' />

        <div className='border-b-[2px] border-b-[#b7b5b5] px-[5px] flex items-center  mt-[20px] '>
          <input  min={8} required  onChange={(text) => setDataUser({...dataUser, password:text.target.value})} type={eyeOff ? 'password' : 'text'} className='w-full outline-none text-[25px] font-poppins mr-[10px]' placeholder='Senha' />

          {eyeOff ? 
            <EyeClosedIcon width={35} height={20} onClick={() => setEyeOff(false)} className="cursor-pointer" /> 
          :  
            <EyeOpenIcon width={35} height={20} onClick={() => setEyeOff(true)} className="cursor-pointer" />}
        </div>

        <button className='font-poppins mt-[25px] self-center group bg-[#e8e6e6] px-[20px] py-[8px] text-[25px] max-sm:text-[20px]  outline-none rounded-[4px] text-black duration-300 hover:scale-110'>
            <p className='relative after:w-[0%] after:h-[1px] leading-6 after:bg-black after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Cadastrar</p>
        </button>
    </form>
  )
}

export default Form