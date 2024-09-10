"use client";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { SideBarSection } from "./components/sidebar";

export default function Home() {
  const [open, setOpen] = useState(false);

  const allSegments = [
    {
      id: 1,
      label: "First Name",
      value: "first_name",
    },
    {
      id: 2,
      label: "Last Name",
      value: "last_name",
    },
    {
      id: 3,
      label: "Gender",
      value: "gender",
    },
    {
      id: 4,
      label: "Age",
      value: "age",
    },
    {
      id: 5,
      label: "Account Name",
      value: "account_name",
    },
    {
      id: 6,
      label: "City",
      value: "city",
    },
    {
      id: 7,
      label: "State",
      value: "state",
    },
  ];

  return (
    <div
      className={`min-h-screen z-10 relative font-[family-name:var(--font-geist-sans)] flex ${
        open ? "bg-[#8c9291]" : "bg-white"
      }`}
    >
      <div className="w-full">
        <div
          className={`flex items-center w-full gap-2 text-lg text-white p-4 ${
            open ? "bg-[#226870]" : "bg-[#39aebc]"
          }`}
        >
          <Icon icon="fe:arrow-left" color="white" fontSize={25} /> View
          Audience
        </div>
        <button
          className="border border-solid border-black text-black px-4 py-2 h-10 m-20 "
          onClick={() => setOpen(true)}
        >
          Save segment
        </button>
      </div>
      {open && <SideBarSection allSegments={allSegments} setOpen={setOpen} />}
    </div>
  );
}
