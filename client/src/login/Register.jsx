import React, { useState } from 'react';
import '../css/Register.css';
import '../css/common.css';
import { Link, useNavigate } from 'react-router-dom';
import { checkEmail, registerUser } from "../apis/api/userManage";

function Register() {
  const navigate = useNavigate();
  const [emailValid, setEmailValid] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setEmailValid(false);
      setEmailCheckMessage('유효한 이메일 주소를 입력하세요.')
      return;
    }

    try {
      const res = await checkEmail(formData.email);
      if (res.code === 200) {
        setEmailValid(res.value);
        setEmailCheckMessage(res.value ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.');
      } else {
        setEmailValid(res.value);
        setEmailCheckMessage('이메일 중복 확인 중 오류가 발생했습니다.');
      }
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
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 영문+숫자 조합

      setFormData({ ...formData, [name]: value });
      // 비밀번호 확인 입력 시 유효성 검사
      if (name === 'password') {
        setPasswordError(!passwordRegex.test(value) ? 'ㆍ비밀번호는 최소 8자 이상이며, 영문과 숫자를 포함해야 합니다.' : '');
      }
 
      if (name === 'confirmPassword') {
        setPasswordError(value !== formData.password ? 'ㆍ비밀번호가 일치하지 않습니다.' : '');
      }
    };

    const validateForm = () => {
      const errors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // 최소 8자, 영문+숫자 조합
      const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  
      if (!emailRegex.test(formData.email)) {
        errors.email = '유효한 이메일 주소를 입력하세요.';
      }
      if (!passwordRegex.test(formData.password)) {
        errors.password = '비밀번호는 최소 8자 이상이며, 영문과 숫자를 포함해야 합니다.';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
      }
      if (!phoneNumberRegex.test(formData.phoneNumber)) {
        errors.phoneNumber = '유효한 전화번호를 입력하세요.';
      }
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0; // 에러가 없으면 true 반환
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (validateForm() && emailValid) { // 유효성 검사 및 이메일 중복 확인 통과 시
        try {
          const res = await registerUser(formData);
          if (res.code === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/'); // 로그인 성공 시 메인 페이지로 이동
          } else {
            alert(res.message);
          }
        } catch (error) {
          console.error(error);
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
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
              {emailCheckMessage && <span className={`check-message ${emailValid ? 'success' : 'error'}`}>{emailCheckMessage}</span>}
              {formErrors.email && <span className="error-message">{formErrors.email}</span>} {/* 이메일 에러 메시지 */}
            </div>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <div><label htmlFor="password">비밀번호</label>  {passwordError && <span className="error-message">{passwordError}</span>}</div>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="input-group">
                <div><label htmlFor="confirmPassword">비밀번호 확인</label></div>
                <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber">전화번호</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handlePhoneNumberChange} required/>
            </div>
            <button type="submit" className="button" disabled={!emailValid}>회원가입</button>
            <div className="register-info">
              <Link to="/login" className="login-link">로그인</Link> {/* 로그인 링크 추가 */}
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default Register;