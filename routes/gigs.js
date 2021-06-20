const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize=require('sequelize');
const Op=Sequelize.Op;

//get gig list
router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs', {
                gigs: gigs
            });
        })
        .catch(err => console.log(err));
});

// Display add gig form
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a gig
router.post('/add', (req, res) => {
    let { title, technologies, budget, description, email } = req.body;
    let errors = [];

    // Validate fields
    if (!title) {
        errors.push({ text: 'Please add a title' })
    }

    if (!technologies) {
        errors.push({ text: 'Please add some technologies' })
    }

    if (!description) {
        errors.push({ text: 'Please add a a description' })
    }

    if (!email) {
        errors.push({ text: 'Please add a contact email' })
    }

    // Check for errors
    if (errors.length > 0) {
        res.render('add',{
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            email
        });
    } else {
        if(!budget){
            budget='Unknown';
        }else{
            budget=`${budget}$`;
        }

        // Make lowercase and remove space after comma
        technologies=technologies.toLowerCase().replace(/,/g,',');

        // Insert
        Gig.create({
            title,
            technologies,
            description,
            budget,
            email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err));
    }


});

// Search for gigs
router.get('/search',(req,res)=>{
   const {term}= req.query;
   console.log(req.query);
    Gig.findAll({where:{technologies:{[Op.like]:`%React%`}}})
    .then(gigs=>res.render('gigs',{gigs}))
    .catch(err=> console.log(err));
});

module.exports = router;