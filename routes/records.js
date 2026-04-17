const express = require('express');
const router = express.Router();
const recordsController = require('../controllers/recordsController');
const validate = require('../middleware/validate');
const { createRecordSchema, updateRecordSchema, idparamSchema } = require('../middleware/schemas');

router.get('/', recordsController.getAllRecords);

router.get('/:id', validate(idparamSchema, 'params'), recordsController.getRecordById);

router.post('/', validate(createRecordSchema), recordsController.createRecord);

router.put('/:id', validate(idparamSchema, 'params'), validate(updateRecordSchema), recordsController.updateRecord);

router.delete('/:id', validate(idparamSchema, 'params'), recordsController.deleteRecord);

module.exports = router;