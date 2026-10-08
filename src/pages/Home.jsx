import Hero from '@/components/Hero/Hero';
import ChapterStrip from '@/components/ChapterStrip/ChapterStrip';
import Chapter from '@/components/Chapter/Chapter';
import Entries from '@/components/Entries/Entries';
import HypothesesLedger from '@/components/HypothesesLedger/HypothesesLedger';
import SolutionList from '@/components/SolutionList/SolutionList';
import Ticker from '@/components/Ticker/Ticker';
import Epilogue from '@/components/Epilogue/Epilogue';
import { TESTS_DOC_URL, tests, criteria, hardware } from '@/data/content';

// The report: chapters 1 to 5 and the epilogue. Chapter 6 has its own page (Suivi).
function Home() {
  return (
    <main>
      <Hero />
      <ChapterStrip />

      <Chapter
        id="tests"
        number={1}
        title="Les tests"
        subtitle="Ce qui arrive en match, reproduit sur demande"
      >
        <p>
          Nos expériences reposent sur une série de tests choisis parce qu’ils reproduisent la
          plupart des situations qui peuvent survenir durant un match de compétition.
        </p>
        <Entries items={tests} />
        <p>
          <a href={TESTS_DOC_URL} target="_blank" rel="noreferrer" data-cursor="Ouvrir">
            Consulter le document des tests ↗
          </a>
        </p>
      </Chapter>

      <Chapter
        id="criteres"
        number={2}
        title="Critères"
        subtitle="Réduire la part de subjectivité"
      >
        <p>
          Par la nature du projet, il est impossible de tout décider à partir de résultats
          théoriques. Ces critères rendent nos conclusions aussi concrètes que possible ; certaines
          décisions resteront appuyées par notre jugement.
        </p>
        <Entries items={criteria} />
      </Chapter>

      <Chapter
        id="methode"
        number={3}
        title="Matériel et méthode"
        subtitle="Le robot 9406 de la saison 2026 et la mini base"
      >
        <Entries items={hardware} />
        <p>
          Chaque test est d’abord fait avec la configuration actuelle du robot. Nous gardons une
          vidéo de chaque test et l’estimation de position pendant celui-ci.
        </p>
        <p>
          Ensuite, nous testons une hypothèse à la fois en refaisant tous les tests. Si les
          critères la confirment, nous la gardons et passons à la suivante. Sinon, nous revenons à
          la configuration précédente avant de tester la prochaine.
        </p>
      </Chapter>

      <HypothesesLedger />

      <Chapter id="solutions" number={5} title="Solutions" subtitle="Sept pistes pour la suite">
        <p>
          Clique sur une solution pour voir son suivi : ce qu’on a fait, où on en est et ce qui
          reste.
        </p>
        <SolutionList />
      </Chapter>

      <Ticker />
      <Epilogue />
    </main>
  );
}

export default Home;
