import React, { useState, useRef, useEffect } from 'react';
import { Modal, Checkbox } from 'antd';
import Calendar from 'react-calendar';

import CustomTimePicker from './CustomTimePicker';

import '../../css/fullcalendarCustom.css'; // CSS 파일 경로 확인
import 'react-calendar/dist/Calendar.css';

function CalendarModal({ isModalVisible, setIsModalVisible, newEvent, setNewEvent, handleModalOk }) {
    const textareaRef = useRef(null);
    const handleTitleChange = (e) => setNewEvent({ ...newEvent, title: e.target.value });
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(newEvent.start);
    const [endDate, setEndDate] = useState(newEvent.end);
    const [showTimePicker, setShowTimePicker] = useState(false); // 시간 설정 체크박스 상태
    const [startTime, setStartTime] = useState(newEvent.start ? new Date(newEvent.start) : null);
    const [endTime, setEndTime] = useState(newEvent.end ? new Date(newEvent.end) : null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "57px"; // 초기 높이 자동 설정
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이에 맞춰 조절
        }
    }, [newEvent.title]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        if (endDate && date > endDate) { // 시작일이 종료일보다 늦을 경우
            setEndDate(date); // 종료일을 시작일과 같게 설정
            setNewEvent({ ...newEvent, start: date ? date.toISOString() : null, end: date ? date.toISOString() : null });
        } else {
            setNewEvent({ ...newEvent, start: date ? date.toISOString() : null });
        }
        setShowStartDatePicker(false);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        if (startDate && date < startDate) { // 종료일이 시작일보다 빠를 경우
            setStartDate(date); // 시작일을 종료일과 같게 설정
            setNewEvent({ ...newEvent, start: date ? date.toISOString() : null, end: date ? date.toISOString() : null });
        } else {
            setNewEvent({ ...newEvent, end: date ? date.toISOString() : null });
        }
        setShowEndDatePicker(false);
    };
    const handleStartTimeChange = (time) => {
        setStartTime(time);
        if (startDate && time) {
            const newStart = new Date(startDate);
            newStart.setHours(time.getHours());
            newStart.setMinutes(time.getMinutes());
            setNewEvent({ ...newEvent, start: newStart.toISOString() });
        }
    };

    const handleEndTimeChange = (time) => {
        setEndTime(time);
        if (endDate && time) {
            const newEnd = new Date(endDate);
            newEnd.setHours(time.getHours());
            newEnd.setMinutes(time.getMinutes());
            setNewEvent({ ...newEvent, end: newEnd.toISOString() });
        }
    };

    return (
        <Modal
            title=" "
            visible={isModalVisible}
            okText="저장"
            cancelText="취소"
            onOk={handleModalOk}
            onCancel={() => setIsModalVisible(false)}
            className='custom-modal'
        >
            <div className="group-area">
                <textarea ref={textareaRef} className="css-mbl85r-UnderLinedTextArea__Box" placeholder="일정 제목" name="title" value={newEvent.title} onChange={handleTitleChange}></textarea>
            </div>
            <div className="group-area rows">
                <div className='colorPicker'>
                    <div className='colorPickerBtn'>컬러</div>
                </div>
                <div className='categoryPicker'>
                    <div className='categoryPickerBtn'>개인</div>
                </div>
            </div>
            <div className='group-area column'>
                <div className='datePickerContainer'>
                    <div className="datePickerStart" onClick={() => setShowStartDatePicker(true)}>
                        {startDate ? startDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'narrow' }) : '날짜 선택'}
                    </div>
                    {showStartDatePicker && (
                        <Calendar
                            value={startDate}
                            formatDay={(locale, date) => date.getDate()}
                            calendarType='gregory'
                            onChange={handleStartDateChange}
                            locale="ko-KR"
                            tileClassName={({ date, view }) => {
                                if (date.getDay() === 6) { // 6은 토요일을 나타냅니다. 
                                    return 'blue-text';
                                } else {
                                    return 'black-text';
                                }
                            }}
                        />
                    )}
                    {showTimePicker && ( // showTimePicker가 true일 때만 TimePicker 렌더링
                        <>
                            <CustomTimePicker value={startTime} onChange={handleStartTimeChange} className="timePickerStart" />
                        </>
                    )}
                    <div className='datePickerDivider'>-</div>
                    <div className="datePickerEnd" onClick={() => setShowEndDatePicker(true)}>
                        {endDate ? endDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'narrow' }) : '날짜 선택'}
                    </div>
                    {showEndDatePicker && (
                        <Calendar
                            value={endDate}
                            formatDay={(locale, date) => date.getDate()}
                            //firstDayOfWeek={0} // 일요일을 첫 번째 요일로 설정
                            calendarType='gregory'
                            onChange={handleEndDateChange}
                            locale="ko-KR"
                            tileClassName={({ date, view }) => {
                                if (date.getDay() === 6) { // 6은 토요일을 나타냅니다. 
                                    return 'blue-text';
                                } else {
                                    return 'black-text';
                                }
                            }}
                        />
                    )}
                    {showTimePicker && ( // showTimePicker가 true일 때만 TimePicker 렌더링
                        <>
                            <CustomTimePicker value={endTime} onChange={handleEndTimeChange} className="timePickerEnd" />
                        </>
                    )}
                </div>
                <div className='datePickerBtn'>
                    <Checkbox id="custom-timePickerCheck" checked={showTimePicker} onChange={(e) => setShowTimePicker(e.target.checked)}>시간 설정</Checkbox>
                </div>
            </div>
            <div className='seperator'></div>
            <div className="group-area">
                <label htmlFor="description">알림</label>
                <ul>
                    <li>이벤트 당일(오전 9시)</li>
                </ul>
            </div>
        </Modal>

    )
}

export default CalendarModal;