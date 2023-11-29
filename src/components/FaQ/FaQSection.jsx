import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import "./FAQSection.css";

const FAQSection = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment by logging into your account and selecting the doctor, date and time that works best for you.",
    },
    {
      id: 2,
      question: "Can I cancel an appointment?",
      answer:
        "Yes, you can cancel an appointment by logging into your account and selecting the appointment you wish to cancel.",
    },
    {
      id: 3,
      question: "How do I find a doctor?",
      answer:
        "You can find a doctor by searching our database of doctors and filtering by name or speciality.",
    },
    {
      id: 4,
      question: "Is there a fee for using the appointment scheduling service?",
      answer: "No, our appointment scheduling service is free to use.",
    },
    {
      id: 5,
      question:
        "What information do I need to provide when scheduling an appointment?",
      answer:
        "When scheduling an appointment, you typically need to provide details such as your preferred doctor, desired date and time, and any specific reason for the appointment.",
    },
    {
      id: 6,
      question:
        "Can I schedule appointments for family members through my account?",
      answer:
        "Yes, you can schedule appointments for family members by accessing the scheduling feature through your account and selecting the appropriate options.",
    },
    {
      id: 7,
      question:
        "Is it possible to see the availability of multiple doctors at once?",
      answer:
        "Yes, you can check the availability of multiple doctors simultaneously by using our search and filtering options.",
    },
    {
      id: 9,
      question: "How far in advance can I schedule an appointment?",
      answer:
        "The scheduling window may vary, but generally, you can schedule appointments within a reasonable timeframe. Check the platform for specific details on scheduling limits.",
    },
    // {
    //   id: 10,
    //   question: "Can I receive appointment reminders?",
    //   answer:
    //     "Yes, you can opt to receive appointment reminders via email, SMS, or app notifications, depending on your preferences.",
    // },
    {
      id: 11,
      question:
        "What should I do if I encounter technical issues while scheduling an appointment?",
      answer:
        "If you experience technical difficulties, please contact our customer support team for assistance. You can find the contact information on the contact section.",
    },
  ];

  const handleQuestionClick = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  return (
    <div className="faq-section">
      <h2 className="faq-section__title">Frequently Asked Questions</h2>
      {questions.map((q) => (
        <div
          key={q.id}
          className={`faq-item ${
            expandedQuestion === q.id ? "faq-item--expanded" : ""
          }`}
        >
          <div
            className="faq-item__question"
            onClick={() => handleQuestionClick(q.id)}
          >
            <h3 className="faq-item__question-text">{q.question}</h3>
            <button className="faq-item__question-icon">
              <AiOutlinePlusCircle size={24} />
            </button>
          </div>
          <div className="faq-item__answer">{q.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
