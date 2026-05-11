import "./Toast.css";

// ── Toast notification (shown at bottom-right) ────────────────────────────────
// Props:
//   message  (string)  — text to show
//   onClose  (fn)      — called after timeout (parent clears the message)

function Toast({ message }) {
  if (!message) return null;
  return <div className="toast-notification">{message}</div>;
}

export default Toast;
