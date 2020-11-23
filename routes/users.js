const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const carController = require('../controller/carController');
// Load User model
const User = require('../models/User');

const { forwardAuthenticated } = require('../config/auth');




// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));
// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2, telephone, line, firstnum,  province, } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2 || !telephone || !line || !firstnum || !province ) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (telephone.length <=9 ) {
    errors.push({msg : 'หมายเลขโทรศัพท์ไม่ถูกต้อง'});
  }
  if(!(firstnum.length =6 || 7)) {
    error.push({msg: 'เลขชุดหน้าประกอบไปด้วย 2-3หลัก เช่น AA หรือ 1AA' });
  }

  if(province.length >20) {
    error.push({msg: 'ไม่มีจังหวัดนี้'});
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      telephone,
      line,
      firstnum,
      province,
      line


    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          telephone,
          line,
          firstnum,
          province,
          line


        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          telephone,
          firstnum,
          line,
          province
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));
// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

//Find
router.get('/:firstnum',carController.find);

//fetch


module.exports = router;

