export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h1>ILEKAM – API minimale</h1>
      <p>Tests rapides :</p>
      <ul>
        <li><a href="/api/ping" target="_blank">/api/ping</a></li>
        <li><a href="/api/availability?date=2025-09-20&durationMin=120" target="_blank">/api/availability</a></li>
      </ul>
    </main>
  );
}
