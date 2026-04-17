const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const validate = require('../middleware/validate');
const { clientSchema, updateClientSchema, idParamSchema } = require('../middleware/schemas');

router.get('/', clientController.getAllClients);
 
router.get('/:id', validate(idParamSchema, 'params'), clientController.getClientById);

router.post('/', validate(clientSchema), clientController.createClient);  

router.put('/:id', validate(idParamSchema, 'params'), validate(updateClientSchema), clientController.updateClient);

router.delete('/:id', validate(idParamSchema, 'params'), clientController.deleteClient);

module.exports = router;