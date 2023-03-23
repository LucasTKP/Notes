import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcryptjs')

async function CreatedNotes(req:NextApiRequest, res:NextApiResponse ) {
    const prisma = new PrismaClient()
    const {title, text, id_user} = req.body

    try{
        await prisma.notes.create({
            data: {
              title: title.trim(),
              text: text.trim(),
              id_user: id_user
            },
          })
        return res.status(200).send({msg:'Nota criada'})
    }catch(e){
        console.log(e)
        return res.status(201).send({msg:'Não foi possivel criar sua nota.'})
    }
}

export default CreatedNotes