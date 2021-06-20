const Sequelize=require('sequelize');
module.exports =new Sequelize('postgresql://localhost:5432/codegig',{
    dialect:'postgres',
    logging: false,
});