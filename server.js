const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
app.use(function(req,res,next){
  var now = new Date().toString();
  var logData = `${now}: ${req.method} ${req.url}`;
  console.log(logData);
  fs.appendFile('server.log',logData + '\n',function(err){
      if(err) {console.log(err);}
      next();
  });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',function(){
    return new Date().getFullYear();
});

hbs.registerHelper('toUpper',function(text){
    return text.toUpperCase();
});

app.get('/',function(req,res){

    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Welcome to Website.'
      });
});


 app.get('/about',function(req,res){
 
    res.render('about.hbs',{
        pageTitle:'About Page ',
        welcomeMessage:'A description about this website.'
    });
  });

app.get('/home',function(req,res){
    res.render('home.hbs',{
        pageTitle:'Home page',
        welcomeMessage:'Welcome to Website.'
      
    });
  });

 app.get('/myProjects2',function(req,res){
    res.render('myprojects.hbs',{
        pageTitle:'My Projects Page',
        welcomeMessage:'Welcome to My project'
    });
  });

app.listen(port,function(msg){
    console.log(`Server is up ......on port ${port}`);
});