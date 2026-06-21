export default function TheoryQuestion({ question, options, selectedIndex, onSelect, feedback, onCheck, onNext }) {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <section className="card question-card">
      <p className="eyebrow">Teoria</p>
      <h2>{question}</h2>

      <div className="option-list">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isCorrect = feedback && feedback.correctIndex === index;
          const isWrong = feedback && feedback.selectedIndex === index && !feedback.correct;
          const className = [
            'option-button',
            isSelected ? 'selected' : '',
            isCorrect ? 'correct' : '',
            isWrong ? 'wrong' : '',
          ].filter(Boolean).join(' ');

          return (
            <button
              key={option}
              type="button"
              className={className}
              onClick={() => !feedback && onSelect(index)}
              disabled={Boolean(feedback)}
            >
              <span className="option-letter">{letters[index]}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      {!feedback ? (
        <button type="button" className="primary-button" onClick={onCheck} disabled={selectedIndex === null || selectedIndex === undefined}>
          Verificar
        </button>
      ) : (
        <div className="feedback-block">
          <p className={feedback.correct ? 'success-text' : 'error-text'}>
            {feedback.correct ? 'Resposta correta!' : `Resposta correta: ${feedback.correctAnswer}`}
          </p>
          <button
            type="button"
            className={feedback.correct ? 'primary-button' : 'neutral-button'}
            onClick={onNext}
          >
            Próxima
          </button>
        </div>
      )}


    </section>
  );
}
