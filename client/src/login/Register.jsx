import React, { useState } from 'react';
import '../css/Register.css';
import '../css/common.css';
import { Link } from 'react-router-dom';

function Register() {
  const [emailValid, setEmailValid] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남김
    let formattedValue = '';

    if (value.length < 4) {
      formattedValue = value;
    } else if (value.length < 7) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length < 11) {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    } else {
      formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
    }

    setFormData({ ...formData, phoneNumber: formattedValue });
  };
  const handleEmailCheck = async () => {
    setEmailCheckMessage('ㆍ이메일 중복 확인 중 오류가 발생했습니다.');
    try {
    //   const response = await fetch(`/api/check-email?email=${formData.email}`);
    //   if (response.ok) {
    //     const data = await response.json();
    //     setEmailValid(data.isAvailable);
    //     setEmailCheckMessage(data.isAvailable ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
    //   } else {
    //     setEmailCheckMessage('이메일 중복 확인 중 오류가 발생했습니다.');
    //   }
    } catch (error) {
      setEmailCheckMessage('ㆍ이메일 중복 확인 중 오류가 발생했습니다.');
    }
  };
    const [formData, setFormData] = useState({
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
    });
  
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 확인 에러 메시지
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  
      // 비밀번호 확인 입력 시 유효성 검사
      if (name === 'confirmPassword') {
        setPasswordError(value !== formData.password ? 'ㆍ비밀번호가 일치하지 않습니다.' : '');
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // TODO: 회원가입 로직 구현 (입력값 유효성 검사, 서버 통신 등)
      console.log(formData);
    };
  
    return (
      <div className="register-container">
        <div className="register-box">
          <h2 className="register-title">회원가입</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">이메일</label>
              <div className="email-input-wrapper">
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                <button type="button" className="email-check-button" onClick={handleEmailCheck}>중복 확인</button>
              </div>
              {emailCheckMessage && <span className="check-message">{emailCheckMessage}</span>}
            </div>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <div><label htmlFor="confirmPassword">비밀번호 확인</label>   {passwordError && <span className="error-message">{passwordError}</span>}</div>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneNumberChange} required/>
            </div>
            <button type="submit" className="button">회원가입</button>
            <div className="register-info">
              <Link to="/login" className="login-link">로그인</Link> {/* 로그인 링크 추가 */}
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Register;