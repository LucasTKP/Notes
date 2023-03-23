import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcryptjs')

async function SignUp(req:NextApiRequest, res:NextApiResponse ) {
    const prisma = new PrismaClient()
    
    const { name, email, password} = req.body

    const hashSenha = await bcrypt.hash(password, 8)
    
    const result = await prisma.user.findMany({
        where: {
          email: email,
          name: name 
        }
    })

    if (result.length > 0) {
        return res.status(201).send({msg: 'Este usuário já foi cadastrado'})
    } else {
        try{
            await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashSenha
                },
            })
              return res.status(200).send({msg:'Usuário Cadastrado com sucesso!'})
        } catch(e){
            console.log(e)
        }


    }
}

export default SignUp