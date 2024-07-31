import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Modal, DatePicker, Input, Select } from 'antd';
import moment from 'moment';
import '../css/fullcalendarCustom.css';

function Calendar() {

    const [events, setEvents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: null,
        end: null,
        allDay: true,
        color: '',
        description: '',
    });
    const [headerToolbar, setheaderToolbar] = useState({ left: 'prevYear,prev,next,nextYear today', center: 'title', right: 'changeList dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear' });
    const [currentView, setCurrentView] = useState("dayGridMonth");
    const calendarRef = useRef(null);
    const [workEvents, setWorkEvents] = useState([
        { title: '회의', date: '2024-06-28', color: 'green' },
    ]);
    const [calendarHeight, setCalendarHeight] = useState(window.innerHeight - 120); // 예시: 상단 요소 높이 100px 제외

    const handleDateClick = (arg) => {
        // 날짜 클릭 시 이벤트 처리
        const calendarApi = calendarRef.current.getApi()
        console.log(calendarApi);
        console.log(arg.dateStr); // 클릭된 날짜 출력
    };

    const handleEventClick = (info) => {
        // 이벤트 클릭 시 이벤트 처리

        console.log(info.event.title); // 클릭된 이벤트 제목 출력
    };
    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };
    const renderDayContent = (args) => {
        return args.dayNumberText.replace('일', ''); // '일' 제거
    };
    const handleDateSelect = (selectInfo) => {
        console.log(selectInfo);
        setNewEvent({ ...newEvent, start: selectInfo.startStr, end: selectInfo.endStr });
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setEvents([...events, newEvent]);
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
    };


    return (
        <div className="calendar">
            <h2>캘린더</h2>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                initialView={currentView}
                locale={koLocale}
                ref={calendarRef}
                headerToolbar={headerToolbar}
                eventSources={[
                    { events, color: 'blue' }, // 개인 일정
                    { events: workEvents, color: 'green' }, // 업무 일정
                ]}
                eventContent={renderEventContent}
                events={events}
                //dateClick={handleDateClick}
                eventClick={handleEventClick}
                height={calendarHeight}
                editable={true}
                selectable={true}
                select={handleDateSelect}
                selectMirror={true}
                dayMaxEvents={true}
                navLinks={true}
                dayCellContent={renderDayContent} // dayCellContent 옵션 추가
                buttonText={{
                    today: '오늘',
                    month: '월',
                    week: '주',
                    day: '일',
                    listYear: '년',
                    listMonth: '월',
                    listWeek: '주',
                    listDay: '일',
                    multiMonthYear: '년',
                }} // 버튼 텍스트 한글화
                customButtons={{
                    changeList: {
                        text: "리스트",
                        click: () => {
                            setheaderToolbar({ left: 'prev,next today', center: 'title', right: 'changeOrigin listMonth,listWeek,listDay,listYear' })
                            setCurrentView("listMonth");
                            const calendarApi = calendarRef.current.getApi(); // 캘린더 객체 가져오기
                            calendarApi.changeView("listMonth");
                        }
                    },
                    changeOrigin: {
                        text: "달력형",
                        click: () => {
                            setheaderToolbar({ left: 'prev,next today', center: 'title', right: 'changeList dayGridMonth,timeGridWeek,timeGridDay,multiMonthYear' })
                            setCurrentView("dayGridMonth");
                            const calendarApi = calendarRef.current.getApi(); // 캘린더 객체 가져오기
                            calendarApi.changeView("dayGridMonth");

                        }
                    }
                }}
            />
            <button className='add-event-button' onClick={handleDateSelect}>+</button>
            <Modal
                title=" "
                visible={isModalVisible}
                okText="저장"
                cancelText="취소"
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                className='custom-modal'
            >
                <div className="group-area">
                    <textarea className="css-mbl85r-UnderLinedTextArea__Box" placeholder="일정 제목" name="title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}></textarea>
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
                        <div className='datePickerStart'>8월 9일 월</div>
                        <div className='timePickerStart'>15:23</div>
                        <div className='datePickerDivider'>-</div>
                        <div className='datePickerEnd'>8월 10일</div>
                        <div className='timePickerEnd'>15:33</div>
                    </div>
                    <div className='datePickerBtn'>
                        <input type='checkbox' />
                        <label >시간 설정</label>
                    </div>
                </div>
                <div className="group-area">
                    <label htmlFor="description">알림</label>
                    <ul>
                        <li>이벤트 당일(오전 9시)</li>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}

export default Calendar;