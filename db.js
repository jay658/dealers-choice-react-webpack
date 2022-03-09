const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL|| 'postgres://localhost/webpack_db')

const Show = db.define('show', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    platform:{
        type: Sequelize.ENUM('netflix', 'prime video', 'disney plus'),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
})

module.exports = {
    db, Show
}