import { useState } from "react";
import NestedAccordion from "./components/NestedAccordion";
import "./App.css";

const accordionData = [
  {
    title: "Section 1",
    content: "Content for section 1. This is a simple text content.",
  },
  {
    title: "Section 2 (Nested)",
    content: "This section contains nested items.",
    children: [
      {
        title: "Nested 2.1",
        content: "Content for nested section 2.1.",
      },
      {
        title: "Nested 2.2 (Deeply Nested)",
        children: [
          {
            title: "Deep Nested 2.2.1",
            content: "Content for deep nested section 2.2.1.",
          },
          {
            title: "Deep Nested 2.2.2",
            content: "Content for deep nested section 2.2.2. It has more text to show variable height behavior. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          },
        ],
      },
    ],
  },
  {
    title: "Section 3",
    content: "Content for section 3.",
  },
];

function App() {
  return (
    <div className="app-container">
      <h1>Nested Accordion Demo</h1>
      <div className="accordion-container">
        <NestedAccordion items={accordionData} />
      </div>
    </div>
  );
}

export default App;
