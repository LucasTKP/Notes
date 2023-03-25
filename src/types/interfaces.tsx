

  export interface DataUser{
    id?:string
    name?:string 
    email?:string
    password?:string
  }

  export interface ContextUser{
    dataUser:DataUser | undefined,
    setDataUser:(x:DataUser) => void
  }

  export interface Notes{
    id:number
    title:string
    text:string
    id_user:string
    createdDate?:Date
  }

