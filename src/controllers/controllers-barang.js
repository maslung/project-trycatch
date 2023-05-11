   const config = require('../configs/database');
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();

// Menampilkan semua data barang
const getDataBarang = async (req, res) => {

  try{
    const dataaasasasa = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM barang', function (error, rows) {
        if (rows) {
          resolve(rows);
        } else { 
          reject([]);
        }
      });
    }); 
  
      res.send({
        success: true,
        message: 'Berhasil mengambil data barang',
        data: data,
      });
    
  }catch (error) {
    res.send({
      success: false,
      message: error.stack,
    });
  }
};

// Menambahkan data barang
const addDataBarang = async (req, res) => {
  let data = {
    nama_barang: req.body.nama_barang,
    stok: req.body.stok,
    harga: req.body.harga,
  };

  try{
    const result = await new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO barang SET ?;',
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
        message: 'Berhasil menambahkan data barang',
      });
  } catch (error) {
    res.send({
      success: false,
      message: error.stack,
    });
  }
};

// Mengubah data barang
const editDataBarang = async (req, res) => {
  let kode_barang = req.params.kode_barang;
  let dataEdit = {
    nama_barang: req.body.nama_barang,
    stok: req.body.stok,
    harga: req.body.harga,
  };

  try{
    const result = await new Promise((resolve, reject) => {
      connection.query(
        'UPDATE barang SET ? WHERE kode_barang = ?;',
        [dataEdit, kode_barang],
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
        message: 'Berhasil mengubah data barang',
      });
    
  }catch (error) {
    res.send({
      success: false,
      message: error.stack
    });
  }
};

// Delete Data barang
const deleteDataBarang = async (req, res) => {
  let kode_barang = req.params.kode_barang;

  console.log(kode_barang);

  try{
    const result = await new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM barang WHERE kode_barang = ?;',
        [kode_barang],
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
        message: 'Berhasil menghapus data barang',
      });

  } catch (error) {
    res.send({
      success: false,
      message: error.stack
    });
  }
};

module.exports = {
  getDataBarang,
  addDataBarang,
  editDataBarang,
  deleteDataBarang,
};