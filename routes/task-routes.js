const express = require('express');
const router  = express.Router();
const Task    = require('../models/Task')

router.get('/tasks', (req, res, next) => {
  
  Task.find()
  .then((allTheTasks)=> {
    res.json(allTheTasks)
  })
  .catch((err)=> {
    res.json(err)
  })
});

router.get('/tasks/details/:id', (req, res, next)=> {
  Task.findById(req.params.id)
  .then((theTask)=> {
    res.json(theTask)
  })
  .catch((err)=> {
    res.json(err)
  })
})

router.post('/tasks/add-new', (req, res, next)=> {
  Task.create({
    title: req.body.theTitle,
    description: req.body.theDescription
  })
  .then((theThingIAmGettingBack)=> {
    res.json(theThingIAmGettingBack)
  })
  .catch((err)=> {
    res.json(err)
  })
})

router.post('/tasks/edit/:id', (req, res, next)=> {
  Task.findByIdAndUpdate(req.params.id, {
    title: req.body.theTitle,
    description: req.body.theDescription
  })
  .then((theThingIAmGettingBack)=> {
    res.json([{message: 'this task has been successfully updated'}], theThingIAmGettingBack)
  })
  .catch((err)=> {
    res.json(err)
  })
})

router.post('/tasks/delete/:id', (req, res, next)=> {
  Task.findByIdAndRemove(req.params.id)
  .then((deletedTask)=> {
    if(!deletedTask) {
      res.json({message: 'sorry this task could not be found'})
    }
    res.json([
      {message: 'task successfully deleted'},
      deletedTask
    ])
  })
  .catch((err)=> {
    res.json(err)
  })
})

module.exports = router;