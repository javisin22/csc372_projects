"use client";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

export default function CalendarPreview({ onClick }) {
  const [events, setEvents] = useState([
    // Sample events
  ]);

  // Optional: keep the select handler if you want interaction in preview mode.
  const handleSelect = (selectInfo) => {
    const title = prompt("Enter appointment title:");
    if (title) {
      const newEvent = {
        id: Date.now().toString(),
        title,
        start: selectInfo.start,
        end: selectInfo.end,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div onClick={onClick} className="cursor-pointer">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={events}
        selectable={false} // Disable selection in preview
        headerToolbar={false} // Hide toolbar for clean preview
        height={250}
        contentHeight={250}
        aspectRatio={1.5}
      />
    </div>
  );
}
