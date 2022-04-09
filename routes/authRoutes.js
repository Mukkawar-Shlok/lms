const { Router } = require('express');
const authCon = require('../Controllers/authCon')

const router = Router();


router.get('/sign', authCon.signup_get)
router.post('/sign', authCon.signup_post)
router.get('/login', authCon.login_get)
router.post('/login', authCon.login_post)


module.exports = router;