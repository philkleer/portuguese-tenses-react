export const TENSE_SETTINGS = [
  { label: 'Presente Indicativo', key: 'isPresenteInd', tier: 'high' },
  { label: 'Pretérito Perfeito Simples Indicativo', key: 'isPerfeitoInd', tier: 'high' },
  { label: 'Pretérito Imperfeito Indicativo', key: 'isImperfeitoInd', tier: 'high' },
  { label: 'Presente Subjuntivo', key: 'isPresenteSub', tier: 'high' },
  { label: 'Pretérito Perfeito Composto Indicativo', key: 'isPerfeitoCompInd', tier: 'mid' },
  { label: 'Futuro Simples Indicativo', key: 'isFuturoIInd', tier: 'mid' },
  { label: 'Futuro do Pretérito / Condicional I', key: 'isCondicionalI', tier: 'mid' },
  { label: 'Pretérito Imperfeito Subjuntivo', key: 'isImperfeitoSub', tier: 'mid' },
  { label: 'Futuro Simples Subjuntivo', key: 'isFuturoISub', tier: 'mid' },
  { label: 'Pretérito Mais-que-Perfeito Composto Indicativo', key: 'isPMQPCompInd', tier: 'rare' },
  { label: 'Pretérito Mais-que-Perfeito Indicativo', key: 'isPMQPInd', tier: 'rare' },
  { label: 'Futuro Composto Indicativo', key: 'isFuturoIIInd', tier: 'rare' },
  { label: 'Pretérito Perfeito Simples Subjuntivo', key: 'isPerfeitoSub', tier: 'rare' },
  { label: 'Pretérito Mais-que-Perfeito Subjuntivo', key: 'isPMQPSub', tier: 'rare' },
  { label: 'Futuro Composto Subjuntivo', key: 'isFuturoIISub', tier: 'rare' },
  { label: 'Futuro do Pretérito Composto / Condicional II', key: 'isCondicionalII', tier: 'rare' },
];

export const defaultSettings = {
  isPresenteInd: true,
  isPerfeitoInd: true,
  isImperfeitoInd: true,
  isPresenteSub: true,
  isPerfeitoCompInd: false,
  isFuturoIInd: false,
  isCondicionalI: false,
  isImperfeitoSub: false,
  isFuturoISub: false,
  isPMQPCompInd: false,
  isPMQPInd: false,
  isFuturoIIInd: false,
  isPerfeitoSub: false,
  isPMQPSub: false,
  isFuturoIISub: false,
  isCondicionalII: false,
};

export function buildTenseList(settings) {
  return TENSE_SETTINGS.filter(({ key }) => Boolean(settings[key])).map(({ label }) => label);
}

export function buildQuestionPool(allQuestions, settings) {
  const enabledTenses = buildTenseList(settings);
  return allQuestions.filter((question) => question.tenses.some((tense) => enabledTenses.includes(tense)));
}

function pickWithHistory(pool, lastQuestionIds, maxHistory) {
  if (!pool.length) return null;
  const recent = new Set(lastQuestionIds.slice(-maxHistory));
  const available = pool.filter((question) => !recent.has(question.id));
  const source = available.length ? available : pool;
  return source[Math.floor(Math.random() * source.length)];
}

export function pickQuestion(pool, lastQuestionIds) {
  const maxHistory = Math.floor(pool.length * 2 / 3);
  return pickWithHistory(pool, lastQuestionIds, maxHistory);
}
