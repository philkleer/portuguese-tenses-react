import { TENSE_SETTINGS } from '../engine/questionFilters.js';
import { FaArrowLeft } from "react-icons/fa";

const GROUPS = [
  ['high', 'Alta frequência'],
  ['mid', 'Frequência média'],
  ['rare', 'Raros'],
];

export default function TenseSelector({ settings, setSettings, enabledCount, onBack, onStart }) {
  function toggleSetting(key) {
    setSettings((previous) => ({ ...previous, [key]: !previous[key] }));
  }

  function selectTier(tier, selected) {
    setSettings((previous) => {
      const next = { ...previous };
      TENSE_SETTINGS.filter((item) => item.tier === tier).forEach((item) => {
        next[item.key] = selected;
      });
      return next;
    });
  }

  return (
    <main className="options-screen">
      <section className="card page-heading-card">
        <button
          type="button"
          className="icon-button"
          onClick={onBack}
        >
          <FaArrowLeft />
        </button>
        <p className="eyebrow">Configurações</p>
        <h1>Escolha os tempos verbais</h1>
        <p>As perguntas serão escolhidas aleatoriamente entre os tempos ativados.</p>
      </section>

      <section className="card tense-selector full-width-card">
        {GROUPS.map(([tier, title]) => {
          const groupItems = TENSE_SETTINGS.filter((item) => item.tier === tier);
          const allSelected = groupItems.every((item) => settings[item.key]);

          return (
            <section key={tier} className="tense-group">
              <div className="group-heading">
                <h2>{title}</h2>
                <button type="button" className="secondary-button compact-button" onClick={() => selectTier(tier, !allSelected)}>
                  {allSelected ? 'Desmarcar grupo' : 'Marcar grupo'}
                </button>
              </div>
              <div className="toggle-list">
                {groupItems.map(({ key, label }) => (
                  <label key={key} className="toggle-row">
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={Boolean(settings[key])}
                      onChange={() => toggleSetting(key)}
                    />
                  </label>
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <footer className="footer-actions card">
        <div className="footer-copy">
          <strong className={enabledCount === 0 ? 'warning-text' : ''}>
            {enabledCount} tempo{enabledCount === 1 ? '' : 's'} selecionado{enabledCount === 1 ? '' : 's'}
          </strong>

          {enabledCount === 0 && (
            <p className="warning-text">
              Ative pelo menos um tempo verbal para continuar.</p>
          )}
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={onStart}
          disabled={enabledCount === 0}
        >
          Aprender
        </button>
      </footer>
    </main>
  );
}
