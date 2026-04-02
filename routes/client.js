const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const validate = require('../middleware/validate');
const{ createClientSchema, updateClientSchema, idparamSchema } = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   - name: Client
 *     description: API for managing clients
 */

/**
 * @swagger
 * /client:
 *   get:
 *     summary: Retrieve a list of clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: A list of clients retrieved successfully
 */
router.get('/', clientController.getAllClients);
 
/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Retrieve a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: integer
 *     responses:
 *       200:
 *        description: A client retrieved successfully
 *       404:
 *       description: Client not found
 */
router.get('/:id', validate(idparamSchema, 'params'), clientController.getClientById);

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Create a new client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *      201:
 *       description: Client created successfully
 */
router.post('/', validate(createClientSchema), clientController.createClient);  

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Update a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Client updated successfully
 *       404:
 *         description: Client not found
 */
router.put('/:id', validate(idparamSchema, 'params'), validate(updateClientSchema), clientController.updateClient);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Delete a client by ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 */
router.delete('/:id', validate(idparamSchema, 'params'), clientController.deleteClient);

module.exports = router;