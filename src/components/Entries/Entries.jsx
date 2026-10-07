import './Entries.scss';

// Ruled list of label / text rows.
function Entries({ items }) {
  return (
    <ul className="entries">
      {items.map((item) => (
        <li key={item.text} className="entries__row">
          <span className="entries__label label">{item.label}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export default Entries;
