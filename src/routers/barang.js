const router = require('express').Router();
const { barang } = require('../controllers/index');

// GET localhost:8080/jabatan => Ambil data semua jabatan
router.get('/', barang.getDataBarang);

// GET localhost:8080/jabatan/2 => Ambil datjabatan semua jabatan berdasarkan id = 2
// router.get('/:id', jabatan.getDetailjabatan);

// POST localhost:8080/jabatan/add => Tambah data jabatan ke database
router.post('/add', barang.addDataBarang);

// POST localhost:8080/jabatan/edit/1 => Edit data jabatan
router.put('/edit/:kode_barang', barang.editDataBarang);

// POST localhost:8080/jabatan/delete => Delete data jabatan
router.delete('/delete/:kode_barang', barang.deleteDataBarang);

module.exports = router;
 

