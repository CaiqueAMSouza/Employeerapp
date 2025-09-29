const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Employee = sequelize.define('Employees', {
    name: {
        type: DataTypes.TEXT,
        require: true
    },
    email: {
        type: DataTypes.TEXT,
        require: true
    },
    phone: {
        type: DataTypes.TEXT,
        require: true
    },
})


module.exports = Employee
