const connection = require('../config/connection');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

exports.signup = (req, res, next) => {
  let user = req.body;
  query = 'select email,password,role,status from user where email=?';
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0) {
        query =
          "insert into user(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          query,
          [user.name, user.contactNumber, user.email, user.password],
          (err, result) => {
            if (!err) {
              return res.status(200).json({ message: 'Succefully registered' });
            } else {
              return res.status(400).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: 'email already exist' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.signin = (req, res, next) => {
  const user = req.body;
  query = 'select email,password,role,status from user where email=?';
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      if (result.length <= 0 || result[0].password != user.password) {
        return res
          .status(401)
          .json({ message: 'incorrect username or password' });
      } else if (result[0].status === 'false') {
        return res.status(401).json({ message: 'wait for admin  approvel' });
      } else if (result[0].password == user.password) {
        const response = { email: result[0].email, role: result[0].role };
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
          expiresIn: '9h',
        });
        res.status(200).json({ token: accessToken });
      } else {
        return res
          .status(400)
          .json({ message: 'someting went  wrong please try a later' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.forgotpassword = (req, res, next) => {
  let user = req.body;
  query = 'select email,password from user where email=?';
  connection.query(query, [user.email], (err, result) => {
    if (!err) {
      // user not exist in our DB
      if (result.length <= 0) {
        return res
          .status(200)
          .json({ message: 'Password send succefully to your email' });
      } else {
        var mailOptions = {
          from: process.env.EMAIL,
          to: result[0].email,
          subject: 'Password  by cafe management  ',
          html:
            '<p><b>Your login details fro cafe managmeent</b><br><b>Email:</b>' +
            result[0].email +
            '<br><b>Password:</b>' +
            result[0].password +
            '<br><a href="">Click here tol </a></p>',
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log('Email send' + info.response);
          }
        });
        return res
          .status(200)
          .json({ message: 'Password send succefully to your email' });
      }
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.get = (req, res, next) => {
  var query =
    "select id,name,email,contactNumber,status from user  where role='user'";
  connection.query(query, (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(err);
    }
  });
};

// update user status to be approvel
exports.update = (req, res, next) => {
  let user = req.body;
  var query = 'update user set status=? where  id=?';
  connection.query(query, [user.status, user.id], (err, result) => {
    if (!err) {
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: 'user  id does not exist' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    } else {
      return res.status(500).json(err);
    }
  });
};

exports.checkToken = (req, res, next) => {
  return res.status(200).json({ message: 'true' });
};

exports.changePassword = (req, res, next) => {
  const user = req.body;
  const email = res.locals.email;
  var query = 'select * from  user  where  email=? and password=? ';
  connection.query(query, [email, user.oldPassword], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res.status(400).json({ message: 'Incorrect old password' });
      } else if (results[0].password == user.oldPassword) {
        query = 'update  user set password=? where email=?';
        connection.query(query, [user.newPassword, email], (err, results) => {
          if (!err) {
            return res
              .status(200)
              .json({ message: 'password updated successfully' });
          } else {
            return res.status(500).json(err);
          }
        });
      } else {
        return res
          .status(400)
          .json({ message: 'something  went wrong please try again' });
      }
    } else {
      return res.status(400).json(err);
    }
  });
};
