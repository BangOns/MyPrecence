"use client";

import Swal from "sweetalert2";

export default function ButtonInfo() {
  function HandleInfo() {
    Swal.fire({
      icon: "info",
      title: "Workflow and Rules This Website",
      html:
        `<ol>` +
        `<li>1. Only admin can see the table </li>` +
        "<li>2. make more users to be visible on the table (Admin)</li>" +
        "<li>3. You can change your personal data on the profile page (Admin & User)</li>" +
        "<li> nb : Admin can't change his own semester </li>" +
        "</ol>",
    });
  }
  return (
    <div className="fixed bottom-5 right-5">
      <button
        className="btn btn-circle border-1 border-black"
        onClick={HandleInfo}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="5"
          height="17"
          viewBox="0 0 5 17"
          fill="none"
        >
          <rect x="1" y="7" width="3" height="10" fill="black" />
          <ellipse cx="2.5" cy="2.54545" rx="2.5" ry="2.54545" fill="black" />
        </svg>
      </button>
    </div>
  );
}
