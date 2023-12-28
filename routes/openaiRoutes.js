const express = require('express');
const { summaryController, paragraphController, jsCodeController, imageController } = require('../controllers/openaiController');
const isAuthenticated = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(isAuthenticated)
// route
router.post('/summary', summaryController)
router.post('/paragraph', paragraphController)
router.post('/jsCode', jsCodeController)
router.post('/image', imageController)

module.exports = router;

