"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef, useEffect } from "react";
import AvailabilityModal from "../AvailabilityModal";
import DeleteModal from "../DeleteModal";

export default function CalendarPage() {
  const [events, setEvents] = useState([]); // holds both availability and booked sessions
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "create", "edit", "delete"
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("timeGridWeek");
  
  // Track initial load state to prevent double-loading from localStorage during StrictMode
  const initialLoadDone = useRef(false);

  // Refs for container and calendar instance
  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  
  // Load events from localStorage on component mount
  useEffect(() => {
    if (!initialLoadDone.current) {
      const savedEvents = localStorage.getItem('tutorAvailability');
      if (savedEvents) {
        try {
          // Parse saved events and convert date strings back to Date objects
          const parsedEvents = JSON.parse(savedEvents).map(evt => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end)
          }));
          console.log('Tutor availability loaded:', parsedEvents);
          setEvents(parsedEvents);
        } catch (error) {
          console.error('Error parsing saved availability:', error);
        }
      }
      initialLoadDone.current = true;
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (initialLoadDone.current && events.length > 0) {
      // Convert Date objects to ISO strings before storing
      const eventsToStore = events.map(evt => ({
        ...evt,
        start: evt.start instanceof Date ? evt.start.toISOString() : evt.start,
        end: evt.end instanceof Date ? evt.end.toISOString() : evt.end
      }));
      
      console.log('Saving tutor availability:', eventsToStore);
      localStorage.setItem('tutorAvailability', JSON.stringify(eventsToStore));
    }
  }, [events]);

  // ResizeObserver to update calendar size when container changes
  useEffect(() => {
    if (!containerRef.current || !calendarRef.current) return;
    const observer = new ResizeObserver(() => {
      calendarRef.current.getApi().updateSize();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Adjust calendar view and styling based on window width
  useEffect(() => {
    const handleResize = () => {
      const fcHeaderToolbar = window.jQuery(".fc-header-toolbar");
      if (window.innerWidth < 768) {
        setCurrentView("timeGridDay");
        if (window.jQuery) {
          window.jQuery("main").css("padding", "0");
          window.jQuery("#page-header").css("padding", "32px");
          fcHeaderToolbar.css("padding", "0.5rem 0.75rem");
          fcHeaderToolbar.css("font-size", "0.875rem");
        }
      } else {
        setCurrentView("timeGridWeek");
        if (window.jQuery) {
          window.jQuery("main").css("padding", "");
          window.jQuery("#page-header").css("padding", "");
          fcHeaderToolbar.css("padding", "");
          fcHeaderToolbar.css("font-size", "");
        }
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update the FullCalendar view when currentView changes
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(currentView);
    }
  }, [currentView]);

  // When a date range is selected, open modal to create a new availability slot
  const handleSelect = (selectInfo) => {
    setSelectedRange(selectInfo);
    setModalType("create");
    setModalOpen(true);
  };

  // Left-click on an event:
  // - For availability slots, allow editing.
  // - For booked sessions (with extendedProps.type === "booked"), prevent editing.
  const handleEventClick = (clickInfo) => {
    if (clickInfo.event.extendedProps.type === "booked") {
      // For booked sessions, you might show details rather than allow edits.
      alert("This session is booked and cannot be edited.");
    } else {
      setSelectedEvent(clickInfo.event);
      setModalType("edit");
      setModalOpen(true);
    }
  };

  // Right-click on an event for deletion (only for availability slots)
  const handleEventDidMount = (info) => {
    // Add tooltip for description if it exists
    if (info.event.extendedProps?.description) {
      const title = info.event.title;
      const description = info.event.extendedProps.description;
      
      // Use browser's native title attribute for simple tooltip
      info.el.setAttribute('title', `${title}\n\n${description}`);
    }
    
    info.el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (info.event.extendedProps.type !== "booked") {
        setSelectedEvent(info.event);
        setModalType("delete");
        setModalOpen(true);
      }
    });
  };

  // Handle confirmation from the create/edit modal
  const handleModalConfirm = (title, description) => {
    if (modalType === "create" && selectedRange) {
      // Create a new availability slot (note the added "type" property)
      const newEvent = {
        id: Date.now().toString(),
        title,
        description,
        start: selectedRange.start,
        end: selectedRange.end,
        extendedProps: { 
          type: "availability",
          description 
        },
      };
      setEvents([...events, newEvent]);
    } else if (modalType === "edit" && selectedEvent) {
      // Update the event title and description
      selectedEvent.setProp("title", title);
      selectedEvent.setExtendedProp("description", description);
      
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id ? { 
            ...evt, 
            title,
            description,
            extendedProps: { 
              ...evt.extendedProps,
              description 
            } 
          } : evt
        )
      );
    }
    closeModal();
  };

  // Handle deletion confirmation
  const handleDeleteConfirm = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((evt) => evt.id !== selectedEvent.id)
      );
    }
    closeModal();
  };

  // Update event when its time is resized
  const handleEventResize = (resizeInfo) => {
    const resizedEvent = resizeInfo.event;
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === resizedEvent.id
          ? { ...evt, start: resizedEvent.start, end: resizedEvent.end }
          : evt
      )
    );
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType(null);
    setSelectedRange(null);
    setSelectedEvent(null);
  };

  return (
    <div ref={containerRef} className="min-h-screen overflow-y-auto">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={currentView}
        height={currentView === "timeGridDay" ? "100vh" : "auto"}
        selectable={true}
        selectMirror={true}
        editable={true}
        eventResizableFromStart={false}
        select={handleSelect}
        events={events}
        eventClick={handleEventClick}
        eventDidMount={handleEventDidMount}
        eventResize={handleEventResize}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClassNames={(arg) => {
          // Add different classes based on event type
          return arg.event.extendedProps.type === "booked" ? "booked-event" : "availability-event";
        }}
      />
      {modalOpen && (modalType === "create" || modalType === "edit") && (
        <AvailabilityModal
          initialTitle={
            modalType === "edit" && selectedEvent ? selectedEvent.title : ""
          }
          initialDescription={
            modalType === "edit" && selectedEvent ? 
              selectedEvent.extendedProps?.description || "" : ""
          }
          onClose={closeModal}
          onConfirm={handleModalConfirm}
          mode={modalType}
        />
      )}
      {modalOpen && modalType === "delete" && (
        <DeleteModal onClose={closeModal} onConfirm={handleDeleteConfirm} />
      )}
    </div>
  );
}