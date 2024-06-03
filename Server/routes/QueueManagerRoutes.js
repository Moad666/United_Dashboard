const express = require('express')
const router = express.Router()

const controller = require('../Controllers/QueueManagerController')

router.get('/queues', controller.getAllQueueManagers);
// router.get('/queue/:id', controller.getNodeById);
router.post('/queue', controller.createQueueManager);
// router.put('/queue/:id', controller.updateNode);
// router.delete('/queue/:id', controller.deleteNode);

module.exports = router