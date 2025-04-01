const Router = require('express');
const router = new Router();
const facadeController = require('../controller/FacadeConntroller');
// Роут для создания нового соискателя
router.post('/create', facadeController.create);
router.get('/getAll', facadeController.getAllFacades);
router.get('/:FacadeID', facadeController.getFacade);






module.exports = router;
