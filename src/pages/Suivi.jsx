import SolutionTracker from '@/components/SolutionTracker/SolutionTracker';
import { selectSolution } from '@/lib/router';

// Chapter 6 on its own page: the tracker for every solution.
function Suivi({ solution }) {
  return (
    <main>
      <SolutionTracker activeId={solution} onSelect={selectSolution} />
    </main>
  );
}

export default Suivi;
