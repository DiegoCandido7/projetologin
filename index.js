require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const port = process.env.PORT
const dbhost = process.env.DBHOST
const dbpassword = process.env.DBPASSWORD 
const dbnome = process.env.DBNOME
const dbuser = process.env.DBUSER 

const app = express()
const conexao = mysql.createConnection({host: dbhost, database: dbnome, password: dbpassword, user: dbuser})

app.use(express.json())

app.get('/', (req, res)=>{
    const sql = `select * from pessoa`
    conexao.query(sql, (erro, retorno)=>{
        if(erro) throw erro;
        res.json(retorno)
    })
})

app.post('/cadastrar',(req, res)=>{
    const nome = req.body.nome
    const idade = req.body.idade
    const sql = `insert into pessoa (nome, idade) values("${nome}", ${idade})`
    conexao.query(sql, (erro, retorno)=>{
        if(erro) throw erro;
        res.json(retorno)
    })
})

app.put('/atualizar', (req, res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const idade = req.body.idade
    const sql = `update pessoa set nome = "${nome}", idade = ${idade} where id = ${id}`
    conexao.query(sql, (erro, retorno)=>{
        if(erro) throw erro;
        res.json(retorno)
    })
})

app.delete('/deletar', (req, res)=>{
    const id = req.body.id
    const sql = `delete from pessoa where id = ${id}`
    conexao.query(sql, (erro, retorno)=>{
        if(erro) throw erro;
        res.json(retorno)
    })
})

app.listen(port, ()=>{
    console.log('sucesso')
})