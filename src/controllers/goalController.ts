import { Task } from '../models/Task';
import { RequestHandler } from "express";


export const getTasks: RequestHandler = async (req, res, next) => {
    let tasks = await Task.findAll();
    res.status(200).json(tasks);
}

export const createTask: RequestHandler = async (req, res, next) => {
    let newTask: Task = req.body;
    if (newTask.title) {
        let created = await Task.create({title: newTask.title, completed: false});
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
}

export const updateTask: RequestHandler = async (req, res, next) => {
  let taskId = req.params.id;
  let newTask: Task = req.body;
  
  let taskFound = await Task.findByPk(taskId);
  
  if (taskFound && taskFound.id == newTask.id
      && newTask.title) {
          await Task.update(newTask, {
              where: { id: taskId }
          });
          res.status(200).json();
  }
  else {
      res.status(400).json();
  }
}

export const deleteTask: RequestHandler = async (req, res, next) => {
  let taskId = req.params.id;
  let taskFound = await Task.findByPk(taskId);
  
  if (taskFound) {
      await Task.destroy({
              where: { id: taskId }
      });
      res.status(200).json();
  }
  else {
      res.status(404).json();
  }
}