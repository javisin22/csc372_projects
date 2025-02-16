"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useRef, useEffect } from "react";
import AppointmentModal from "./AppointmentModal";
import DeleteModal from "./DeleteModal";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "create", "edit", "delete"
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Create a ref for the calendar container and instance
  const containerRef = useRef(null);
  const calendarRef = useRef(null);

  // Use a ResizeObserver to trigger a resize on the calendar when container changes
  useEffect(() => {
    if (!containerRef.current || !calendarRef.current) return;
    const observer = new ResizeObserver(() => {
      calendarRef.current.getApi().updateSize();
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
    info.el.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      setSelectedEvent(info.event);
      setModalType("delete");
      setModalOpen(true);
    });
  };

  // Handler for the create/edit modal confirmation
  const handleModalConfirm = (title) => {
    if (modalType === "create" && selectedRange) {
      const newEvent = {
        id: Date.now().toString(),
        title,
        start: selectedRange.start,
        end: selectedRange.end,
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
    // Update the event's start and end times in state
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
    <div ref={containerRef} className="p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true} // Allow date range selection
        selectMirror={true} // Create a mirror when dragging an event
        editable={true} // Enable event dragging/resizing
        eventResizableFromStart={false} // Allow resizing only from the bottom edge
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
