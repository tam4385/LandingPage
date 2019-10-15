const express = require('express');
const pug = require('pug');


const data = require('./data/data.json').data;
const projectData = data.projects


const app = express();

app.listen(3000);

app.set('view engine', 'pug')

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

app.get('/:id', (req, res) => {
    const params = req.params;
    res.locals.project = projectData[params];
    res.locals.title = projectData[params.id].project_name;
    res.locals.description = projectData[params.id].description;
    res.locals.technologies = projectData[params.id].technologies;
    res.locals.image1 = projectData[params.id].image_urls[1];
    res.locals.image2 = projectData[params.id].image_urls[2];
    //console.log(res.locals.image1);
    res.render('project', {title: res.locals.title,
        description: res.locals.description,
        technologies: res.locals.technologies,
        image1: res.locals.image1,
        image2: res.locals.image2});
});


app.use('/static/css', express.static('public'))


