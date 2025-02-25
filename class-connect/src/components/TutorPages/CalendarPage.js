"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef, useEffect } from "react";
import AvailabilityModal from "../AvailabilityModal";
import DeleteModal from "../DeleteModal";

// 🎃 See how to do the blocking time slots. Now I have: "clickInfo.event.extendedProps.type === "booked"
// but I must learn how to create events with "booked" status.

export default function CalendarPage() {
  const [events, setEvents] = useState([]); // holds both availability and booked sessions
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "create", "edit", "delete"
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("timeGridWeek");

  // Refs for container and calendar instance
  const containerRef = useRef(null);
  const calendarRef = useRef(null);

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
  const handleModalConfirm = (title) => {
    if (modalType === "create" && selectedRange) {
      // Create a new availability slot (note the added "type" property)
      const newEvent = {
        id: Date.now().toString(),
        title,
        start: selectedRange.start,
        end: selectedRange.end,
        extendedProps: { type: "availability" },
      };
      setEvents([...events, newEvent]);
    } else if (modalType === "edit" && selectedEvent) {
      selectedEvent.setProp("title", title);
      setEvents((prevEvents) =>
        prevEvents.map((evt) =>
          evt.id === selectedEvent.id ? { ...evt, title } : evt
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
      />
      {modalOpen && (modalType === "create" || modalType === "edit") && (
        <AvailabilityModal
          initialTitle={
            modalType === "edit" && selectedEvent ? selectedEvent.title : ""
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
