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
  { label: 'Caméras', text: "Deux Limelight 3G, opposées l'une à l'autre" },
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
  { id: 'H.2', title: 'Tag flip', note: "La pose d'un tag bascule vers une solution miroir." },
  { id: 'H.3', title: 'Tag flickering', note: "Des tags détectés puis perdus d'une image à l'autre." },
  {
    id: 'H.4',
    title: "Matrice de l'estimateur trop confiante en la vision",
    note: "Trop d'importance accordée aux mesures de vision.",
  },
  { id: 'H.5', title: 'MT1 envoyé décalé', note: 'Les mesures MegaTag1 arrivent en retard.' },
  {
    id: 'H.6',
    title: 'MT1 envoyé dans MT2 sans filtrage',
    note: 'Des mesures non filtrées alimentent MT2.',
  },
  { id: 'H.7', title: 'Le filtre circulaire', note: 'Le filtre actuel trierait mal les mesures.' },
  { id: 'H.8', title: 'Blacklist = not whitelist', note: "Notre blacklist n'en est pas une vraie." },
];

export const solutions = [
  { label: 'Pour H.1', text: 'Utiliser le NavX3 ou le gyroscope du SystemCore.' },
  { label: 'Pour H.7', text: "Remplacer le filtre circulaire par l'ambiguïté de la détection." },
  { label: 'Pour H.8', text: 'Faire une vraie blacklist.' },
  { label: 'Pour H.6', text: "Filtrer MT1 avant de l'envoyer dans MT2." },
  { label: 'Autre', text: 'Utiliser PhotonVision.' },
  { label: 'Autre', text: 'Combiner les types de caméras.' },
  { label: 'Autre', text: 'Des pipelines dynamiques selon notre état actuel.' },
];

export const nextSteps = [
  {
    label: "D'abord",
    title: 'Caractériser le swerve',
    text: 'Pour un suivi de trajectoire précis en mode autonome, et isoler la vision des autres facteurs.',
  },
  {
    label: 'Ensuite',
    title: 'Pigeon 2.0 → NavX3',
    text: 'La première hypothèse testée : le gyroscope.',
  },
  {
    label: 'Toujours',
    title: 'Tests en autonome',
    text: "Chaque test est un mode autonome, identique d'une fois à l'autre.",
  },
];
