// Create web server
// 1. Create a web server
// 2. Create a route for GET /comments
// 3. Create a route for POST /comments
// 4. Create a route for GET /comments/:id
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id
// 7. Listen on port 3000

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const commentsPath = 'comments.json';

app.use(bodyParser.json());

app.get('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }
    res.send(JSON.parse(data));
  });
});

app.post('/comments', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }
    const comments = JSON.parse(data);
    const newComment = req.body;
    newComment.id = comments.length;
    comments.push(newComment);
    fs.writeFile(commentsPath, JSON.stringify(comments), err => {
      if (err) {
        res.status(500).send({ error: err });
        return;
      }
      res.send(newComment);
    });
  });
});

app.get('/comments/:id', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }
    const comments = JSON.parse(data);
    const comment = comments.find(comment => comment.id === parseInt(req.params.id));
    if (!comment) {
      res.status(404).send({ error: `Comment with id ${req.params.id} not found` });
      return;
    }
    res.send(comment);
  });
});

app.put('/comments/:id', (req, res) => {
  fs.readFile(commentsPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ error: err });
      return;
    }
    const