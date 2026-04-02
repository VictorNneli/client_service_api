const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const validate = require('../middleware/validate');
const { createRecordSchema, updateRecordSchema, idparamSchema } = require('../middleware/validate');

/**
 * @swagger
 * tags:
 *   - name: Records
 *     description: API for managing records
 */

/**
 * @swagger
 * /records:
 *  get:   
 *    summary: Retrieve a list of records
 *    tags: [Records]
 *    responses:
 *      200:
 *        description: A list of records retrieved successfully
 */
router.get('/', recordsController.getAllRecords);

/**
 * @swagger
 * /records/{id}:
 *   get:
 *     summary: Retrieve a record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A record retrieved successfully
 *       404:
 *         description: Record not found
 */
router.get('/:id', validate(idparamSchema, 'params'), recordsController.getRecordById);

/**
 * @swagger
 * /records:
 *   post:
 *     summary: Create a new record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: integer
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Record created successfully
 */
router.post('/', validate(createRecordSchema), recordsController.createRecord);

/**
 * @swagger
 * /records/{id}:
 *   put:
 *     summary: Update a record 
 *     tags: [Records]
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
 *      responses:
 *        200:
 *          description: Record updated successfully
 *        404:
 *          description: Record not found
 */
router.put('/:id', validate(idparamSchema, 'params'), validate(updateRecordSchema), recordsController.updateRecord);

/**
 * @swagger
 * /records/{id}:
 *   delete: 
 *     summary: Delete a record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       404:
 *         description: Record not found
 */
router.delete('/:id', validate(idparamSchema, 'params'), recordsController.deleteRecord);

module.exports = router;