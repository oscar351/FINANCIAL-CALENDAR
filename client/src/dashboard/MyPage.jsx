import React, { useState, useEffect } from 'react';
import ResetPasswordModal from '../login/ResetPasswordModal'
import { getMyInfo } from '../apis/api/userManage';
import profileImage from '../assets/images/defaultProfile.png';
import '../css/MyPage.css';

function MyPage() {
    const [userInfo, setUserInfo] = useState({
        profileImage: profileImage,
        name: '',
        email: '',
        provider: '',
        phoneNumber: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [originalUserInfo, setOriginalUserInfo] = useState({ ...userInfo }); // 수정 전 정보 저장
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await getMyInfo();
                console.log(res);
                setUserInfo({ ...userInfo, name: res.value.username, email: res.value.email, provider: res.value.provider, phoneNumber: res.value.phoneNumber });
                setOriginalUserInfo({ ...userInfo, name: res.value.username, email: res.value.email, provider: res.value.provider, phoneNumber: res.value.phoneNumber });
            } catch (error) {
                console.log(error);
                alert("error");
            }
        }
        // 서버에서 사용자 정보 가져오는 API 호출
        getInfo();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleEditPasswordClick = () => {
        setIsPasswordEditing(true);
    }

    const handleSaveClick = () => {
        // 수정된 사용자 정보를 서버로 전송하는 API 호출
        fetch('/api/user-info', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInfo),
        })
            .then(res => res.json())
            .then(data => {
                setUserInfo(data);
                setIsEditing(false);
            });
    };

    const handleCancelClick = () => {
        setUserInfo(originalUserInfo); // 수정 전 정보로 되돌림
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };
    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            <div className="profile-section">
                {isEditing ? (<h2 className='profile-sectionTitle'>사용자 프로필 수정</h2>) : (<h2 className='profile-sectionTitle'>사용자 프로필</h2>)}
                <div className='profileContent'>
                    <div className='image-item'>
                        <img src={userInfo.profileImage} alt="프로필 사진" className="profile-image" />
                        {isEditing && (
                            <label htmlFor="avatar-upload" className='avatarUpload'>
                                프로필 사진 변경
                                <input id="avatar-upload" type="file" accept="image/*" name="profileImage" onChange={handleInputChange} className="file-input" />
                            </label>
                        )}
                    </div>
                    {isEditing ? (
                        <div className="edit-profile">
                            <div className="user-info-item">
                                <h3 className='userName'>{userInfo.name}</h3>
                            </div>
                            <div className="user-info-item">
                                <p className='userEmail'>{userInfo.email}</p>
                            </div>
                            <div className="user-info-item">
                                <p className='userInfo'><strong>로그인 형태 : </strong>{userInfo.provider}</p>
                            </div>
                            <div className="user-info-item">
                                <label htmlFor="phoneNumber" className='infoLabel'>전화번호:</label>
                                <input id="phoneNumber" type="tel" value={userInfo.phoneNumber} onChange={(e) => setUserInfo({ ...userInfo, phoneNumber: e.target.value })} className='infoInput' />
                            </div>
                            <div className="button-group">
                                <button onClick={handleSaveClick} className="save-button">저장</button>
                                <button onClick={handleCancelClick} className="cancel-button">취소</button>
                            </div>
                        </div>
                    ) : (
                        <div className="user-info">
                            <h3 className='userName'>{userInfo.name}</h3>
                            <p className='userEmail'>{userInfo.email}</p>
                            <p className='userInfo'><strong>로그인 형태 : </strong>{userInfo.provider}</p>
                            <p className='userInfo'><strong>전화번호 : </strong>{userInfo.phoneNumber}</p>
                            <div className="button-group">
                                <button onClick={handleEditClick} className="edit-button">프로필 수정</button>
                                <button onClick={handleEditPasswordClick} className="edit-button">비밀번호 재설정</button>
                            </div>
                            <ResetPasswordModal
                                isOpen={isPasswordEditing}
                                onRequestClose={() => setIsPasswordEditing(false)}
                                passwordData={userInfo}
                                errMsg={errMsg}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default MyPage;