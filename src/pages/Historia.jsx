import { historia } from '../data/site.js';

export default function Historia() {
  return (
    <main className="container page">
      <h1 className="section-title">NOSSA HISTÓRIA</h1>
      <div className="historia">
        <p>{historia}</p>
      </div>
    </main>
  );
}
