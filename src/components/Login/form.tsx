'use client'
import React, { useState, useContext, useEffect } from 'react'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import AppContext from '@/app/appContext';

function Form() {
  const [eyeOff, setEyeOff] = useState(true)
  const [dataUser, setDataUser] = useState<{email:string, password:string}>({email:'', password:''})
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const contextUser = useContext(AppContext)


  useEffect(() => {  
    const dataUserStorage = localStorage.getItem('user')
    if(dataUserStorage){
      toast.info('Você ja está logado.')
      return router.push('/')
    }
    setLoading(true)
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

  async function SignIn(){
    const data = await axios.post('http://localhost:3000/api/users/signIn', dataUser)
    if(data.status !== 200){
      throw toast.error(data.data.msg)
    } else {
      contextUser.setDataUser(data.data.result[0])
      localStorage.setItem('user', '')
      localStorage.setItem('user', JSON.stringify(data.data.result[0]))
      return router.push('/')
    }
  }

  function OnToast(e: { preventDefault: () => void; }){
    e.preventDefault()
    toast.promise(SignIn(),{pending:'Fazendo Login...', success:'Usuário logado com sucesso!'})
  }

  if(!loading) return <></>
  return (
    <form onSubmit={OnToast} className='flex flex-col max-sm:mt-[10px]'>
        <ToastContainer />
        <input required onChange={(text) => setDataUser({...dataUser, email:text.target.value})} className='w-full outline-none border-b-[2px] border-b-[#b7b5b5] px-[5px] text-[25px] font-poppins' placeholder='Email' />

        <div className='border-b-[2px] border-b-[#b7b5b5] px-[5px] flex items-center  mt-[20px] '>
          <input min={8} required onChange={(text) => setDataUser({...dataUser, password:text.target.value})} type={eyeOff ? 'password' : 'text'} className='w-full outline-none text-[25px] font-poppins mr-[10px]' placeholder='Senha' />

          {eyeOff ? 
            <EyeClosedIcon width={35} height={20} onClick={() => setEyeOff(false)} className="cursor-pointer" /> 
          :  
            <EyeOpenIcon width={35} height={20} onClick={() => setEyeOff(true)} className="cursor-pointer" />}
        </div>

        <button className='font-poppins mt-[25px] self-center group bg-[#e8e6e6] px-[20px] py-[8px] text-[25px] max-sm:text-[20px]  outline-none rounded-[4px] text-black duration-300 hover:scale-110'>
            <p className='relative after:w-[0%] after:h-[1px] leading-6 after:bg-black after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Logar</p>
        </button>
    </form>
  )
}

export default Form