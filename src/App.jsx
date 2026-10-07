import Header from './components/Header/Header';
import './App.scss';

function App() {
  return (
    <>
      <Header />
      <main className="app">
        <section className="app__hero">
          <h1>Welcome to WebsiteRD</h1>
          <p>React + SCSS, powered by Vite. Edit <code>src/App.jsx</code> to get started.</p>
        </section>
      </main>
    </>
  );
}

export default App;
