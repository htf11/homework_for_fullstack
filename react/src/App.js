import React, {useState} from "react";
import "./App.css";

function App() {
  const [digits, setDigits] = useState("");
  const [pi, setPi] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numDigits = parseInt(digits, 10);
    if (numDigits < 1 || numDigits > 1000) {
      setError("Введите число от 1 до 1000");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`https://api.math.tools/numbers/pi?from=0&to=${numDigits}`);
      if (!response.ok) throw new Error("Ошибка сети");
      const data = await response.json();
      if (data.success.total !== 1) throw new Error("Ошибка API");
      setPi(data.contents.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Получить цифры числа π</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={digits}
          onChange={(e) => setDigits(e.target.value.replace(/[^0-9]/g, ""))}
          min="1"
          max="1000"
          required
          placeholder="Количество знаков после запятой"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Загрузка..." : "Получить"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {pi && (
        <div className="result">
          <h2>Результат:</h2>
          <p>{pi}</p>
          <small>Знаков после запятой: {pi.split(".")[1]?.length || 0}</small>
        </div>
      )}
    </div>
  );
}

export default App;
