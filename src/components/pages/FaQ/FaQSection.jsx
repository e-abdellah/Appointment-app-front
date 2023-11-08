import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import './FAQSection.css';

const FAQSection = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      question: 'How do I schedule an appointment?',
      answer:
        'You can schedule an appointment by logging into your account and selecting the date and time that works best for you.',
    },
    {
      id: 2,
      question: 'Can I cancel an appointment?',
      answer:
        'Yes, you can cancel an appointment by logging into your account and selecting the appointment you wish to cancel.',
    },
    {
      id: 3,
      question: 'How do I find a doctor?',
      answer:
        'You can find a doctor by searching our database of doctors and filtering by location, specialty, and more.',
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
    <div className='faq-section'>
      <h2 className='faq-section__title'>Frequently Asked Questions</h2>
      {questions.map((q) => (
        <div
          key={q.id}
          className={`faq-item ${expandedQuestion === q.id ? 'faq-item--expanded' : ''}`}
        >
          <div className='faq-item__question' onClick={() => handleQuestionClick(q.id)}>
            <h3 className='faq-item__question-text'>{q.question}</h3>
            <button className='faq-item__question-icon'> <AiOutlinePlusCircle size={24}/> </button>
          </div>
          <div className='faq-item__answer'>{q.answer}</div>
        </div>
      ))}
    </div>
  );
};

export default FAQSection;
