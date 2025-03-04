"use client";

import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';

export default function CalendarPreview({ onClick, userType = "student" }) {
  const [events, setEvents] = useState([]);
  
  // Determine which localStorage key to use based on userType
  const storageKey = userType === "tutor" ? 'tutorAvailability' : 'calendarEvents';

  // Load events from localStorage when component mounts
  useEffect(() => {
    const loadEvents = () => {
      try {
        const savedEvents = localStorage.getItem(storageKey);
        if (savedEvents) {
          // Parse saved events and convert date strings back to Date objects
          const parsedEvents = JSON.parse(savedEvents).map(evt => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end)
          }));
          setEvents(parsedEvents);
        }
      } catch (error) {
        console.error(`Error loading ${userType} events in preview:`, error);
      }
    };
    
    loadEvents();
    
    // Add event listener to update preview if calendar events change
    window.addEventListener('storage', (e) => {
      if (e.key === storageKey) {
        loadEvents();
      }
    });
    
    return () => {
      window.removeEventListener('storage', loadEvents);
    };
  }, [storageKey, userType]);

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
        // Additional options to simplify the preview
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        nowIndicator={true}
        eventClassNames={(arg) => {
          // Add different classes based on event type (for tutor view)
          if (userType === "tutor" && arg.event.extendedProps?.type) {
            return arg.event.extendedProps.type === "booked" ? "booked-event" : "availability-event";
          }
          return "";
        }}
      />
      <div className="text-center mt-2 text-sm text-gray-500">
        {userType === "tutor" ? (
          <span>Click to view availability calendar ({events.length} slots)</span>
        ) : (
          <span>Click to view appointment calendar ({events.length} events)</span>
        )}
      </div>
    </div>
  );
}