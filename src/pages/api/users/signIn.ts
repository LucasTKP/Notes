import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function SignIn(req:NextApiRequest, res:NextApiResponse ) {
    const prisma = new PrismaClient()
    
    const { email, password} = req.body
    try{
        const result = await prisma.user.findMany({
            where: {
              email: email
            }
        })

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, function(err:Error, igual: any) {
                if (err) {
                    res.status(201).send({msg: "Senha incorreta!"})
                    throw err
                }
                if (!igual) {
                    res.status(201).send({msg: "Senha incorreta!"})
                    throw err
                } 
    
                const token = jwt.sign({id: result[0].id}, process.env.TOKEN_PASS, {
                    expiresIn: '1d'
                })
                res.status(200).json({msg: 'Usuario logado com sucesso!', result: result, token: token})
            })
        }
        
        if (result.length === 0) {
            res.status(201).send({msg: "Email não cadastrado!"})
        }
    } catch(e){
        console.log(e)
        res.status(201)
    }
}

export default SignIn
