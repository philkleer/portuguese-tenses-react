import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import allQuestions from '../data/index.js';
import { buildQuestionPool, pickQuestion } from '../engine/questionFilters.js';

function normalizeAnswer(value) {
  return String(value ?? '').trim().toLowerCase();
}

function initialInputFor(question) {
  if (!question) return [];
  return question.type === 'theory' ? null : question.blanks.map(() => '');
}

export default function useQuizExercise(settings) {
  const settingsRef = useRef(settings);
  const lastQuestionIds = useRef([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  const questionPool = useMemo(() => buildQuestionPool(allQuestions, settings), [settings]);

  const startNewRound = useCallback(() => {
    const nextQuestion = pickQuestion(buildQuestionPool(allQuestions, settingsRef.current), lastQuestionIds.current);
    if (!nextQuestion) {
      setCurrentQuestion(null);
      setUserInput([]);
      setFeedback(null);
      return;
    }
    const maxHistory = Math.floor(buildQuestionPool(allQuestions, settingsRef.current).length * 2 / 3);
    lastQuestionIds.current = [...lastQuestionIds.current.slice(-maxHistory), nextQuestion.id];
    setCurrentQuestion(nextQuestion);
    setUserInput(initialInputFor(nextQuestion));
    setFeedback(null);
  }, []);

  useEffect(() => {
    startNewRound();
  }, [settings, startNewRound]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion) return;

    if (currentQuestion.type === 'theory') {
      const correct = userInput === currentQuestion.correctIndex;
      setFeedback({
        correct,
        correctIndex: currentQuestion.correctIndex,
        selectedIndex: userInput,
        correctAnswer: currentQuestion.options[currentQuestion.correctIndex],
      });
      return;
    }

    const results = currentQuestion.blanks.map((blank, index) => {
      const given = normalizeAnswer(userInput[index]);
      const expected = normalizeAnswer(blank.answer);
      return {
        correct: given === expected,
        given: userInput[index] ?? '',
        correctAnswer: blank.answer,
      };
    });

    setFeedback({
      correct: results.every((result) => result.correct),
      results,
      correctAnswer: currentQuestion.blanks.map((blank) => blank.answer).join(' / '),
    });
  }, [currentQuestion, userInput]);

  const confirmResult = useCallback((countAsCorrect) => {
    setScore((previous) => ({
      correct: previous.correct + (countAsCorrect ? 1 : 0),
      wrong: previous.wrong + (countAsCorrect ? 0 : 1),
    }));
    startNewRound();
  }, [startNewRound]);

  const resetScore = useCallback(() => {
    setScore({ correct: 0, wrong: 0 });
  }, []);

  return {
    currentQuestion,
    userInput,
    setUserInput,
    feedback,
    submitAnswer,
    confirmResult,
    score,
    resetScore,
    questionPoolSize: questionPool.length,
  };
}
