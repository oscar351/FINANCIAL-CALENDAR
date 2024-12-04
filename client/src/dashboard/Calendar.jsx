import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import '../css/fullcalendarCustom.css';

import CalendarModal from './Component/CalendarModal';

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
    const renderDayContent = (args) => {
        return args.dayNumberText.replace('일', ''); // '일' 제거
    };
    const handleDateSelect = (selectInfo) => {
        const today = new Date(); // 오늘 날짜 가져오기
        console.log(today);
        today.setDate(today.getDate() + 1);
        console.log(new Date(selectInfo.start));
        // selectInfo가 없으면 (즉, "+" 버튼 클릭 시) 오늘 날짜를 기본값으로 설정
        const start = selectInfo.start ? selectInfo.start : today;
        const end = selectInfo.end ? selectInfo.end : today;

        end.setDate(end.getDate() - 1);

        setNewEvent({ ...newEvent, start: start, end: end });
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        const ed = new Date(newEvent.end);
        ed.setDate(ed.getDate() + 1);
        console.log(newEvent.start);
        console.log(newEvent.end);
        setEvents([...events, {
            title: newEvent.title === '' ? '제목없음' : newEvent.title,
            start: newEvent.start,
            end: ed,
            allDay: true,
            color: 'green',
            description: newEvent.description,
        }]);
        setIsModalVisible(false);
        setNewEvent({
            title: '',
            start: null,
            end: null,
            allDay: true,
            color: '',
            description: '',
        });
    };

    return (
        <div className="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                initialView={currentView}
                locale={koLocale}
                ref={calendarRef}
                headerToolbar={headerToolbar}
                // eventSources={[
                //     { events, color: 'blue' }, // 개인 일정
                //     { events: workEvents, color: 'green' }, // 업무 일정
                // ]}
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
            {isModalVisible && (
                <CalendarModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    handleModalOk={handleModalOk}
                />
            )}

        </div>
    );
}

export default Calendar;