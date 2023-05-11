const router = require('express').Router();
const routerPenggajian = require('./penggajian');

// GET localhost:8080/produk => Ambil data semua produk
router.use('/penggajian', routerPenggajian);



module.exports = router;
