import { nextSteps } from '@/data/content';
import './NextSteps.scss';

function NextSteps() {
  return (
    <section className="next-steps" aria-label="Prochaines étapes">
      {nextSteps.map((step) => (
        <div key={step.title} className="next-steps__item">
          <span className="label">{step.label}</span>
          <h3 className="next-steps__title display">{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </section>
  );
}

export default NextSteps;
