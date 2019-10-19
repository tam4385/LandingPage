const express = require('express');
const path = require('path');


const data = require('./data/data.json').data;
const projectData = data.projects


const app = express();

app.listen(3000);

app.set('view engine', 'pug')

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.locals.projects = projectData;
    //console.log(res.locals.projects)  
    res.render('index', {projects: res.locals.projects
    }
    );
    console.log('App is up and running.')
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const query = req.params.id
    res.locals.project = projectData[query]
    res.locals.title = projectData[query].project_name
    res.locals.description = projectData[query].description
    res.locals.technologies = projectData[query].technologies
    res.locals.image1 = projectData[query].image_urls[1]
    res.locals.image2 = projectData[query].image_urls[2]
    console.log(res.locals.image1)
    res.render('project')
});


app.use('/static/css', express.static('public'))

app.use((req, res, next) => {
    const err = new Error('Oppsie Daisy. Page not found.')
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    // const err = new Error('Oops, somthing is not quite right here.')
    res.locals.error = err
    res.render('error') 
    next(err);
});

