const Sequelize=require('sequelize');

const db=require('../config/database');

const Gig= db.define('gig',{
    title:{
        type:Sequelize.STRING
    },
    technologies:{
        type:Sequelize.STRING
    },
    description:{
        type:Sequelize.STRING
    },
    budget:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    // created_at:{
    //     type:Sequelize.DATE
    // },
    // updated_at:{
    //     type:Sequelize.DATE
    // }

});

module.exports=Gig;