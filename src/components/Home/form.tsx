'use client'
import React, { useEffect, useState, useContext } from 'react'
import { Notes, DataUser } from '../../types/interfaces'
import axios from 'axios'
import { toast } from 'react-toastify'
import styles from '../../app/general.module.css'
import AppContext from '@/app/appContext';
import { useRouter } from 'next/navigation'


function Form() {
  const [dataNote, setDataNote] = useState<Notes>({title:'', text:'', id_user:''})
  const [notes, setNotes] = useState<Notes[]>([])
  const contextUser = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    const dataUserStorage = localStorage.getItem('user')
    if(dataUserStorage){
      const dataLocalStorageJSON = JSON.parse(dataUserStorage)
      GetNotes(dataLocalStorageJSON)
      setDataNote({...dataNote, id_user: dataLocalStorageJSON.id})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  async function GetNotes(dataLocalStorage: DataUser){
    const pageUrl = window.location.href
    if(dataLocalStorage){
      const data = await axios.post(pageUrl + '/api/notes/getNotes', {id:dataLocalStorage.id})
      if(data.status === 200){
        setNotes(data.data)
      }

      if(data.status != 200){
        console.log(data)
        throw toast.error(data.data.msg)
      }
    }
  } 

  async function CreatedNotes(){
    const pageUrl = window.location.href
    const data = await axios.post(pageUrl + 'api/notes/createdNotes', dataNote)
    if(data.status != 200){
      console.log(data)
      throw toast.error(data.data.msg)
    }

    setNotes(notes => [...notes, dataNote])
    setDataNote({...dataNote, title:'', text:''})
  } 

  function OnToast(e: { preventDefault: () => void; }){
    e.preventDefault()
    toast.promise(CreatedNotes(),{pending:'Criando nota...', success:'Nota criada com sucesso!'})
  }

  return (
    <div>
      <form onSubmit={OnToast} className='flex flex-col mt-[20px] max-sm:mt-[10px]'>
          <input value={dataNote.title} required minLength={3} maxLength={20} onChange={(text) => setDataNote({...dataNote, title:text.target.value})}  className='w-full outline-none border-b-[2px] border-b-black px-[5px] text-[25px] font-poppins' placeholder='Titúlo' />
          <textarea value={dataNote.text} required minLength={3} maxLength={20} onChange={(text) => setDataNote({...dataNote, text:text.target.value})} className='w-full border-[2px] border-black mt-[15px] text-[22px] rounded-[4px] px-[5px]' placeholder='Conteúdo da nota' rows={6}></textarea>
          <button onClick={() => contextUser?.dataUser?.id ? '' : router.push('/login')} className='font-poppins mt-[15px] self-center group bg-[#e8e6e6] px-[10px] py-[8px] text-[25px] max-sm:text-[20px] outline-none rounded-[4px] text-black duration-300 hover:scale-110'>
              <p className='relative after:w-[0%] after:h-[1px] leading-6 after:bg-black after:block after:absolute after:left-0 group-hover:after:w-[100%] after:duration-300'>Adicionar</p>
          </button>
      </form>
      <div className='pb-[20px]'>
        {notes.length > 0 ? <p className='text-center text-[40px] max-md:text-[30px] font-poppins font-[400] leading-10 mt-[25px] border-[2px] border-[#f7c036] rounded-t-[8px] bg-[#f7c036]'>Notas</p> : <></>}
        {notes?.map((note, index) => {
          return(
            <div key={index}  className={`w-full h-[180px] bg-[#fae2bd] pr-[5px] rounded-b-[8px]  ${index != 0 ? 'mt-[20px] rounded-t-[8px]' : ''} `}>
                <div id={styles.boxTextNotes} className='overflow-auto h-full px-[5px]'>
                <p className='text-[25px] ml-[10px] overflow-hidden whitespace-nowrap text-ellipsis text-center'>{note.title}</p>
                <p className='text-[22px] ml-[10px] whitespace-pre-wrap overflow-hidden text-ellipsis'>{note.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Form