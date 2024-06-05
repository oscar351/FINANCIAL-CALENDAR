const express = require('express');
const login = require('./login');
const refresh = require('./refresh');
const kakaoAuth = require('./kakaoAuth');
const authJWT = require('../../utils/authJWT');
const passport = require("passport");

const router = express.Router();


router.post('/login', login);
router.get('/refresh', refresh);
router.get("/kakao", passport.authenticate("kakao"));
router.get("/kakao/callback", passport.authenticate("kakao", {failureRedirect: "/login"}), kakaoAuth);
router.get("/logout", (req, res) => {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.redirect("/"); // 로그아웃 중 에러가 발생한 경우에 대한 처리
      }
       //로그아웃 성공 시 리다이렉트
    });
  });

module.exports = router;