import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

async function GetNotes(req:NextApiRequest, res:NextApiResponse ) {
    const prisma = new PrismaClient()
    try{
        const result = await prisma.notes.findMany({
            orderBy: 
                {
                  createdDate: 'desc',
                },
            where: {
                id_user: + req.body.id
            }
        })
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(201).send(e)
    }


}

export default GetNotes