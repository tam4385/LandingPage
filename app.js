
//requiring the neccessary external packages
const express = require('express');
const path = require('path');
const colors = require('colors');

//adding the project data to the app
const data = require('./data/data.json').data;
const projectData = data.projects

//app route
const app = express();

//listening port
app.listen(3000);

//view engine set to pug
app.set('view engine', 'pug')

//setting up static routes to access public directory
app.use('/static', express.static(path.join(__dirname, 'public')));

//home route
app.get('/', (req, res) => {
    res.locals.projects = projectData;  
    res.render('index', {projects: res.locals.projects
    }
    );
    console.log('App is up and running on port 3000.'.green)
});

//about page route
app.get('/about', (req, res) => {
    res.render('about');
});

//setting up project pages
app.get('/projects/:id', (req, res) => {
    //capture route params in query variable
    const query = req.params.id
    res.locals.project = projectData[query]
    res.render('project')
});

//adding static style sheets
app.use('/static/css', express.static('public'))

// error middleware to capture 404 and 500 errors
app.use((req, res, next) => {
    const err = new Error('Oppsie Daisy. Page not found.');
    res.locals.error = err
    err.status = 404;
    res.render('error')
});

app.use((err, req, res, next) => {
    res.locals.error = err
    console.log(`An error has occured: ${err.status}`.red);
    res.render('error') 
});

