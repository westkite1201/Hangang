let express = require('express');
let router = express.Router();
const async = require('async');
const Member = require('../../mongo/models/member');
const token = require('../../src/lib/token');
//const helpers = require('../../lib/helpers');
const crypto = require('crypto');
const _ = require('lodash');
let bcrypt = require('bcrypt-nodejs');
const authMiddleware = require('../../middlewares/auth');

// /    GET /api/auth/check
const check = (req, res) => {
  console.log('check in');
  res.json({
    success: true,
    info: req.decoded
  });
};
router.use('/check', authMiddleware);
router.get('/check', check);

bcryptCheck = async (password, rows) => {
  console.log(rows);
  try {
    const jwtToken = await new Promise((resolve, reject) => {
      bcrypt.compare(password, rows[0].mem_password, (err, res) => {
        console.log(res);
        if (err) {
          reject(err);
        } else if (res) {
          //성공시
          console.log('bcryptCheck , res', res);
          payload = {
            mem_idx: rows[0].mem_idx,
            mem_username: rows[0].mem_username,
            mem_email: rows[0].mem_email,
            gb_cd: rows[0].mem_gb_cd,
            mem_avater_path: rows[0].mem_avater_path
          };
          resolve(token.generateToken(payload));
        } else {
          reject();
        }
      });
    });
    return jwtToken;
  } catch (e) {
    console.error(e);
  }
};
/* 로그인  new */
router.post('/login', async (req, res) => {
  try {
    const data = {
      mem_email: req.body.mem_email,
      mem_password: req.body.mem_password
    };
    const password = data.mem_password;
    let rows = await authDaoNew.getLoginData(data);
    console.log('rows', rows);
    if (!_.isEmpty(rows)) {
      //온경우
      let jwtToken = await bcryptCheck(password, rows);
      if (jwtToken) {
        res.json({
          message: 'logged in successfully',
          token: jwtToken,
          code: 200
        });
      } else {
        res.json({ message: 'error', status: 400 });
      }
    } else {
      return res.json({ message: 'error', status: 400 });
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
  //res.cookie('favorite', favorite);
  if (!checkValidationPassword(req.body.mem_password)) {
    console.log('notVaildation');
    return res.json({
      message: 'fail',
      code: 500
      //error: error
    });
  }

  try {
    const data = {
      mem_username: req.body.mem_username,
      mem_userid: req.body.mem_email,
      mem_email: req.body.mem_email,
      mem_password: req.body.mem_password,
      mem_gb_cd: req.body.mem_gb_cd
    };
    const userData = {
      mem_username: req.body.mem_username,
      mem_userid: req.body.mem_email,
      mem_email: req.body.mem_email,
      mem_password: req.body.mem_password,
      mem_gb_cd: req.body.mem_gb_cd
    };
    let password = req.body.mem_password;

    console.log(data);
    async.waterfall(
      [
        (cb) => {
          authDao.connect(cb);
        },
        (conn, cb) => {
          authDao.getEmailIsAlreadyExist(conn, data, cb); //로그인 중복체크
        },
        (conn, data, cb) => {
          console.log('data ', data);
          if (data[0].EXISTFLAG === 'NONE') {
            console.log('1');
            bcrypt.genSalt(10, function (err, salt) {
              if (err) {
                console.log('bcrypt.getSalt() error ', err.message);
              } else {
                console.log('password ', password);
                bcrypt.hash(password, salt, null, function (err, hash) {
                  if (err) {
                    console.log('bcy', err.message);
                  } else {
                    userData.mem_password = hash;
                    authDao.setMemberSignUp(conn, userData, cb);
                  }
                });
              }
            });
          } else {
            cb(null, conn, { message: '가입이 되어 있습니다.' });
          }
        },
        (conn, data, cb) => {
          console.log('hello ', data);
          cb(null, conn, data);
        }
      ],
      (error, conn, result) => {
        console.log(error);
        if (conn) {
          authDao.release(conn);
        }

        if (error) {
          return res.json({
            message: 'fail',
            code: 500,
            error: error
          });
        } else {
          console.log('result', result);
          return res.json({ status: 200, message: '로그인 성공 ' });
        }
      }
    );
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
