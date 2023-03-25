import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'
async function DeletNotes(req:NextApiRequest, res:NextApiResponse ){
    const prisma = new PrismaClient()
    const { id } = req.body
    try{
      const result = await prisma.notes.delete({
        where: {
          id: id,
        },
      })
      console.log(result)
      res.status(200).send({msg:"Nota deletada com sucesso."})
    }catch(e){
      res.status(201).send({msg:"Não foi possivel deletar sua nota."})
    } 

}

export default DeletNotes