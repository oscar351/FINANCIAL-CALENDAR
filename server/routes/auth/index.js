const express = require('express');
const {login, logout} = require('./login');
const refresh = require('./refresh');
const NaverAuth = require('./naverAuth');
const kakaoAuth = require('./kakaoAuth');
const GoogleAuth = require('./googleAuth');
const authJWT = require('../../utils/authJWT');
const passport = require("passport");

const router = express.Router();


router.post('/login', login);
router.get('/logout', authJWT, logout);
router.get('/refresh', refresh);
router.get("/kakao", passport.authenticate("kakao"));
router.get("/kakao/callback", passport.authenticate("kakao", {failureRedirect: "/login"}), kakaoAuth);
router.get('/naver', passport.authenticate('naver'));
router.get('/naver/callback', passport.authenticate('naver', {failureRedirect: '/login',}), NaverAuth);
router.get('/google', passport.authenticate('google', { scope: ["email", "profile"] }));
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/login',}), GoogleAuth);

module.exports = router;