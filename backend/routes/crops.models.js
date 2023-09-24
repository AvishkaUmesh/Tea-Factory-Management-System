const express = require('express')
const router = express.Router()
const cropsController = require('../controllers/crops.controllers.js')

router.get('/', cropsController.getAllCrops)
router.post('/', cropsController.addCrops)
router.get('/:id', cropsController.getByCropsById)
router.put('/:id', cropsController.updateCrops)
router.delete('/:id', cropsController.deleteCrops)

module.exports = router
