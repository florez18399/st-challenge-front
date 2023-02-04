import React from "react";

import "./QuestionModal.css";

type Props = {
  title: string;
  onSubmit: () => void;
  onCancel: () => void;
  question: string;
  submitButtonClass?: string;
};

const QuestionModal = ({
  title,
  onSubmit,
  onCancel,
  question,
  submitButtonClass,
}: Props) => {
  return (
    <div className="question-card modal" style={{ display: "flex" }}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onCancel}
          ></button>
        </header>
        <section className="modal-card-body">
          <h1>{question}</h1>
        </section>
        <footer className="modal-card-foot">
          <button
            className={`button ${
              submitButtonClass ? submitButtonClass : "is-success"
            }`}
            onClick={onSubmit}
          >
            Confirmar
          </button>
          <button className="button" onClick={onCancel}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default QuestionModal;
