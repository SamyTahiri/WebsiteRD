export const TESTS_DOC_URL =
  'https://docs.google.com/document/d/12o9YAPkjacXKDHhIrlNSZxjUvwi0orZ9X83kHwSho5k/edit?tab=t.86c2elaiq4d8';

// 31 octobre 2026 (les mois commencent à 0).
export const DEADLINE = new Date(2026, 9, 31);

export const chapters = [
  { id: 'tests', label: 'Ch.1', title: 'Les tests', figure: 'trajectory', caption: 'fig. 1, trajectoire' },
  { id: 'criteres', label: 'Ch.2', title: 'Critères', figure: 'target', caption: 'fig. 2, écart' },
  { id: 'methode', label: 'Ch.3', title: 'Méthode', figure: 'camera', caption: 'fig. 3, Limelight' },
  { id: 'hypotheses', label: 'Ch.4', title: 'Hypothèses', figure: 'apriltag', caption: 'fig. 4, AprilTag' },
  { id: 'solutions', label: 'Ch.5', title: 'Solutions', figure: 'gyroscope', caption: 'fig. 5, gyroscope' },
  { id: 'suivi', label: 'Ch.6', title: 'Suivi', figure: 'checklist', caption: 'fig. 6, suivi' },
];

export const tests = [
  { label: 'Statique', text: 'Le robot immobile, à différents endroits du terrain.' },
  { label: 'Rotation', text: 'Le robot tourne sur lui-même.' },
  {
    label: 'Trajectoire',
    text: 'Des parcours qui passent par-dessus la « bump » ou derrière la « tower ».',
  },
];

export const criteria = [
  {
    label: 'Critère 1',
    text: 'La position indiquée par le poseEstimator, comparée à la position réelle du robot sur le terrain.',
  },
  {
    label: 'Critère 2',
    text: 'La distance que le robot pense avoir parcourue, comparée à la distance réelle.',
  },
  { label: 'Critère 3', text: 'La déviation du gyroscope.' },
  { label: 'Critère 4', text: 'Une manière de mesurer le bruit de la vision, encore à définir.' },
];

export const hardware = [
  { label: 'Caméras', text: "Deux Limelight 3G, opposées l’une à l’autre" },
  { label: 'Contrôleur', text: 'RoboRIO 2.0' },
  { label: 'Gyroscope', text: 'Pigeon 2.0' },
];

export const hypotheses = [
  {
    id: 'H.1',
    title: 'Imprécision au niveau du gyroscope',
    note: 'Le Pigeon 2.0 fausserait le cap.',
    first: true,
  },
  { id: 'H.2', title: 'Tag flip', note: "La pose d’un tag bascule vers une solution miroir." },
  { id: 'H.3', title: 'Tag flickering', note: "Des tags détectés puis perdus d’une image à l’autre." },
  {
    id: 'H.4',
    title: "Matrice de l’estimateur trop confiante en la vision",
    note: "Trop d’importance accordée aux mesures de vision.",
  },
  { id: 'H.5', title: 'MT1 envoyé décalé', note: 'Les mesures MegaTag1 arrivent en retard.' },
  {
    id: 'H.6',
    title: 'MT1 envoyé dans MT2 sans filtrage',
    note: 'Des mesures non filtrées alimentent MT2.',
  },
  { id: 'H.7', title: 'Le filtre circulaire', note: 'Le filtre actuel trierait mal les mesures.' },
  { id: 'H.8', title: 'Blacklist = not whitelist', note: "Notre blacklist n’en est pas une vraie." },
];

// ---------------------------------------------------------------------------
// Suivi des solutions
// To update progress: change a `status`, add a line to `log`, or fill `results`.
// ---------------------------------------------------------------------------

export const SOLUTION_STATUS = {
  'en-cours': 'En cours',
  'a-venir': 'À venir',
  validee: 'Validée',
  rejetee: 'Rejetée',
};

export const STEP_STATUS = {
  fait: 'Fait',
  'en-cours': 'En cours',
  'a-faire': 'À faire',
};

// The four evaluation criteria, measured for every solution.
export const resultFields = [
  { key: 'pose', label: 'Erreur de pose', unit: 'm', criterion: 'Critère 1' },
  { key: 'distance', label: 'Écart de distance', unit: 'm', criterion: 'Critère 2' },
  { key: 'gyro', label: 'Déviation du gyroscope', unit: '°', criterion: 'Critère 3' },
  { key: 'noise', label: 'Bruit de la vision', unit: 'à définir', criterion: 'Critère 4' },
];

const EMPTY_RESULTS = { pose: null, distance: null, gyro: null, noise: null };

// Same loop for every hypothesis (see Chapitre 3).
const standardSteps = (change) => [
  { title: 'Appliquer le changement', status: 'a-faire', text: change },
  {
    title: 'Rejouer tous les tests',
    status: 'a-faire',
    text: 'En mode autonome, avec une vidéo et l’estimation de position enregistrées pour chaque test.',
  },
  {
    title: 'Évaluer avec les critères',
    status: 'a-faire',
    text: 'Position estimée vs réelle, distance parcourue, déviation du gyroscope, bruit de la vision.',
  },
  {
    title: 'Décider',
    status: 'a-faire',
    text: 'Valable : on garde le changement. Sinon : retour à la configuration précédente.',
  },
];

