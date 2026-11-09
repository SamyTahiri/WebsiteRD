export const TESTS_DOC_URL =
  'https://docs.google.com/document/d/12o9YAPkjacXKDHhIrlNSZxjUvwi0orZ9X83kHwSho5k/edit?usp=sharing';

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
  {
    id: 'H.9',
    title: 'Inclinaison sur la bump',
    note: 'Les roues glissent ou décollent, et la vision est acceptée alors que MT2 suppose un robot à plat.',
  },
  {
    id: 'H.10',
    title: 'Boost vision actif pendant l’autonome',
    note: 'isDisabled n’est remis à faux qu’en téléop : le boost reste allumé, sans aucun filtre.',
  },
  {
    id: 'H.11',
    title: 'Images appliquées dans le désordre',
    note: 'Une image plus vieille efface les corrections plus récentes dans l’estimateur.',
  },
  {
    id: 'H.12',
    title: 'Limite de rotation trop haute',
    note: '720°/s, la vitesse max du robot : le filtre ne rejette presque jamais.',
  },
  {
    id: 'H.13',
    title: 'Odométrie à 50 Hz non synchronisée',
    note: 'Une lecture par boucle, et le gyroscope et les roues lus à des moments différents.',
  },
  {
    id: 'H.14',
    title: 'Aucun filtre hors terrain ni distance',
    note: 'Des poses hors du terrain ou à plus de 4,5 m des tags sont acceptées.',
  },
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
    id: 'pr3',
    label: 'Pour H.2, H.5, H.6, H.10, H.11, H.14',
    title: 'Pipeline du PR #3',
    name: 'Fusionner le nouveau pipeline de vision (PR #3)',
    hypothesis: 'MT1 envoyé dans MT2 sans filtrage',
    status: 'en-cours',
    summary:
      'Chaque image passe une liste de filtres, et chaque rejet est enregistré avec sa raison. Le cap vient seulement des images à 2 tags ou plus, et le boost est retiré.',
    steps: [
      {
        title: 'Corriger les tests en français',
        status: 'a-faire',
        text: 'String.format(Locale.ROOT, …) : 4 tests échouent à cause de la virgule décimale.',
      },
      {
        title: 'Limiter la pose de départ en autonome',
        status: 'a-faire',
        text: 'Au-delà d’environ 10° ou 1 m, garder la pose de départ du mode autonome.',
      },
      {
        title: 'Obtenir la revue écrite',
        status: 'en-cours',
        text: 'Les changements demandés par Arnaud, par écrit.',
      },
      ...standardSteps('Fusionner le PR #3 sur la branche 2027.'),
    ],
    log: [
      {
        tag: 'Revue',
        text: '72 tests sur 72 passent en anglais, et le PR fusionne sans conflit avec la branche 2027.',
      },
      { tag: 'Revue', text: 'Un test confirme que MT1 et MT2 de la même image sont tous les deux appliqués.' },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'matrice',
    label: 'Pour H.4',
    title: 'Matrice de confiance',
    name: 'Plus de confiance en l’odométrie, 50/50 près des tags',
    hypothesis: 'Matrice de l’estimateur trop confiante en la vision',
    status: 'a-venir',
    summary:
      'Jamais de cap avec un seul tag. Roues plus strictes en x, y (0,02 m) et plus souples en cap (0,01 rad). 50/50 à moins de 2 m, puis la vision compte de moins en moins, et rien au-delà de 4,5 m.',
    steps: standardSteps(
      'σ_xy = max(0,02 ; 0,02 · (d/2)⁴ / √tags), limite de distance à 4,5 m pour 1 tag et pour 2 tags ou plus.',
    ),
    log: [
      { tag: 'Décision', text: 'Jamais de cap avec un seul tag : déjà fait dans le PR #3.' },
      { tag: 'Décision', text: 'K = 0,5 par image à moins de 2 m, 0,06 à 4 m avec un tag, rejet au-delà de 4,5 m.' },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'inclinaison',
    label: 'Pour H.9',
    title: 'Inclinaison',
    name: 'Détecter l’inclinaison (6328) et corriger après la bump (1678)',
    hypothesis: 'Inclinaison sur la bump',
    status: 'a-venir',
    summary:
      'Mesurer l’inclinaison avec la formule de 6328, bloquer la vision pendant la bump, puis faire plus confiance à la vision juste après, comme 1678.',
    steps: [
      {
        title: 'Mesurer l’inclinaison',
        status: 'a-faire',
        text: 'inclinaison = acos(cos(tangage) · cos(roulis)), enregistrée avec l’heure à chaque boucle.',
      },
      {
        title: 'Rejeter les images inclinées',
        status: 'a-faire',
        text: 'Selon l’heure de capture : plus de 4 à 5° dans les 0,15 s avant l’image.',
      },
      {
        title: 'Plus de confiance après la bump',
        status: 'a-faire',
        text: 'σ_xy × 0,3 pour MT2 à 2 tags ou plus, jamais pour le cap, jusqu’à 2 ou 3 images acceptées ou 2 s.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [
      {
        tag: 'Décision',
        text: 'L’ancien boost à la sortie de la bump (PR #158) est abandonné : il boostait les images prises pendant la bump.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'rotation',
    label: 'Pour H.12',
    title: 'Limite de rotation',
    name: 'Baisser la limite de rotation de la vision',
    hypothesis: 'Limite de rotation trop haute',
    status: 'a-venir',
    summary: 'Rejeter les images quand le robot tourne vite, comme 1114 (60°/s) et 254 (100°/s).',
    steps: standardSteps('Baisser la limite à environ 100–120°/s, idéalement selon la vitesse au moment de l’image.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'odometrie',
    label: 'Pour H.13',
    title: 'Odométrie synchronisée',
    name: 'Lire le gyroscope et les roues ensemble, puis plus souvent',
    hypothesis: 'Odométrie à 50 Hz non synchronisée',
    status: 'a-venir',
    summary:
      'D’abord lire tous les signaux en même temps, puis un thread d’odométrie à 250 Hz comme 1114 et 6328.',
    steps: standardSteps(
      'BaseStatusSignal.refreshAll sur le gyroscope et les roues, puis un thread d’odométrie avec l’heure de chaque lecture.',
    ),
    log: [],
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
    log: [
      {
        tag: 'Analyse',
        text: 'Le code de base envoyait le cap MT1 de la caméra à MT2. Le PR #3 envoie le cap de l’estimateur à la place.',
      },
    ],
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
    log: [
      {
        tag: 'Analyse',
        text: '6328 et 4481 choisissent la solution la plus proche du cap actuel ; 254 rejette au-dessus de 0,19. Le PR #3 évite le problème en refusant MT1 à un seul tag.',
      },
    ],
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
    log: [
      {
        tag: 'Analyse',
        text: '4481 et 5940 utilisent le multi-tag de PhotonVision pour le cap. MT1 à 2 tags ou plus suit la même idée sur Limelight.',
      },
    ],
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
