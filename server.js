const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;
//hbs--declare partial
hbs.registerPartials(__dirname + '/views/partials');

//app.set()
//set view engine
app.set('view engine','hbs');

//middleware --that will logs our request url 
app.use(function(req,res,next){
  var now = new Date().toString();
  var logData = `${now}: ${req.method} ${req.url}`;
  console.log(logData);
  fs.appendFile('server.log',logData + '\n',function(err){
      if(err) {console.log(err);}
      next();
  });
});

//middleware with out next function called--to show only maintenance page 
//since calling middleware function without next method causes next line of codes not to be run 
// app.use(function(req,res,next){
//     res.render('maintenance.hbs');
// });


app.use(express.static(__dirname + '/public'));//now does not shows help.html because we call this method after maintenance middleware func

//hbs --registerHelper--to register our functions
hbs.registerHelper('getCurrentYear',function(){
    return new Date().getFullYear();
});

//to upperCase hbs-helper
hbs.registerHelper('toUpper',function(text){
    return text.toUpperCase();
});

//root route '/' or default/ home page
app.get('/',function(req,res){

    // res.send('<h1>Hello Express</h1>');
    //sending object --express will handles all transformation into a json data 
    // res.send({
    //     name:'Hana',
    //     likes:['reading bible','praying','singing church songs']
        

    // });

    res.render('home.hbs',{
        pageTitle:'Home page',//passing data to dynamically render in hbs page
        welcomeMessage:'Welcome to Website.'
      
    });//render template we set in the view engine
    
   
});//end-root route 

 //  '/about' route
 app.get('/about',function(req,res){
    // res.send('<h1>About Page</h1>'); 

    res.render('about.hbs',{
        pageTitle:'About Page ',//passing data to dynamically render in hbs page
        welcomeMessage:'A description about this website.'
    });//render template we set in the view engine
  });

//home route using hbs view engine
app.get('/home',function(req,res){

    // res.send('<h1>About Page</h1>'); 
    res.render('home.hbs',{
        pageTitle:'Home page',//passing data to dynamically render in hbs page
        welcomeMessage:'Welcome to Website.'
      
    });//render template we set in the view engine
  });

   //  '/projects' route
 app.get('/projects',function(req,res){
    res.render('Projects.hbs',{
        pageTitle:'Projects Page',
        welcomeMessage:'Welcome to My project'
    });
  });

    //  '/order' route
 app.get('/order',function(req,res){
    res.send('<h1>Order Informations</h1>');
  });

      //  '/bad' route
 app.get('/bad',function(req,res){

    // res.send('<h1>Bad Request 1</h1>');
    res.send({
        errorMessage:'Bad Request 2'
    });
  });
app.listen(port,function(msg){
    console.log(`Server is up ......on port ${port}`);
});