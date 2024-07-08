import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일 추가
import { Modal } from 'antd';

function Calendar() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', color: '', category: '' }); // 새로운 이벤트 상태 추가

  const [workEvents, setWorkEvents] = useState([
    { title: '회의', date: '2024-06-28', color: 'green' },
  ]);

  const handleDateClick = (arg) => {
    // 날짜 클릭 시 이벤트 처리
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

  const handleDateSelect = (selectInfo) => {
    setNewEvent({ title: '', color: '', category: '' }); // 폼 초기화

    Modal.confirm({
      title: '새로운 일정',
      content: (
        <div>
          <div className="input-group">
            <label htmlFor="title">제목:</label>
            <input type="text" id="title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
          </div>
          <div className="input-group">
            <label htmlFor="color">색상:</label>
            <select id="color" value={newEvent.color} onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}>
              <option value="">선택</option>
              <option value="blue">파란색</option>
              <option value="green">녹색</option>
              <option value="red">빨간색</option>
              {/* ... 더 많은 색상 옵션 추가 ... */}
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="category">카테고리:</label>
            <select id="category" value={newEvent.category} onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}>
              <option value="">선택</option>
              <option value="personal">개인</option>
              <option value="work">업무</option>
              {/* ... 더 많은 카테고리 옵션 추가 ... */}
            </select>
          </div>
        </div>
      ),
      onOk() {
        setEvents([...events, { ...newEvent, start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay }]);
      },
      onCancel() {
        setNewEvent({ title: '', color: '', category: '' });
      },
    });
  };


  return (
    <div className="calendar">
      <h2>캘린더</h2>
      <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale={koLocale}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      eventSources={[
        { events, color: 'blue' }, // 개인 일정
        { events: workEvents, color: 'green' }, // 업무 일정
      ]}
      eventContent={renderEventContent}
      events={events}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      editable={true}
      selectable={true}
      select={handleDateSelect}
      selectMirror={true}
      dayMaxEvents={true}
      buttonText={{
        today: '오늘',
        month: '월',
        week: '주',
        day: '일',
        list: '목록',
      }} // 버튼 텍스트 한글화
    />
    </div>
  );
}

export default Calendar;