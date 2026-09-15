import React from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function VirtualController({ onButtonPress, onButtonRelease }) {
  const triggerKey = (key, eventType = "keydown") => {
    const event = new KeyboardEvent(eventType, { key: key, bubbles: true });
    window.dispatchEvent(event);
  };

  const handleStart = (key) => (e) => {
    e.preventDefault();
    triggerKey(key, "keydown");
  };

  const handleEnd = (key) => (e) => {
    e.preventDefault();
    triggerKey(key, "keyup");
  };

  return (
    <div className="virtual-controller">
      {/* Shoulder Triggers L / R */}
      <div style={{ position: "absolute", top: "-36px", left: "20px", right: "20px", display: "flex", justifyContent: "space-between" }}>
        <button
          className="pill-btn"
          onTouchStart={handleStart("l")}
          onTouchEnd={handleEnd("l")}
          onMouseDown={handleStart("l")}
          onMouseUp={handleEnd("l")}
        >
          L1 TRIGGER
        </button>
        <button
          className="pill-btn"
          onTouchStart={handleStart("r")}
          onTouchEnd={handleEnd("r")}
          onMouseDown={handleStart("r")}
          onMouseUp={handleEnd("r")}
        >
          R1 TRIGGER
        </button>
      </div>

      {/* D-Pad Directional Cross */}
      <div className="dpad-container">
        <button
          className="dpad-btn dpad-up"
          onTouchStart={handleStart("ArrowUp")}
          onTouchEnd={handleEnd("ArrowUp")}
          onMouseDown={handleStart("ArrowUp")}
          onMouseUp={handleEnd("ArrowUp")}
        >
          <ChevronUp size={20} />
        </button>
        <button
          className="dpad-btn dpad-left"
          onTouchStart={handleStart("ArrowLeft")}
          onTouchEnd={handleEnd("ArrowLeft")}
          onMouseDown={handleStart("ArrowLeft")}
          onMouseUp={handleEnd("ArrowLeft")}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="dpad-center" />
        <button
          className="dpad-btn dpad-right"
          onTouchStart={handleStart("ArrowRight")}
          onTouchEnd={handleEnd("ArrowRight")}
          onMouseDown={handleStart("ArrowRight")}
          onMouseUp={handleEnd("ArrowRight")}
        >
          <ChevronRight size={20} />
        </button>
        <button
          className="dpad-btn dpad-down"
          onTouchStart={handleStart("ArrowDown")}
          onTouchEnd={handleEnd("ArrowDown")}
          onMouseDown={handleStart("ArrowDown")}
          onMouseUp={handleEnd("ArrowDown")}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Center Select & Start */}
      <div className="center-controls">
        <button
          className="pill-btn"
          onTouchStart={handleStart("Shift")}
          onTouchEnd={handleEnd("Shift")}
          onMouseDown={handleStart("Shift")}
          onMouseUp={handleEnd("Shift")}
        >
          SELECT
        </button>
        <button
          className="pill-btn"
          onTouchStart={handleStart("Enter")}
          onTouchEnd={handleEnd("Enter")}
          onMouseDown={handleStart("Enter")}
          onMouseUp={handleEnd("Enter")}
        >
          START
        </button>
      </div>

      {/* Diamond Action Buttons A/B/X/Y */}
      <div className="action-buttons-container">
        <button
          className="action-btn btn-y"
          onTouchStart={handleStart("x")}
          onTouchEnd={handleEnd("x")}
          onMouseDown={handleStart("x")}
          onMouseUp={handleEnd("x")}
        >
          Y
        </button>
        <button
          className="action-btn btn-x"
          onTouchStart={handleStart("c")}
          onTouchEnd={handleEnd("c")}
          onMouseDown={handleStart("c")}
          onMouseUp={handleEnd("c")}
        >
          X
        </button>
        <button
          className="action-btn btn-a"
          onTouchStart={handleStart("z")}
          onTouchEnd={handleEnd("z")}
          onMouseDown={handleStart("z")}
          onMouseUp={handleEnd("z")}
        >
          A
        </button>
        <button
          className="action-btn btn-b"
          onTouchStart={handleStart("a")}
          onTouchEnd={handleEnd("a")}
          onMouseDown={handleStart("a")}
          onMouseUp={handleEnd("a")}
        >
          B
        </button>
      </div>
    </div>
  );
}
