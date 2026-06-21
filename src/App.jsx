import { useMemo, useState } from 'react';
import HomePage from './components/HomePage.jsx';
import TenseSelector from './components/TenseSelector.jsx';
import QuizView from './components/QuizView.jsx';
import useQuizExercise from './hooks/useQuizExercise.js';
import { buildTenseList, defaultSettings } from './engine/questionFilters.js';
import IconLinks from './components/IconLinks.jsx';
import './styles.css';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [optionsReturnScreen, setOptionsReturnScreen] = useState('home');
  const [settings, setSettings] = useState(defaultSettings);
  const exercise = useQuizExercise(settings);
  const enabledTenses = useMemo(() => buildTenseList(settings), [settings]);

  return (
    <div className="app-shell">
      <header className="app-topbar">
        <button type="button" className="brand-button" onClick={() => setScreen('home')}>
          Tempos do Português
        </button>
        {/* <IconLinks compact /> */}
      </header>
      {screen === 'home' && (
        <HomePage
          onStart={() => setScreen('learn')}
          onSelectTenses={() => {
            setOptionsReturnScreen('home');
            setScreen('options');
          }}
        />
      )}

      {screen === 'options' && (
        <TenseSelector
          settings={settings}
          setSettings={setSettings}
          enabledCount={enabledTenses.length}
          onBack={() => setScreen(optionsReturnScreen)}
          onStart={() => setScreen('learn')}
        />
      )}

      {screen === 'learn' && (
        <QuizView
          exercise={exercise}
          onBackToHome={() => setScreen('home')}
          onBackToOptions={() => {
            setOptionsReturnScreen('learn');
            setScreen('options');
          }}
        />
      )}
    </div>
  );
}
