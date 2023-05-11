const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Menampilkan semua data penggajian
const getDataPenggajian = async (req, res) => {

  try{
    const data = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM penggajian', function (error, rows) {
        if (rows) {
          resolve(rows);
        } else { 
          reject([]);
        }
      });
    }); 
     if (req.session.loggedin){
      res.send({
        success: true,
        message: 'Berhasil mengambil data penggajian',
        data: data,
      });
    } else {
      res.send({
        success: true,
        message: 'Silahkan Login Terlebih Dahulu! ',
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.stack,
    });
  }
};

// Menambahkan data penggajian
const addDataPenggajian = async (req, res) => {
    try{
          //GAJI
          if (req.body.jabatan == "Direktur"){
            var gaji2 = 10000000;
          } else if (req.body.jabatan == "Manager"){
            var gaji2 = 5000000;
          } else if (req.body.jabatan == "Karyawan"){
            var gaji2 = 300000;
          } else if (req.body.jabatan == "OB"){
            var gaji2 = 1500000;
          } else {
            var gaji2 = 0;
          }

          //TUNJANGAN
          if (req.body.pendidikan == "S1"){
            var tunjangan2 = 2000000
          } else if (req.body.pendidikan == "SMA"){
            var tunjangan2 = 1500000
          } else if (req.body.pendidikan == "SMP"){
            var tunjangan2 = 1000000
          } else if (req.body.pendidikan == "SD"){
            var tunjangan2 = 500000
          }

          //BONUS
          if (req.body.lama_kerja >= 5){
            var bonus2 = 500000;
            var total_gaji = gaji2+tunjangan2+bonus2
          } else {
            var bonus2 = 0;
            var total_gaji = gaji2+tunjangan2+bonus2
          }

  let data = {

    nama_karyawan: req.body.nama_karyawan,
    jenis_kelamin: req.body.jenis_kelamin,
    jabatan: req.body.jabatan,
    gaji : gaji2,
    pendidikan: req.body.pendidikan,
    lama_kerja: req.body.lama_kerja,
    tunjangan: tunjangan2,
    total_gaji: total_gaji,
    bonus: bonus2
  };

  
    const result = await new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO penggajian SET ?;',
        [data],
        function (error, rows) {
          if (rows) {
            resolve(true);
          } else {
            reject(false);
          }
        }
      );
    });
      res.send({
        success: true,
        message: 'Berhasil menambahkan data penggajian',
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.stack,
    });
  }
};

// Mengubah data penggajian
const editDataPenggajian = async (req, res) => {
    try{
  let kode_karyawan = req.params.kode_karyawan  ;

  //GAJI
  if (req.body.jabatan == "Direktur"){
    var gaji2 = 10000000;
  } else if (req.body.jabatan == "Manager"){
    var gaji2 = 5000000;
  } else if (req.body.jabatan == "Karyawan"){
    var gaji2 = 300000;
  } else if (req.body.jabatan == "OB"){
    var gaji2 = 1500000;
  } else {
    var gaji2 = 0;
  }

  //TUNJANGAN
  if (req.body.pendidikan == "S1"){
    var tunjangan2 = 2000000
  } else if (req.body.pendidikan == "SMA"){
    var tunjangan2 = 1500000
  } else if (req.body.pendidikan == "SMP"){
    var tunjangan2 = 1000000
  } else if (req.body.pendidikan == "SD"){
    var tunjangan2 = 500000
  }

  //BONUS
  if (req.body.lama_kerja >= 5){
    var bonus2 = 500000;
    var total_gaji = gaji2+tunjangan2+bonus2
  } else {
    var bonus2 = 0;
    var total_gaji = gaji2+tunjangan2+bonus2
  }

  let dataEdit = { 
    nama_karyawan: req.body.nama_karyawan,
    jenis_kelamin: req.body.jenis_kelamin,
    jabatan: req.body.jabatan,
    gaji : gaji2,
    pendidikan: req.body.pendidikan,
    lama_kerja: req.body.lama_kerja,
    tunjangan: tunjangan2,
    total_gaji: total_gaji,
    bonus: bonus2
  };

    const result = await new Promise((resolve, reject) => {
      connection.query(
        'UPDATE penggajian SET ? WHERE kode_karyawan = ?;',
        [dataEdit, kode_karyawan],
        function (error, rows) {
          if (rows) {
            resolve(true);
          } else {
            reject(false);
          }
        }
      );
    });
  
      res.send({
        success: true,
        message: 'Berhasil mengubah data penggajian',
      });
    
  }catch (error) {
    res.send({
      success: false,
      message: error.stack
    });
  }
};

// Delete Data penggajian
const deleteDataPenggajian = async (req, res) => {

    try{
  let kode_karyawan = req.params.kode_karyawan;

    const result = await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM penggajian WHERE kode_karyawan = ?;',
        [kode_karyawan],
        function (error, rows) {
          if (rows) {
            resolve(true);
          } else {
            reject(false);
          }
        }
      );
    });
  
      res.send({
        success: true,
        message: 'Berhasil menghapus data penggajian',
      });

  } catch (error) {
    res.send({
      success: false,
      message: error.stack
    });
  }
};

module.exports = {
  getDataPenggajian,
  addDataPenggajian,
  editDataPenggajian,
  deleteDataPenggajian
}