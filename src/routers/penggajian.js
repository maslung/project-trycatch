const router = require('express').Router();
const { penggajian } = require('../controllers/index');

// GET localhost:8080/jabatan => Ambil data semua penggajian
router.get('/', penggajian.getDataPenggajian);

// GET localhost:8080/jabatan/2 => Ambil data jabatan semua jabatan berdasarkan id = 2
// router.get('/:id', jabatan.getDetailjabatan);

// POST localhost:8080/jabatan/add => Tambah data penggajian ke database
router.post('/add', penggajian.addDataPenggajian);

// POST localhost:8080/jabatan/edit/1 => Edit data penggajian
router.put('/edit/:kode_karyawan', penggajian.editDataPenggajian);

// POST localhost:8080/jabatan/delete => Delete data penggajian
router.delete('/delete/:kode_karyawan', penggajian.deleteDataPenggajian);

module.exports = router;