const connection = require('../config/connection');
const dotenv = require('dotenv');

dotenv.config();

exports.add = (req, res, next) => {
  let category = req.body;
  query = 'insert  into category(name) values(?)';
  connection.query(query, [category.name], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: 'Categroy added successfully' });
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.get = (req, res, next) => {
  var query = 'select * from  category order by name';
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.update = (req, res, next) => {
  let product = req.body;
  var query = 'update  category set name=? where id=?';
  connection.query(query, [product.name, product.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: 'Category is does not found' });
      }
      return res
        .status(200)
        .json({ messae: ' category updated  successfully' });
    } else {
      return res.status(500).json(err);
    }
  });
};
