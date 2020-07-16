var express = require('express');
var router = express.Router();
const fs = require('fs');

const getQuestions = () => {
    let rawdata = fs.readFileSync('questions.json');
    let questions = JSON.parse(rawdata);
    return questions;
}

router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/questions', function(req, res, next) {
    let questions = getQuestions();
    console.log(questions)
    res.send(questions.questions);
});

router.get('/questions:id', function(req, res, next) {
    res.send('this is one specific question');
});

router.post('/questions', function(req, res, next) {
    res.send('This is the post route');
});

router.put('/questions:id', function(req, res, next) {
    res.send('This is the put route');
});

router.get('/questions:id', function(req, res, next) {
    res.send('This is the delete route');
});

module.exports = router;