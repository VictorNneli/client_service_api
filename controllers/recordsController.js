const fs = require('fs');
const path = require('path');
const bycrypt = require('bcrypt');
const { sendResponse } = require('../utils/response');

const dbPath = path.join(__dirname, '../database.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));


exports.getAllRecords = (req, res, next) => {
    try {
        const db = readDB();    
        sendResponse(res, 200, 'records retrieved successfully', db.records);
    } catch (error) {
        next(error);
    }
};

exports.getRecordById = (req, res, next) => {
    try {
        const db = readDB();
        const record = db.records.find(r => r.id === parseInt(req.params.id));
        if (!record) {
            const error = new Error('Record not found');
            error.status = 404;
            throw error;
        }
        sendResponse(res, 200, 'record retrieved successfully', record);
    } catch (error) {
        next(error);
    }
};

exports.createRecord = async(req, res, next) => {
    try {
        const db = readDB();    
        const { email, password, name } = req.body;
        const hashedPassword = await bycrypt.hash(password, 10);
        const newRecords = {
            id: db.records.length + 1, password: hashedPassword, email, name
        };
        db.records.push(newRecord);
        writeDB(db);
        sendResponse(res, 201, 'record created successfully', {id: newRecord.id, email: newRecord.email, name});
    } catch (error) {
        next(error);
    }
};

exports.updateRecord = (req, res, next) => {
    try {
        const db = readDB();
        const Index = db.records.findIndex(r => r.id === parseInt(req.params.id));
        if (Index === -1) {
            const error = new Error('Record not found');
            error.status = 404;
            throw error;
        }
        db.records[Index] = { ...db.records[Index], ...req.body };
        writeDB(db);
        sendResponse(res, 200, 'record updated successfully', db.records[Index]);
    } catch (error) {
        next(error);
    }
};

exports.deleteRecord = (req, res, next) => {    
    try {
        const db = readDB();
        const Index = db.records.findIndex(r => r.id === parseInt(req.params.id));
        if (Index === -1) {
            const error = new Error('Record not found');
            error.status = 404;
            throw error;
        }
        db.records.splice(Index, 1);
        writeDB(db);
        sendResponse(res, 200, 'record deleted successfully', null);
    } catch (error) {
        next(error);
    }
};

