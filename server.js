const express = require('express');
const hbs = require('hbs');
const os = require('os');
const fs = require('fs');


var user = os.userInfo();
// var year = new Date().getFullYear()
var app = express();


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
})
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;

    console.log(log);
    fs.appendFile('server.log',log + '\n',(err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/' , (req,res) => {
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMessage:`Hello ${user.username}, welcome to our Home Page!`,
        // currentYear: year
    })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About PAge',
        // currentYear: year
    })
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000');
});


// const express = require('express') 
// const app = express() 
// const port = 3000 
// app.get('/', (req, res) => res.send('Hello World!')) 
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))