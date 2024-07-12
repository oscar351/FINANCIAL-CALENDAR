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
    setNewEvent({ ...newEvent, start: selectInfo.startStr, end : selectInfo.endStr });
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
        listMonth : '월',
        listWeek : '주',
        listDay : '일',
        multiMonthYear : '년',
      }} // 버튼 텍스트 한글화
      customButtons={{
        changeList : {
          text : "리스트",
          click : () =>{
            setheaderToolbar({ left: 'prev,next today', center: 'title', right: 'changeOrigin listMonth,listWeek,listDay,listYear' })
            setCurrentView("listMonth");
            const calendarApi = calendarRef.current.getApi(); // 캘린더 객체 가져오기
            calendarApi.changeView("listMonth");
          }
        },
        changeOrigin : {
          text : "달력형",
          click : () =>{
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
        title="일정 추가"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <div className="input-group">
          <label htmlFor="title">제목:</label>
          <Input id="title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        </div>
        <div className="input-group">
          <label htmlFor="date-range">날짜:</label>
          <DatePicker.RangePicker
            id="date-range"
            value={[newEvent.start ? moment(newEvent.start) : null, newEvent.end ? moment(newEvent.end) : null]}
            onChange={([start, end]) => setNewEvent({ ...newEvent, start, end })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="color">색상:</label>
          <Select id="color" value={newEvent.color} onChange={(value) => setNewEvent({ ...newEvent, color: value })}>
            <Select.Option value="blue">파란색</Select.Option>
            <Select.Option value="green">녹색</Select.Option>
            <Select.Option value="red">빨간색</Select.Option>
            {/* ... 더 많은 색상 옵션 추가 ... */}
          </Select>
        </div>
        <div className="input-group">
          <label htmlFor="description">내용:</label>
          <Input.TextArea id="description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
        </div>
      </Modal>
    </div>
  );
}

export default Calendar;