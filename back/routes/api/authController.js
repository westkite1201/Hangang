let express = require('express');
let router = express.Router();
//const async = require('async');
const Member = require('../../mongo/models/member');
const token = require('../../lib/token');
//const crypto = require('crypto');
const _ = require('lodash');
let bcrypt = require('bcrypt-nodejs');
const authMiddleware = require('../../middlewares/auth');

const helper = require('../../lib/helpers');

//const request = require('request');
const request = require('request-promise-native');
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

//google, kakao
router.post('/check_sns_login', async (req, res) => {
  try {
    let accessToken = req.body.access_token;
    let snsType = req.body.sns_type;
    let options;
    if (snsType === 'GOOGLE') {
      const PEOPLE_URI = 'https://www.googleapis.com/oauth2/v2/userinfo';
      options = {
        uri: PEOPLE_URI,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      };
    } else {
      //카카오
      const PEOPLE_URI = 'https://kapi.kakao.com/v2/user/me';
      options = {
        uri: PEOPLE_URI,
        method: 'get',
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      };
    }

    let result = await request.get(options);
    result = JSON.parse(result);
    //id가 검증되었다면 ( 정상적 구글 로그인 )
    if (result.verified_email) {
      const { id, email, picture, name } = result;
      let filter = {
        MEM_USER_ID: id
      };
      let memberRow = await Member.find(filter);
      //가입된 id이 존재한다면,
      if (memberRow && memberRow.length !== 0) {
        let password = id + '_' + process.env.JWT_SECRET;
        let jwtToken = await bcryptCheck(password, memberRow);
        if (jwtToken) {
          return res.json({
            message: 'logged in successfully',
            token: jwtToken,
            code: 200
          });
        }
      } else {
        //가입된 id 가 존재 하지 않는다면 가입 처리 진행
        let password = id + '_' + process.env.JWT_SECRET;
        const bcySalt = await helper.getBcryptSalt();
        const hashedPassword = await helper.getHashedPassword(
          password,
          bcySalt
        );
        let userData = {
          MEM_EMAIL: email,
          MEM_USER_ID: id,
          MEM_PASSWORD: hashedPassword,
          MEM_USER_NAME: name,
          MEM_AVATER_PATH: picture,
          MEM_SIGN_TYPE: 'SNS'
        };
        const member = new Member(userData);
        await member.save();
        //'success sign up'

        let jwtToken = await bcryptCheck(password, memberRow);
        if (jwtToken) {
          return res.json({
            message: 'logged in successfully',
            token: jwtToken,
            code: 200
          });
        }
      }
    }
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
      console.log('isExist');
      //온경우
      const password = req.body.memPassword;
      let jwtToken = await bcryptCheck(password, memberRow);
      console.log(jwtToken);
      // res.cookie('access-token', jwtToken, {
      //   maxAge: 1000 * 60 * 60 * 24 * 1,
      //   httpOnly: false
      // });
      if (jwtToken) {
        return res.json({
          message: 'logged in successfully',
          token: jwtToken,
          status: 200
        });
      } else {
        return res.json({ message: 'error', status: 400 });
      }
    } else {
      return res.json({ message: '가입된 정보가 없습니다.', status: 400 });
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

/* local 회원가입 */
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
        MEM_USER_NAME: req.body.memUserName,
        MEM_SIGN_TYPE: 'LOCAL'
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

/* 카톡 로그인 라우터 */
router.get('/kakao-login', async (req, res) => {
  console.log('kakao-login');
  console.log('req: ', req);

  return res.json({
    status: 200,
    message: 'success kakao login'
  });
});
module.exports = router;
