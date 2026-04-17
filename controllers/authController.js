const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginSchema, refreshTokenSchema, registerSchema } = require('../middleware/schemas');
const dbPath = path.join(__dirname, '../database.json');
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

exports.login = async(req, res, next) => {
    try{
        const { email, password } = req.body;
        const db = readDB();
        const client = db.client.find(c => c.email === email);

        if (!client) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

       const isMatch = await bcrypt.compare(password, client.password);
        
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Access Token (short lived)
        const accessToken = jwt.sign(
            {id: client.id, email: client.email },
            process.env.JWT_SECRET,
            {expiresIn: '15m'}
        );

        //Refresh Token (Long lived)
        const refreshToken = jwt.sign(
            {id: client.id},
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '7d'}
        );

        //save refresh token in DB
        client.refreshToken = refreshToken;
        writeDB(db);

        res.status(200).json({
            success: true,
           accessToken,
           refreshToken
        });
    } catch (error) {
        next(error);
    }
    
};
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const db = readDB();

        // Check if email already exists
        const existing = db.client.find(c => c.email === email);
        if (existing) {
            return res.status(409).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new client object
        const newClient = {
            id: db.client.length + 1,
            name,
            email,
            password: hashedPassword,
            refreshToken: null
        };

        // Save to DB
        db.client.push(newClient);
        writeDB(db);

        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            clientId: newClient.id
        });
    } catch (error) {
        next(error);
    }
};
exports.refreshToken = (req, res) => {
    try {
        const { refreshToken } =req.body;

        const db = readDB();

        const client = db.clients.find(c => c.refreshToken === refreshToken);

        if (!client) {
            return res.status(403).json({
                success: false,
                message: 'Invalid refresh Token'
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const newAccessToken = jwt.sign(
            {id: client.id, email: client.email },
            process.env.JWT_SECRET,
           {expiresIn: process.env.JWT_EXPIRES_IN || '15m'} 
        );

        return res.status(200).json({
            success: true,
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Expired or Invalid refresh token'
        });
    }
}