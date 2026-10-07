import SplitWords from '../SplitWords/SplitWords';
import './Hero.scss';

function Hero() {
  return (
    <section className="hero" id="top">
      <h1 className="hero__title display">
        <SplitWords text="Vision et estimation de position" />
      </h1>
      <p className="hero__intro">
        Un projet de recherche et développement pour comprendre pourquoi notre robot ne sait pas
        toujours où il se trouve, et pour corriger le problème avant la STEMley Cup.
      </p>
    </section>
  );
}

export default Hero;
