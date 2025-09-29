const express = require('express')
const route = express.Router()
const Employee = require('../database/model/Employees.js')
const {Op} = require('sequelize')

route.get('/', (req, res) => {
    res.send("Dae Caíque")
})



//create
route.post('/employee/create', (req, res) => {

   try {

        const {name, email, phone} = req.body


        if (
            name &&
            email &&
            phone 
        ) {


            const newEmployee = Employee.create({
                name,
                email,
                phone
            })

            if (newEmployee) res.json({ message: `Funcionário cadastrado com sucesso!`, status: 'success' })
            else throw new Error('Todos os campos devem estar preenchidos para que o usuário possa ser cadatsrado!')
        }

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }


})

//findAll
route.get('/employee', async (req, res) => {

    try {
        const employees = await Employee.findAll()

        const allEmployees = employees.map(f => f.toJSON())

        res.json({ value: allEmployees })

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }
})

//findOneId
route.get('/employee/id/:id', async (req, res) => {

    try {
        const { id } = req.params

        if (id) {
            const employees = await Employee.findByPk(id)

            res.json({ value: employees.toJSON() })
        }

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }

})

//findAllName
route.get('/employee/name/:name', async (req, res) => {

    try {
        const { name } = req.params

        if (name) {

            const employees = await Employee.findAll({ 
                where: { name: { [Op.like]: `%${name}%` },},
            })

            const allEmployees = employees.map(f => f.toJSON())

            res.json({ value: allEmployees })
        }
        else throw new Error('O campo de nome está vazio! Preencha o campo para buscar o funcionário especificado...')

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }

})



//removeOne
route.post('/employee/remove/:id', async (req, res) => {

    try {
        const { id } = req.params

        const employee = await Employee.destroy({ where: { id } })

        if (employee) res.json({ message: 'Funcionário excluído com sucesso!', status: 'success' })

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }

})

//update
route.post('/employee/update', async (req, res) => {
    try {
        const { id, name, email, phone } = req.body
        if (!id) throw Error("É necessário que haja o ID do usuário para que ele possa ser editado!")

        if (
            name &&
            email &&
            phone
        ) {
            const employee = await Employee.update({ name, email, phone }, { where: { id } })

            if (employee) res.json({ message: 'Funcionário editado com sucesso!', status: 'success' })
        }
        else throw Error("Todos os campos devem ser preenchidos para que o usuário possa ser editado!")

    } catch (error) {
        res.json({ message: error.message, status: 'error' })
    }
})


module.exports = route