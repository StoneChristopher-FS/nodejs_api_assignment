const express = require("express")
const res = require("express/lib/response")
require("dotenv").config()

const {
    todoService,
    todoServiceById
} = require("./services/todoService")

const app = express()

// for localhost:3000/
app.get("/", (req, res, next) => {
    res.status(200).send("Service is UP!!")
})

// get external service
// http://localhost:3000/todo
app.get("/todo", (req, res, next) => {
    todoService()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(501).json({
        error: {
            message: err.message, 
            status: err.status
        }
    }))
})

// get external service by ID
// http://localhost:3000/todo/56
app.get("/todo/:id", (req, res, next) => {
    const todoId = req.params.id
    todoService(todoId)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(err.status || 501).json({
        error: {
            message: err.message,
            status: err.status,
            method: req.method
        }
    }))
})

// middleware modules for error handling
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!!");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message, 
            status: error.status,
            method: req.method
        }
    });
})


app.listen(process.env.port, () => {
    console.log(`Server starting on port ${process.env.port}`)
})