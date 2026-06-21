import IconLinks from './IconLinks.jsx';

export default function HomePage({ onStart, onSelectTenses }) {
  return (
    <main className="home-screen">
      <section className="hero-card card">
        <p className="eyebrow">Português Brasileiro</p>
        <h1>Quiz de Tempos Verbais</h1>
        <p className="hero-copy">
          Aprenda quando usar cada tempo verbal em português do Brasil com perguntas de teoria e exercícios em contexto.
        </p>
        <div className="hero-actions">
          <button type="button" className="primary-button big-button" onClick={onStart}>
            Começar
          </button>
          <button type="button" className="secondary-button big-button" onClick={onSelectTenses}>
            Selecionar tempos
          </button>
        </div>
        <IconLinks />
      </section>

      <section className="home-cards">
        <article className="mini-card card">
          <strong>1. Escolha os tempos</strong>
          <p>Ative os tempos verbais que você quer praticar.</p>
        </article>
        <article className="mini-card card">
          <strong>2. Responda em contexto</strong>
          <p>Combine perguntas teóricas com lacunas para completar.</p>
        </article>
        <article className="mini-card card">
          <strong>3. Aprenda com feedback</strong>
          <p>Veja a resposta correta e marque pequenos erros como acertos.</p>
        </article>
      </section>
    </main>
  );
}
