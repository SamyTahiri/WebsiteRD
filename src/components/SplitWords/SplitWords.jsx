import { Fragment } from 'react';
import './SplitWords.scss';

// Splits a title into words, each in its own mask, so they can rise into place.
// Screen readers get the plain text once.
function SplitWords({ text }) {
  const words = text.split(' ');
  return (
    <>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          // Index keys: the same word can appear twice ("de", "et").
          <Fragment key={i}>
            <span className="split-word">
              <span style={{ '--w': i }}>{word}</span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </span>
    </>
  );
}

export default SplitWords;
