export const TESTS_DOC_URL =
  'https://docs.google.com/document/d/12o9YAPkjacXKDHhIrlNSZxjUvwi0orZ9X83kHwSho5k/edit?usp=sharing';

// 28 novembre 2026, compétition d’Ottawa (les mois commencent à 0).
export const DEADLINE = new Date(2026, 10, 28);

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
    id: 'reference',
    label: 'Étape 0 · Avant tout',
    title: 'Référence',
    name: 'Mesurer StemleyBot tel qu’il est aujourd’hui',
    hypothesis: null,
    status: 'en-cours',
    summary:
      'Chaque étape suivante se compare à ces résultats. On ne change rien au code : on mesure, on note, puis on commence.',
    steps: [
      {
        title: 'Finir la caractérisation du swerve',
        status: 'en-cours',
        text: 'Pour un suivi de trajectoire précis en mode autonome, et pour que seuls les effets de la vision restent dans nos résultats.',
      },
      {
        title: 'Vérifier les transformations des caméras',
        status: 'a-faire',
        text: 'Robot à un endroit mesuré, 2 tags ou plus en vue : comparer la pose au ruban. Une caméra décalée de quelques degrés fausse le cap.',
      },
      {
        title: 'Trouver quelles caméras servent à la position',
        status: 'a-faire',
        text: 'limelight-shooter, la Thrifty et la Swifty : la gauche est dans OTHER_LIMELIGHTS.',
      },
      {
        title: 'Marquer le code de départ',
        status: 'a-faire',
        text: 'Étiquette git vision-baseline sur stable, pour toujours pouvoir revenir en arrière.',
      },
      {
        title: 'Rejouer tous les tests',
        status: 'a-faire',
        text: 'Statique, rotation, trajectoires par la bump et la tower, en mode autonome, avec vidéo et estimation de position.',
      },
      {
        title: 'Noter les résultats de référence',
        status: 'a-faire',
        text: 'Les 4 critères, dans les résultats de cette étape.',
      },
    ],
    log: [
      { tag: 'Décision', text: 'Chaque test sera un mode autonome, pour qu’il soit constant d’une fois à l’autre.' },
      {
        tag: 'Décision',
        text: 'On commence par la caractérisation du swerve, pour délimiter le problème à la vision.',
      },
      {
        tag: 'Décision',
        text: 'Une étape à la fois : un commit par étape sur la branche vision-ottawa, et une étiquette vision-rN-ok quand elle est validée.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'pr3',
    label: 'Étape 1 · Pour H.5, H.10, H.11',
    title: 'Pipeline et suivi',
    name: 'Porter le pipeline du PR #3 et retirer le boost',
    hypothesis: 'Images appliquées dans le désordre',
    status: 'a-venir',
    summary:
      'Chaque image passe une liste de filtres, et chaque rejet est enregistré avec sa raison. On garde les limites actuelles de StemleyBot pour cette étape : seul le fonctionnement change.',
    steps: [
      {
        title: 'Copier les fichiers du PR #3',
        status: 'a-faire',
        text: 'Les 18 fichiers de frc/lib/vision (pipeline, filtres, HeadingSeeder, Relocalizer) et VisionTelemetry : ils n’existent pas encore dans StemleyBot.',
      },
      {
        title: 'Brancher le nouveau pipeline',
        status: 'a-faire',
        text: 'Localization, Vision, Robot et RobotContainer : lire toutes les images de la file, MT1 et MT2 de la même image, triées par heure de capture.',
      },
      {
        title: 'Retirer le boost',
        status: 'a-faire',
        text: 'Le bouton, le verrou isDisabled qui le laissait allumé en autonome, BOOST_VISION_MATRIX et le contournement des filtres.',
      },
      {
        title: 'Retirer le code inutile',
        status: 'a-faire',
        text: 'Le 2e estimateur poseEstimatorVis et les constantes inutilisées (VISION_CONFIDENT_MAT, MADVANTAGE_*, IGNORE_MATRIX).',
      },
      {
        title: 'Corriger les tests en français',
        status: 'a-faire',
        text: 'String.format(Locale.ROOT, …) : sinon 4 tests échouent à cause de la virgule décimale.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [
      {
        tag: 'Revue',
        text: 'Sur TechSwerves2027, 72 tests sur 72 passent en anglais, et le PR fusionne sans conflit avec la branche 2027.',
      },
      { tag: 'Revue', text: 'Un test confirme que MT1 et MT2 de la même image sont tous les deux appliqués.' },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'filtres',
    label: 'Étape 2 · Pour H.2, H.7, H.12, H.14',
    title: 'Filtres plus sûrs',
    name: 'Refuser les images peu fiables',
    hypothesis: 'Aucun filtre hors terrain ni distance',
    status: 'a-venir',
    summary:
      'Jamais de cap avec un seul tag, pas d’images quand le robot tourne vite, pas de tags au-delà de 4,5 m et pas de positions hors du terrain.',
    steps: [
      {
        title: 'Refuser MT1 avec un seul tag',
        status: 'a-faire',
        text: 'Remplace la règle actuelle : un tag jusqu’à 3 m avec une ambiguïté de 0,7.',
      },
      {
        title: 'Limite de rotation à 100°/s',
        status: 'a-faire',
        text: 'Remplace 720°/s, la vitesse max du robot. 1114 utilise 60°/s et 254 100°/s.',
      },
      {
        title: 'Refuser les positions hors du terrain',
        status: 'a-faire',
        text: 'Bord du terrain + 0,25 m, et refuser une image si la caméra n’aurait pas pu voir un de ses tags depuis cette position.',
      },
      {
        title: 'Refuser les tags au-delà de 4,5 m',
        status: 'a-faire',
        text: 'Pour 1 tag comme pour 2 tags ou plus, selon la distance moyenne des tags.',
      },
      {
        title: 'Retirer l’ancien filtre de saut',
        status: 'a-faire',
        text: 'Le saut de 1,40 m avec ses compteurs 38 / 16, qui comptait les estimations et non le temps.',
      },
      {
        title: 'Retirer le filtre circulaire',
        status: 'a-faire',
        text: 'Le cercle de Vision.java, MAX_TARGET_DISTANCE et withMaxTargetDistance. Il choisissait les tags selon la pose estimée : si elle est fausse, la caméra ne voit plus les tags qui la corrigeraient. La limite de 4,5 m le remplace.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [
      {
        tag: 'Décision',
        text: 'Le filtre circulaire entre en conflit avec notre logique : il se base sur la pose qu’on cherche à corriger. On le retire ici, et l’ancienne étape sur l’ambiguïté n’a plus lieu d’être, puisque MT1 à un seul tag est refusé.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'matrice',
    label: 'Étape 3 · Pour H.4, H.6',
    title: 'Matrice de confiance',
    name: 'Plus de confiance en l’odométrie, 50/50 près des tags',
    hypothesis: 'Matrice de l’estimateur trop confiante en la vision',
    status: 'a-venir',
    summary:
      'Roues plus strictes en x, y (0,02 m) et plus souples en cap (0,01 rad). 50/50 à moins de 2 m, puis la vision compte de moins en moins. Dernière étape à faire absolument avant Ottawa.',
    steps: [
      {
        title: 'Changer la confiance des roues',
        status: 'a-faire',
        text: '0,02 m en x, y (au lieu de 0,05) et 0,01 rad pour le cap (au lieu de 0,0002°).',
      },
      {
        title: 'Changer la formule de la vision',
        status: 'a-faire',
        text: 'σ_xy = max(0,02 ; 0,02 · (d/2)⁴ / √tags) au lieu de 0,15 · d^1,8 / tags.',
      },
      {
        title: 'Envoyer le taux de rotation à MT2',
        status: 'a-faire',
        text: 'Aujourd’hui MT2 reçoit toujours 0 : yawRateSupplier est gardé mais jamais lu.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [
      {
        tag: 'Décision',
        text: 'K = 0,5 par image à moins de 2 m, 0,06 à 4 m avec un tag, rejet au-delà de 4,5 m.',
      },
      {
        tag: 'Analyse',
        text: 'StemleyBot envoie déjà le cap de l’estimateur à MT2 (H.6) ; il ne manque que le taux de rotation.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'depart',
    label: 'Étape 4 · Si le temps le permet',
    title: 'Pose avant le match',
    name: 'Recaler le cap et la position avant le match',
    hypothesis: null,
    status: 'a-venir',
    summary:
      'Robot désactivé et immobile : le cap et la position se recalent sur 5 images qui concordent. Au départ de l’autonome, la vision ne remplace la pose de départ que si l’écart est petit.',
    steps: [
      {
        title: 'Recaler le cap',
        status: 'a-faire',
        text: '5 images MT1 d’une caméra, 2 tags ou plus, à moins de 2° les unes des autres.',
      },
      {
        title: 'Recaler la position',
        status: 'a-faire',
        text: '5 images MT2 d’une caméra, 2 tags ou plus, à moins de 15 cm les unes des autres.',
      },
      {
        title: 'Limiter le départ de l’autonome',
        status: 'a-faire',
        text: 'Au-delà d’environ 10° ou 1 m d’écart, garder la pose de départ de l’autonome et afficher une alerte.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'inclinaison',
    label: 'Étape 5 · Pour H.9',
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
      {
        title: 'Retirer les anciens triggers de bump',
        status: 'a-faire',
        text: 'onBump, enteredOnBump et exitedBump, basés sur la position estimée, qui est justement fausse après la bump.',
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
    id: 'odometrie',
    label: 'Étape 6 · Pour H.13',
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
    id: 'securite',
    label: 'Étape 7 · Sécurité',
    title: 'Interrupteur et repli',
    name: 'Pouvoir couper la vision et survivre à un gyroscope perdu',
    hypothesis: null,
    status: 'a-venir',
    summary:
      'Un interrupteur sur le tableau de bord pour couper la vision (comme 5940), et un repli sur les roues si le gyroscope se déconnecte (comme 1114, 4481 et 6328).',
    steps: [
      {
        title: 'Interrupteur vision',
        status: 'a-faire',
        text: 'Utile aussi pendant les tests : comparer avec et sans vision dans la même séance.',
      },
      {
        title: 'Repli gyroscope',
        status: 'a-faire',
        text: 'Si le gyroscope se déconnecte, calculer le cap avec la cinématique des roues.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'cropping',
    label: 'Étape 8 · Performance',
    title: 'Cropping',
    name: 'Activer le cropping de la Limelight',
    hypothesis: null,
    status: 'a-venir',
    summary:
      'ProgressiveCropping est déjà codé mais désactivé : il recadre l’image autour des tags vus (marge de 25 %) et revient à l’image complète quand il perd des tags.',
    steps: standardSteps(
      '.withCrop(true) sur chaque caméra dans RobotSpecifics. Surveiller les images à 2 tags : un cadre trop serré peut en rater un.',
    ),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'navx3',
    label: 'Étape 9 · Après Ottawa · Pour H.1',
    title: 'Pigeon 2.0 → NavX3',
    name: 'Utiliser le NavX3 ou le gyroscope du SystemCore',
    hypothesis: 'Imprécision au niveau du gyroscope',
    status: 'a-venir',
    summary:
      'Un changement de matériel, donc après Ottawa : on change une seule chose à la fois, une fois la vision stabilisée.',
    steps: [
      {
        title: 'Remplacer le Pigeon 2.0 par un NavX3',
        status: 'a-faire',
        text: 'Le gyroscope du SystemCore reste une alternative.',
      },
      ...standardSteps('').slice(1),
    ],
    log: [
      { tag: 'Décision', text: 'Le gyroscope était la première hypothèse sur laquelle on s’est penché.' },
      {
        tag: 'Décision',
        text: 'La caractérisation du swerve passe à l’étape 0, et le NavX3 après Ottawa.',
      },
    ],
    results: EMPTY_RESULTS,
  },
  {
    id: 'blacklist',
    label: 'Étape 10 · Après Ottawa · Pour H.8',
    title: 'Vraie blacklist',
    name: 'Faire une vraie blacklist, et retirer les tags trop loin un par un',
    hypothesis: 'Blacklist = not whitelist',
    status: 'a-venir',
    summary:
      'Remplacer le « not whitelist » actuel par une vraie liste de tags à ignorer, et retirer d’une image les tags trop loin plutôt que toute l’image, comme 5940.',
    steps: standardSteps('Écrire une vraie blacklist et le retrait des tags trop loin, un par un.'),
    log: [],
    results: EMPTY_RESULTS,
  },
  {
    id: 'photonvision',
    label: 'Étape 11 · Après Ottawa',
    title: 'PhotonVision',
    name: 'Essayer PhotonVision',
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
    label: 'Étape 12 · Après Ottawa',
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
    label: 'Étape 13 · Après Ottawa',
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
  'Ottawa',
  '28.11.2026',
];
