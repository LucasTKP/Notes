'use client'
import React, {useEffect, useState} from 'react';
import "../../styles/globals.css";
import Header from './Header/page'
import { Hubballi, Poppins } from 'next/font/google'
import { DataUser } from '../types/interfaces'
import AppContext from './appContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const hubballi = Hubballi({
  display: 'swap',
  weight: ['400'],
  variable: '--font-hubballi',
})

const poppins = Poppins({
  display: 'swap',
  weight: ['400'],
  variable: '--font-poiretOne',
})

export default function RootLayout({ children }: {children: React.ReactNode}) {
  const [dataUser, setDataUser] = useState<DataUser>()

  useEffect(() => {
    if(!dataUser){
      const dataUserStorage = localStorage.getItem('user')
      if(dataUserStorage){
        setDataUser(JSON.parse(dataUserStorage))
      }
    }
  },[dataUser])

  return (
    <html lang="pt-BR" className={` max-w-screen w-full h-full`}>
        <body className={`${hubballi.variable} ${poppins.variable} w-full h-full font-hubballi`}>
        <AppContext.Provider value={{dataUser, setDataUser}}>
            <ToastContainer />
            <Header />
            {children}
        </AppContext.Provider>
        </body>
    </html>
  )
}
