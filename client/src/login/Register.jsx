import React, { useState } from 'react';
import '../css/Register.css';
import '../css/common.css';

function Register() {
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
        setPasswordError(value !== formData.password ? '비밀번호가 일치하지 않습니다.' : '');
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
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
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
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <button type="submit" className="button">회원가입</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Register;