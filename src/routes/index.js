const express = require('express')
const router = express.Router()

const { login } = require('@/api/main/login')
const { restApi } = require('@/api/rest-api')

/* POST 登录 */
router.post('/login', login)
/* POST rest-api */
router.post('/rest-api', restApi)


module.exports = router
