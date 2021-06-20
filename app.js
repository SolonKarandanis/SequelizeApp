const express=require('express');
const handleBars=require('express-handlebars');
const bodyParser=require('body-parser');
const path=require('path');

const db=require('./config/database');

//Test db connection
db.authenticate()
.then(()=> console.log('Db connected'))
.catch(err=> console.log(err));

const app= express();

// Handlebars
app.engine('handlebars',handleBars({defaultLayout:'main'}));
app.set('view engine','handlebars');

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));

// Set static folder
app.use(express.static(path.join(__dirname,'public')));

const PORT=process.env.PORT | 5000;

app.get('/',(req,res)=>{
    res.render('index',{layout:'landing'});
});

// Gig routes
app.use('/gigs',require('./routes/gigs'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));