export const solutionTracks = [
  {
    id: 'navx3',
    label: 'Pour H.1',
    title: 'Pigeon 2.0 → NavX3',
    name: 'Utiliser le NavX3 ou le gyroscope du SystemCore',
    hypothesis: 'Imprécision au niveau du gyroscope',
    status: 'en-cours',
    summary:
      'La première hypothèse testée. Avant de changer de gyroscope, on rend les tests constants et on isole la vision des autres facteurs.',
    steps: [
      {
        title: 'Caractériser le swerve',
        status: 'en-cours',
        text: 'Pour un suivi de trajectoire précis en mode autonome, et pour que seuls les effets de la vision restent dans nos résultats.',
      },
      {
        title: 'Remplacer le Pigeon 2.0 par un NavX3',
        status: 'a-faire',
        text: 'Le gyroscope du SystemCore reste une alternative.',
      },
      {
        title: 'Rejouer tous les tests en mode autonome',
        status: 'a-faire',
        text: 'Chaque test est un mode autonome, identique d’une fois à l’autre. Vidéo et estimation de position enregistrées.',
      },
      {
        title: 'Évaluer avec les critères',
        status: 'a-faire',
        text: 'Comparer aux résultats obtenus avec la configuration actuelle.',
      },
      {
        title: 'Décider',
        status: 'a-faire',
        text: 'Valable : on garde le NavX3 et on passe à l’hypothèse suivante. Sinon : retour au Pigeon 2.0.',
      },
    ],
    log: [
      { tag: 'Décision', text: 'Le gyroscope est la première hypothèse sur laquelle on se penche.' },
      {
        tag: 'Décision',
        text: 'Chaque test sera un mode autonome, pour qu’il soit constant d’une fois à l’autre.',
      },
      {
        tag: 'Décision',
        text: 'On commence par la caractérisation du swerve, pour délimiter le problème à la vision.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'filtre-mt1',
    label: 'Pour H.6',
    title: 'Filtrer MT1',
    name: 'Filtrer MT1 avant de l’envoyer dans MT2',
    hypothesis: 'MT1 envoyé dans MT2 sans filtrage',
    status: 'a-venir',
    summary: 'Ne plus envoyer de mesures MegaTag1 non filtrées dans MegaTag2.',
    steps: standardSteps('Ajouter un filtre sur MT1 avant qu’il soit envoyé dans MT2.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'ambiguite',
    label: 'Pour H.7',
    title: 'Ambiguïté de détection',
    name: 'Utiliser l’ambiguïté de la détection au lieu du filtre circulaire',
    hypothesis: 'Le filtre circulaire',
    status: 'a-venir',
    summary: 'Remplacer le filtre circulaire par un tri basé sur l’ambiguïté de chaque détection.',
    steps: standardSteps('Retirer le filtre circulaire et filtrer selon l’ambiguïté de la détection.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'blacklist',
    label: 'Pour H.8',
    title: 'Vraie blacklist',
    name: 'Faire une vraie blacklist',
    hypothesis: 'Blacklist = not whitelist',
    status: 'a-venir',
    summary: 'Remplacer le « not whitelist » actuel par une vraie liste de tags à ignorer.',
    steps: standardSteps('Écrire une vraie blacklist à la place du « not whitelist ».'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'photonvision',
    label: 'Autre piste',
    title: 'PhotonVision',
    name: 'Utiliser PhotonVision',
    hypothesis: null,
    status: 'a-venir',
    summary: 'Essayer PhotonVision comme solution de vision.',
    steps: standardSteps('Passer la vision du robot sur PhotonVision.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'cameras',
    label: 'Autre piste',
    title: 'Combiner les caméras',
    name: 'Combiner les types de caméras',
    hypothesis: null,
    status: 'a-venir',
    summary: 'Utiliser plusieurs types de caméras ensemble.',
    steps: standardSteps('Monter et configurer une combinaison de types de caméras.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'pipelines',
    label: 'Autre piste',
    title: 'Pipelines dynamiques',
    name: 'Des pipelines dynamiques selon notre état actuel',
    hypothesis: null,
    status: 'a-venir',
    summary: 'Changer de pipeline de vision selon ce que le robot est en train de faire.',
    steps: standardSteps('Mettre en place le changement de pipeline selon l’état du robot.'),
    log: [],
    results: EMPTY_RESULTS,
  },
];

// Terms scrolling in the band before the objective.
export const tickerItems = [
  'MegaTag1',
  'MegaTag2',
  'Tag flip',
  'Tag flickering',
  'Pigeon 2.0 → NavX3',
  '2 × Limelight 3G',
  'Caractérisation du swerve',
  'STEMley Cup',
  '31.10.2026',
];
