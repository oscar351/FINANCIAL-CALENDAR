const express = require("express");
const router = express.Router();


const naverCallBack = (req, res) => {
  const accessToken = req.user.accessToken;
  const refreshToken = req.user.refreshToken;
  const query = "?accessToken=" + accessToken + "&refreshToken=" + refreshToken;
  res.redirect(`http://localhost:3000/${query}`);
  // res.redirect('http://localhost:3000');
  // res.send(req.user);
  // const token = req.user; // 사용자 토큰 정보 (예: JWT 토큰)
  // const query = "?token=" + token;
  // res.locals.token = token;
  // res.redirect(`http://localhost:5000/${query}`);
}

module.exports = naverCallBack;