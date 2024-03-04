const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const db =require('./db');
const { link } = require('fs');

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



app.get('/api/manga', async (req, res) => {
    const manga = await db('manga').select('*');
    return res.json(manga);
  });

app.get('/api/manga/:id', async (req, res) => {
    const { id } = req.params;
    const manga = await db('manga').select('*').where({ id:id, }).first();
    return res.json({data:manga});
})

app.post('/api/manga', async (req, res) => {
    const { title, author, chapter, link } = req.body;
    const manga = await db('manga').insert({ title:title, author:author, chapter:chapter, link:link, }).returning(['id']);
    return res.json({message:'Manga added', data:{id:manga[0].id, title:title, author:author, chapter:chapter, link:link}});
  });

app.put('/api/manga/:id', async (req, res) => {
  const { id } = req.params;
    const { title, author, chapter, link } = req.body;
    await db('manga').where({ id:id }).update({ title:title, author:author, chapter:chapter, link:link, });
    return res.json({message:'Manga updated', data:{id:id, title:title, author:author, chapter:chapter, link:link, }});
  });

app.delete('/api/manga/:id', async (req, res) => {
  const { id } = req.params;
    await db('manga').where({ id:id }).del();
    return res.json({message:'Manga deleted'});
  });
//end api
app.get('/', async (req, res) => {
    const manga = await db('manga').select('*');
  return res.render('index', { manga });
})

app.get('/:id', async(req, res) => {
  const { id } = req.params;
  const manga = await db('manga').select('*').where({ id:id, }).first();
  return res.redirect('/');
})

app.post('/', async (req, res) => {
    const { title, author, chapter, link } = req.body;
    const manga = await db('manga').insert({ title:title, author:author, chapter:chapter, link:link, }).returning(['id']);
    return res.redirect('/');
})
//belum lancar
app.put('/', async (req, res) => {
    const { id } = req.params;
    const { chapter } = req.body;
    const manga = await db('manga').where({ id:id }).update({ chapter:chapter});
    return res.redirect('/');
})

app.delete('/', async (req, res) => {
    const { id } = req.params;
    await db('manga').where({ id:id }).del();
    return res.redirect('/');
})


app.get('/user', (req, res) => {
  return res.render('user', )
});

app.post('/user', async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect('/');
})

app.get('/signup', (req, res) => {
  return res.render('signup', )
});

app.post('/signup', async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect('/');
})

  app.listen(3011, () => {
    console.log('Listening on port 3011');
});
