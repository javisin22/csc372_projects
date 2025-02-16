"use client";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

export default function CalendarPreview({ onClick }) {
  const [events, setEvents] = useState([
    // Retrieve events from API when available
  ]);

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
