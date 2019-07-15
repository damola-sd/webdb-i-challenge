const express = require('express');

const db = require('./data/helpers/accountDB');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.json('Testing first endpoints');
});

server.get('/accounts', async (req, res, next) => {
    try {
        const accounts = await db.get();
        if (accounts) {
            res.status(201).json(accounts)
        }
    } catch (error) {
        next(new Error(error));
    }
})

server.get('/accounts/:id', async (req, res, next) => {
    try {
        const account = await db.getById(req.params.id);
        if (account) {
            res.status(201).json(account)
        }
    } catch (error) {
        next(new Error(error));
    }
})

server.post('/accounts', async (req, res, next) => {
    try {
        const newAccount = await db.add(req.body);
        if (newAccount) {
            res.status(201).json(newAccount)
        }
    } catch (error) {
        next(new Error(error));
    }
})

server.put('/accounts/:id', async (req, res, next) => {
    try {
        const updateAccount = await db.update(req.params.id, req.body);
        if (updateAccount) {
            const newAccount = await db.getById(req.params.id);
            res.status(201).json(newAccount);
        }else {
            res.status(404).json({
                message: 'Could not update that account'
            })
        } 
    } catch (error) {
        next(new Error("Something's happened."))
    }
})

server.use(function errorHandler(err, req, res, next) {
    console.error('ERROR:', err);
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  });

module.exports = server;