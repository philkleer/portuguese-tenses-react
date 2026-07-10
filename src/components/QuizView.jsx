import FillQuestion from './FillQuestion.jsx';
import TheoryQuestion from './TheoryQuestion.jsx';
import { FaCog } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import IconLinks from './IconLinks.jsx';

export default function QuizView({ exercise, onBackToHome, onBackToOptions }) {
  const {
    currentQuestion,
    userInput,
    setUserInput,
    feedback,
    submitAnswer,
    confirmResult,
    score,
    resetScore,
    questionPoolSize,
  } = exercise;

  if (!currentQuestion) {
    return (
      <main className="quiz-view">
        <section className="card empty-card">
          <h2>Nenhuma pergunta disponível</h2>
          <p>
            Ative pelo menos um tempo verbal nas{" "}
            <button
              type="button"
              className="inline-link-button"
              onClick={onBackToOptions}
            >
              configurações <FaCog />
            </button>.
          </p>
        </section>
      </main>
    );
  }

  const tenseHint = currentQuestion.hint;
  const tenseName = currentQuestion.tenses.join(" + ")

  function setFillInput(index, value) {
    setUserInput((previous) => previous.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  return (
    <main className="quiz-view">
      <nav className="top-nav">
        <button
          type="button"
          className="icon-button"
          onClick={onBackToHome}
        >
          <FaArrowLeft />
        </button>

        <div className="score-box">
          <div className="score-row">
            <span className="score-badge__correct">
              <strong>{score.correct}</strong>
              <span>✓</span>
            </span>

            <span className="score-badge__wrong">
              <strong>{score.wrong}</strong>
              <span>✗</span>
            </span>

            <button
              type="button"
              className="link-button"
              onClick={resetScore}
            >
              <FaArrowRotateLeft />
            </button>
          </div>

          <small className="question-count">
            {questionPoolSize} perguntas ativas
          </small>
        </div>

        <button
          type="button"
          className="icon-button"
          onClick={onBackToOptions}
        >
          <FaCog />
        </button>
      </nav>

      {currentQuestion.type === 'theory' ? (
        <TheoryQuestion
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedIndex={userInput}
          onSelect={setUserInput}
          feedback={feedback}
          onCheck={submitAnswer}
          onNext={() => confirmResult(feedback.correct)}
        />
      ) : (
        <FillQuestion
          sentence={currentQuestion.sentence}
          blanks={currentQuestion.blanks}
          userInput={userInput}
          onChange={setFillInput}
          feedback={feedback}
          onCheck={submitAnswer}
          onNext={() => confirmResult(true)}
          onCorrect={() => confirmResult(true)}
          onWrong={() => confirmResult(false)}
          tenseHint={tenseHint}
          tenseName={tenseName}
        />
      )}

      <IconLinks compact />
    </main>

  );
}
