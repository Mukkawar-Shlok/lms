const { Router } = require('express');
const authCon = require('../Controllers/authCon')

const router = Router();


router.get('/sign', authCon.signup_get)
router.post('/sign', authCon.signup_post)
router.get('/login', authCon.login_get)
router.post('/login', authCon.login_post)
router.get('/logout', authCon.logout_get)
router.get('/front', authCon.front_get)
router.get('/profile', authCon.profile_get)
// router.post('/course', authCon.profile_post)


module.exports = router;