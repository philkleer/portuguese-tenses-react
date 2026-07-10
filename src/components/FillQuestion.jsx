import { useEffect, useState } from 'react';

function splitSentence(sentence) {
  return sentence.split('________');
}

export default function FillQuestion({
  sentence,
  blanks,
  userInput,
  onChange,
  feedback,
  onCheck,
  onNext,
  onCorrect,
  onWrong,
  tenseHint,
}) {
  const [showHint, setShowHint] = useState(false);
  const parts = splitSentence(sentence);

  useEffect(() => {
    setShowHint(false);
  }, [sentence]);

  return (
    <section className="card question-card">
      <p className="eyebrow">Complete a frase</p>
      <div className="fill-sentence">
        {parts.map((part, index) => (
          <span key={`${part}-${index}`}>
            {part}
            {index < blanks.length && (
              <span className="blank-wrap">
                <input
                  className={feedback ? (feedback.results[index].correct ? 'correct' : 'wrong') : ''}
                  type="text"
                  value={userInput[index] ?? ''}
                  onChange={(event) => onChange(index, event.target.value)}
                  disabled={Boolean(feedback)}
                  autoComplete="off"
                  autoCapitalize="none"
                />
                <small>({blanks[index].hint})</small>
              </span>
            )}
          </span>
        ))}
      </div>

      <div className="action-row">
        {!feedback ? (
          <button type="button" className="primary-button" onClick={onCheck}>Verificar</button>
        ) : (
          <div className="feedback-block">
            <ul className="answer-list">
              {feedback.results.map((result, index) => (
                <li key={`${result.correctAnswer}-${index}`} className={result.correct ? 'success-text' : 'error-text'}>
                  {result.correct ? '✓' : '✗'} {blanks[index].hint}: {result.correctAnswer}
                </li>
              ))}
            </ul>

            {feedback.correct ? (
              <button type="button" className="primary-button" onClick={onNext}>Próxima</button>
            ) : (
              <div className="button-row">
                <button type="button" className="neutral-button" onClick={onWrong}>Próxima</button>
              </div>
            )}

          </div>
        )}
        {!feedback && (
          <>
            <div>
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowHint((previous) => !previous)}
              >
                {showHint ? 'Ocultar' : 'Dica'}
              </button>
            </div>

            {showHint && (
              <p className="hint-text">
                Uso: <strong>{tenseHint}</strong>
              </p>
            )}
          </>
        )}</div>
    </section>
  );
}
