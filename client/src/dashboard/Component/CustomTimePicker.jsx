import React, { useState } from 'react';
import '../../css/CustomTimePicker.css'; // CSS 파일 경로 확인

function CustomTimePicker({ value, onChange }) {
    const [isHourOpen, setIsHourOpen] = useState(false);
    const [isMinuteOpen, setIsMinuteOpen] = useState(false);
    const [isAmPmOpen, setIsAmPmOpen] = useState(false);

    const [selectedHour, setSelectedHour] = useState(value ? value.getHours() % 12 || 12 : 12); // 12시간 형식으로 변환
    const [selectedMinute, setSelectedMinute] = useState(value ? value.getMinutes() : 0);
    const [selectedAmPm, setSelectedAmPm] = useState(value ? (value.getHours() < 12 ? '오전' : '오후') : '오전');

    const handleHourChange = (hour) => {
        setSelectedHour(hour);
        setIsHourOpen(false);
        const newHour = selectedAmPm === '오전' ? hour : hour + 12;
        onChange(new Date(value.getFullYear(), value.getMonth(), value.getDate(), newHour, selectedMinute));
    };

    const handleMinuteChange = (minute) => {
        setSelectedMinute(minute);
        setIsMinuteOpen(false);
        const newHour = selectedAmPm === '오전' ? selectedHour : selectedHour + 12;
        onChange(new Date(value.getFullYear(), value.getMonth(), value.getDate(), newHour, minute));
    };

    const handleAmPmChange = (amPm) => {
        setSelectedAmPm(amPm);
        setIsAmPmOpen(false);
        const newHour = amPm === '오전' ? selectedHour : selectedHour + 12;
        onChange(new Date(value.getFullYear(), value.getMonth(), value.getDate(), newHour, selectedMinute));
    };

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const amPms = ['오전', '오후'];

    return (
        <div className="custom-time-picker">
            <div className="time-picker-group">
                <div className="time-picker-display" onClick={() => {setIsAmPmOpen(!isAmPmOpen);setIsHourOpen(false);setIsMinuteOpen(false)}}>
                    {selectedAmPm}
                </div>
                {isAmPmOpen && (
                    <div className="time-picker-dropdown">
                        {amPms.map((amPm) => (
                            <div key={amPm} className={`time-picker-item ${selectedAmPm === amPm ? 'selected' : ''}`} onClick={() => handleAmPmChange(amPm)}>
                                {amPm}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="time-picker-group">
                <div className="time-picker-display" onClick={() => {setIsHourOpen(!isHourOpen);setIsAmPmOpen(false);setIsMinuteOpen(false)}}>
                    {selectedHour}
                </div>
                {isHourOpen && (
                    <div className="time-picker-dropdown">
                        {hours.map((hour) => (
                            <div key={hour} className={`time-picker-item ${selectedHour === hour ? 'selected' : ''}`} onClick={() => handleHourChange(hour)}>
                                {hour}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="time-picker-group">
                <span>:</span>
            </div>
            <div className="time-picker-group">
                <div className="time-picker-display" onClick={() => {setIsMinuteOpen(!isMinuteOpen);setIsAmPmOpen(false);setIsHourOpen(false);}}>
                    {selectedMinute.toString().padStart(2, '0')} {/* 2자리로 표시 */}
                </div>
                {isMinuteOpen && (
                    <div className="time-picker-dropdown">
                        {minutes.map((minute) => (
                            <div key={minute} className={`time-picker-item ${selectedMinute === minute ? 'selected' : ''}`} onClick={() => handleMinuteChange(minute)}>
                                {minute.toString().padStart(2, '0')}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CustomTimePicker;