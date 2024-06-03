const express = require('express')
const router = express.Router()

const controller = require('../Controllers/NodesController')

router.get('/nodes', controller.getAllNodes);
router.get('/node/:id', controller.getNodeById);
router.post('/node', controller.createNode);
router.put('/node/:id', controller.updateNode);
router.delete('/node/:id', controller.deleteNode);

module.exports = router