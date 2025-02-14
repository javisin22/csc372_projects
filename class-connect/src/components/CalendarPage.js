"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  // When a date range is selected, add a new event
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

  // Left-click: edit event title
  const handleEventClick = (clickInfo) => {
    const newTitle = prompt("Edit event title:", clickInfo.event.title);
    if (newTitle) {
      // Update the event in FullCalendar
      clickInfo.event.setProp("title", newTitle);
      // Update the local state to keep in sync
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === clickInfo.event.id ? { ...evt, title: newTitle } : evt
        )
      );
    }
  };

  // Attach a right-click (contextmenu) listener to enable deletion
  const handleEventDidMount = (info) => {
    info.el.addEventListener("contextmenu", (e) => {
      e.preventDefault(); // Prevent the default context menu
      if (window.confirm("Delete Event?")) {
        setEvents((prevEvents) =>
          prevEvents.filter((evt) => evt.id !== info.event.id)
        );
      }
    });
  };

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        selectMirror={true}
        select={handleSelect}
        events={events}
        eventClick={handleEventClick}
        eventDidMount={handleEventDidMount}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}
