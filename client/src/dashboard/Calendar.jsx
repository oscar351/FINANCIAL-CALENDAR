import React from 'react';
import { Calendar as ReactCalendar } from 'react-calendar'; // 달력 라이브러리
import Chart from './Chart'; // 차트 컴포넌트

function Calendar() {
  return (
    <div className="calendar">
      <h2>캘린더</h2> 
      <ReactCalendar />
      <Chart type="calendar" /> {/* 캘린더 관련 차트 */}
    </div>
  );
}

export default Calendar;