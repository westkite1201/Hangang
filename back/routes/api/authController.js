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
  try {
    const jwtToken = await helper.bcryptCompare(password, rows);
    return jwtToken;
  } catch (e) {
    console.error(e);
  }
};

//google, kakao
router.post('/sns-login', async (req, res) => {
  try {
    let sns_id = req.body.sns_id;
    let snsType = req.body.sns_type;
    let accessToken = req.body.access_token
    let options;

    console.log('req.body: ', req.body)
    switch (snsType) {
      case 'GOOGLE':
        
        // const PEOPLE_URI = 'https://www.googleapis.com/oauth2/v2/userinfo';
        // options = {
        // uri: PEOPLE_URI,
        // method: 'get',
        // headers: {
        //   Authorization: 'Bearer ' + accessToken
        // }
      // }
        break;
      case 'NAVER':

        break;
      
      case 'KAKAO':
        //카카오
        const PEOPLE_URI = 'https://kapi.kakao.com/v2/user/me';
        options = {
          uri: PEOPLE_URI,
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        } 
        break;

      default:
        break;
    }

    let result = await request.get(options);
    result = JSON.parse(result);
    const userId = result.id;
    let tempData = {};

    if (snsType === 'GOOGLE') {
      tempData.verifiedEmail = result.verified_email;
      tempData.email = result.email;
      tempData.name = result.name;
      tempData.picture = result.picture;
    } else if (snsType === 'KAKAO') {
      console.log('kakao_result: ', result)
      const { kakao_account } = result;
      tempData.verifiedEmail = kakao_account.is_email_verified
      tempData.email = (kakao_account.email && kakao_account.email !== undefined ? kakao_account.email : userId);
      tempData.name = kakao_account.profile.nickname;
      tempData.picture = kakao_account.profile.thumbnail_image_url;
    } else if (snsType === 'NAVER') {

    }
    // SNS로그인시 E-mail 검증 완료
    if (tempData.verifiedEmail) {
      const filter = {
        MEM_USER_ID: userId
      }

      let findMember = await Member.find(filter);
      if (findMember && findMember.length !== 0) {  // userId로 DB조회 결과 유저 있음
        const password = userId + '_' + process.env.JWT_SECRET;
        const jwtToken = await bcryptCheck(password, findMember);
        if (jwtToken) {
          return res.json({
            message: 'sns login success',
            code: 200,
            token: jwtToken,
            ACCESS_TOKEN: jwtToken,
            USER_ID: userId,
            USER_TYPE: snsType
          })
        }
      } else { // userId로 DB조회결과 유저 없음 -> 회원가입 진행(ID와 email은 동일)
        let password = userId + '_' + process.env.JWT_SECRET;
        const bcySalt = await helper.getBcryptSalt();
        const hashedPassword = await helper.getHashedPassword(
          password,
          bcySalt
        );
        let userData = {
          MEM_EMAIL: tempData.email,
          MEM_USER_ID: userId,
          MEM_PASSWORD: hashedPassword,
          MEM_USER_NAME: tempData.name,
          MEM_AVATER_PATH: tempData.picture,
          MEM_SIGN_TYPE: snsType
        };
        const member = new Member(userData);
        await member.save();
        const tmpArray = [];
        tmpArray.push(member);
        let jwtToken = await bcryptCheck(password, tmpArray);
        if (jwtToken) {
          return res.json({
            message: 'logged in successfully',
            token: jwtToken,
            ACCESS_TOKEN: jwtToken,
            USER_ID: userId,
            USER_TYPE: snsType,
            code: 200
          });
        }
      }
    } else {  // 검증안되었을때, 회원가입으로 돌릴지? 협의필요
      return res.json({
        message: 'logged in failed',
        token: 'token!',
        code: 200
      });
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

module.exports = router;
