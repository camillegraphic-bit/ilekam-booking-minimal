"use client";
import { useState } from "react";

export default function TestBooking() {
  const [slotId, setSlotId] = useState("2025-09-20-3");
  const [email, setEmail] = useState("test@example.com");
  const [result, setResult] = useState<any>(null);

  async function book() {
    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slotId, email }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Test réservation</h1>
      <div>
        <label>Slot ID: </label>
        <input value={slotId} onChange={e => setSlotId(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <button onClick={book}>Réserver</button>
      {result && (
        <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
