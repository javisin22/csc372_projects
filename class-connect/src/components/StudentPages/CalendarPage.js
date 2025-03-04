"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef, useEffect } from "react";
import AppointmentModal from "../AppointmentModal";
import DeleteModal from "../DeleteModal";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "create", "edit", "delete"
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("timeGridWeek");

  // Track the initial load state to prevent double-loading from localStorage during StrictMode's double mount
  const initialLoadDone = useRef(false); 

  // Create refs for container and calendar instance
  const containerRef = useRef(null);
  const calendarRef = useRef(null);

  // Load events from localStorage on component mount
  useEffect(() => {
    if (!initialLoadDone.current) { 
      const savedEvents = localStorage.getItem('calendarEvents');
      if (savedEvents) {
        try {
          // Parse saved events and convert date strings back to Date objects
          const parsedEvents = JSON.parse(savedEvents).map(evt => ({
            ...evt,
            start: new Date(evt.start),
            end: new Date(evt.end)
          }));
          console.log('Parsed events:', parsedEvents);
          setEvents(parsedEvents);
        } catch (error) {
          console.error('Error parsing saved events:', error);
        }
      }
      initialLoadDone.current = true
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    // Skip saving on initial render when events is empty
    if (initialLoadDone.current && events.length > 0) {
      // Convert Date objects to ISO strings before storing
      const eventsToStore = events.map(evt => ({
        ...evt,
        start: evt.start instanceof Date ? evt.start.toISOString() : evt.start,
        end: evt.end instanceof Date ? evt.end.toISOString() : evt.end
      }));
      
      console.log('Saving events to localStorage:', eventsToStore);
      localStorage.setItem('calendarEvents', JSON.stringify(eventsToStore));
    }
  }, [events]);

  // Use a ResizeObserver to trigger a resize on the calendar when container changes
  useEffect(() => {
    if (!containerRef.current || !calendarRef.current) return;
    const observer = new ResizeObserver(() => {
      calendarRef.current.getApi().updateSize();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Window resize handler for adjusting current view
  useEffect(() => {
    const handleResize = () => {
      const fcHeaderToolbar = window.jQuery(".fc-header-toolbar");
      if (window.innerWidth < 768) {
        setCurrentView("timeGridDay");
        // set the padding for "main" to 0 using jQuery
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
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // When currentView state changes, update the calendar view using the API
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(currentView);
    }
  }, [currentView]);

  // When a date range is selected, open the modal to create a new event
  const handleSelect = (selectInfo) => {
    setSelectedRange(selectInfo);
    setModalType("create");
    setModalOpen(true);
  };

  // Left-click: open modal for editing event title
  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setModalType("edit");
    setModalOpen(true);
  };

  // Right-click: open modal for deletion confirmation
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
      setSelectedEvent(info.event);
      setModalType("delete");
      setModalOpen(true);
    });
  };

  // Handler for the create/edit modal confirmation
  const handleModalConfirm = (title, description) => {
    if (modalType === "create" && selectedRange) {
      const newEvent = {
        id: Date.now().toString(),
        title,
        description, // Store description in the event object
        start: selectedRange.start,
        end: selectedRange.end,
        extendedProps: { description } // Also include in extendedProps for FullCalendar
      };
      setEvents([...events, newEvent]);
    } else if (modalType === "edit" && selectedEvent) {
      // Update the event in our state
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id 
            ? { 
                ...evt, 
                title, 
                description,
                extendedProps: { ...evt.extendedProps, description }
              } 
            : evt
        )
      );
      
      // Update the FullCalendar event
      selectedEvent.setProp("title", title);
      // Update extendedProps for description
      selectedEvent.setExtendedProp("description", description);
    }
    closeModal();
  };

  // Handler for deletion confirmation modal
  const handleDeleteConfirm = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.filter((evt) => evt.id !== selectedEvent.id)
      );
    }
    closeModal();
  };

  const handleEventResize = (resizeInfo) => {
    const resizedEvent = resizeInfo.event;
    setEvents((prevEvents) =>
      prevEvents.map((evt) =>
        evt.id === resizedEvent.id
          ? { 
              ...evt, 
              start: resizedEvent.start, 
              end: resizedEvent.end 
            }
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
      />
      {modalOpen && (modalType === "create" || modalType === "edit") && (
        <AppointmentModal
          initialTitle={
            modalType === "edit" && selectedEvent ? selectedEvent.title : ""
          }
          initialDescription={
            modalType === "edit" && selectedEvent ? 
              selectedEvent.extendedProps?.description || "" : ""
          }
          onClose={closeModal}
          onConfirm={handleModalConfirm}
        />
      )}
      {modalOpen && modalType === "delete" && (
        <DeleteModal onClose={closeModal} onConfirm={handleDeleteConfirm} />
      )}
    </div>
  );
}