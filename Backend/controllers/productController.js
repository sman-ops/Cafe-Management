const connection = require('../config/connection');
const dotenv = require('dotenv');

dotenv.config();

exports.add = (req, res, next) => {
  let product = req.body;
  var query =
    "insert  into product(name,categoryId,description,price,status) values(?,?,?,?,'true')";
  connection.query(
    query,
    [product.name, product.categoryId, product.description, product.price],
    (err, results) => {
      if (!err) {
        return res.status(200).json({ message: 'product added successfully' });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

exports.get = (req, res, next) => {
  var query =
    'select p.id,p.name,p.description,p.price,p.status,c.id as categoryId,c.name as categoryName from  product as p INNER JOIN  category as c where p.categoryId=c.id';
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.getByCategory = (req, res, next) => {
  const id = req.params.id;
  var query =
    "select id,name from product where categoryId=? and status='true'";
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.getById = (req, res, next) => {
  const id = req.params.id;
  var query = 'select id,name,description,price from product where id=?';
  connection.query(query, [id], (err, results) => {
    if (!err) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.update = (req, res, next) => {
  let product = req.body;
  var query =
    'update product set name=?,categoryId=?,description=?,price=? where id=?';
  connection.query(
    query,
    [
      product.name,
      product.categoryId,
      product.description,
      product.price,
      product.id,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: 'product id does not found' });
        }
        return res
          .status(200)
          .json({ message: 'product updated successfully' });
      } else {
        return res.status(500).json(err);
      }
    }
  );
};

exports.delete = (req, res, next) => {
  const id = req.params.id;
  var query = 'delete  from product where id=?';
  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: 'Product is does not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Product deleted with success' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.updateStatus = (req, res, next) => {
  let user = req.body;
  var query = 'update product set status=? where id=?';
  connection.query(query, [user.status, user.id], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({ message: 'Product is does not found' });
      } else {
        return res
          .status(200)
          .json({ message: 'Product status updated with  success' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};