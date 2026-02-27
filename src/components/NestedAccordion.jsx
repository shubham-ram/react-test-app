import React, { useState, useRef, useEffect } from 'react';
import './NestedAccordion.css';

const AccordionItem = ({ item, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="accordion-item">
      <div 
        className={`accordion-header ${isOpen ? 'active' : ''}`} 
        onClick={onClick}
      >
        <span className="accordion-title">{item.title}</span>
        <span className={`accordion-icon ${isOpen ? 'rotate' : ''}`}>
          ▼
        </span>
      </div>
      <div 
        className="accordion-content-wrapper" 
        style={{ height: `${height}px` }}
      >
        <div className="accordion-content" ref={contentRef}>
          {item.content && <div className="accordion-text">{item.content}</div>}
          {item.children && (
            <NestedAccordion items={item.children} />
          )}
        </div>
      </div>
    </div>
  );
};

const NestedAccordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleItemClick = (index) => {
    setOpenIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div className="nested-accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default NestedAccordion;
