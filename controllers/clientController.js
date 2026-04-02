const fs = require('fs');
const path = require('path');
const bycrypt = require('bcrypt');
const { sendResponse } = require('../utils/response');

const dbPath = path.join(__dirname, '../database.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');

exports.getAllClients = (req, res, next) => {
  try{ 
    const db = readDB();
    send(res, 200, 'clients retrieved successfully', db.clients);
    } catch (error) {
    next(error);
  }
};

exports.getClientById = (req, res, next) => {
  try {
    const db = readDB();
    const client = db.clients.find(c => c.id === parseInt(req.params.id));
    if (!client) {
      const error = new Error('Client not found');
      error.status = 404;
      throw error;
    }
    send(res, 200, 'client retrieved successfully', client);
  } catch (error) {
    next(error);
  } 
};

exports.createClient = async(req, res, next) => {
    try {
        const db = readDB();
        const { email, password, name } = req.body;
        const hashedPassword = await bycrypt.hash(password, 10);
        const newClient = {
            id: db.clients.length + 1, password: hashedPassword, email, name
        };
        db.clients.push(newClient);
        writeDB(db);
        sendResponse(res, 201, 'client created successfully', {id: newClient.id, email: newClient.email, name});
    } catch (error) {
        next(error);
    }
    };

exports.updateClient = (req, res, next) => {
    try {
        const db = readDB();
        const Index = db.clients.findIndex(c => c.id === parseInt(req.params.id));
        if (Index === -1) {
            const error = new Error('Client not found');
            error.status = 404;
            throw error;
        }
        
        db.clients[Index] = { ...db.clients[Index], ...req.body };
        writeDB(db);
        sendResponse(res, 200, 'client updated successfully', db.clients[Index]);
    } catch (error) {
        next(error);
    }       
};

exports.deleteClient = (req, res, next) => {
    try {
        const db = readDB();
        const Index = db.clients.findIndex(c => c.id === parseInt(req.params.id));
        if (Index === -1) {
            const error = new Error('Client not found');
            error.status = 404;
            throw error;
        }   
        db.clients.splice(Index, 1);
        writeDB(db);
        sendResponse(res, 200, 'client deleted successfully', null);
    } catch (error) {
        next(error);
    }   
};