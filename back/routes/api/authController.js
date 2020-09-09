let express = require('express');
let router = express.Router();
//const async = require('async');
const Member = require('../../mongo/models/member');
const token = require('../../lib/token');
//const crypto = require('crypto');
const _ = require('lodash');
let bcrypt = require('bcrypt-nodejs');
//const authMiddleware = require('../../middlewares/auth');

const helper = require('../../lib/helpers');

const request = require('request');
// /    GET /api/auth/check
// const check = (req, res) => {
//   console.log('check in');
//   res.json({
//     success: true,
//     info: req.decoded
//   });
// };
// router.use('/check', authMiddleware);
// router.get('/check', check);
bcryptCheck = async (password, rows) => {
  console.log(rows[0]);
  try {
    const jwtToken = await helper.bcryptCompare(password, rows);
    return jwtToken;
  } catch (e) {
    console.error(e);
  }
};

router.post('/check_goolge', async (req, res) => {
  try {
    let accessToken = req.body.access_token;
    const PEOPLE_URI = 'https://www.googleapis.com/auth/profile.emails.read';

    const options = {
      uri: PEOPLE_URI,
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    };

    request.get(options, function (err, response) {
      console.log(err);
      res.json({
        mesage: response
      });
    });
  } catch (e) {
    console.log(e);
  }
});
/* 로그인  */
router.post('/login', async (req, res) => {
  try {
    let filter = {
      MEM_EMAIL: req.body.memEmail
    };
    let memberRow = await Member.find(filter);
    if (memberRow && memberRow.length !== 0) {
      //온경우
      const password = req.body.memPassword;
      let jwtToken = await bcryptCheck(password, memberRow);
      console.log(jwtToken);
      if (jwtToken) {
        res.json({
          message: 'logged in successfully',
          token: jwtToken,
          code: 200
        });
      } else {
        res.json({ message: 'error', status: 400 });
      }
    }
  } catch (e) {
    console.log('error', e);
    return res.json({ message: 'error', status: 400 });
  }
});

// 영문, 숫자 혼합하여 6~20자리 이내
checkValidationPassword = (password, res) => {
  let reg_pwd = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
  if (!reg_pwd.test(password)) {
    console.log('password not vaildation ');
    return false;
  }
  return true;
};

/* 회원가입 */
router.post('/setMemberSignup', async (req, res) => {
  console.log('hello setMemberSignUp');
  //test
  if (!checkValidationPassword(req.body.memPassword)) {
    console.log('notVaildation');
    return res.json({
      message: 'fail',
      code: 500
      //error: error
    });
  }
  try {
    let filter = {
      MEM_EMAIL: req.body.memEmail
    };
    let memberRow = await Member.find(filter);
    if (memberRow && memberRow.length !== 0) {
      return res.json({
        status: 404,
        message: 'email already exist'
      });
    } else {
      let password = req.body.memPassword;
      const bcySalt = await helper.getBcryptSalt();
      const hashedPassword = await helper.getHashedPassword(password, bcySalt);
      let userData = {
        MEM_EMAIL: req.body.memEmail,
        MEM_PASSWORD: hashedPassword,
        MEM_USER_NAME: req.body.memUserName
      };
      const member = new Member(userData);
      await member.save();
      return res.json({
        status: '200',
        message: 'success sign up'
      });
    }
  } catch (error) {
    console.error(error);
    return res.json({
      message: 'fail',
      code: 500,
      error: error
    });
  }
});

module.exports = router;
