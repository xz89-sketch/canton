// src/App.jsx
import { useState, useEffect } from 'react';
import { loadDictionary, lookup } from './utils/dict';

function App() {
  const [results, setResults] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // 页面加载时预加载词典
    loadDictionary().catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = lookup(input);
    setResults(found);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>粤语查词</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入简体、繁体或粤拼（如 nei5 hou2）"
          style={{ width: '70%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px' }}>查</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {results.length === 0 ? (
          <p>未找到结果</p>
        ) : (
          results.map((item, i) => (
            <div key={i} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <p><strong>简体：</strong>{item.simp}</p>
              <p><strong>繁体：</strong>{item.trad}</p>
              <p><strong>粤拼：</strong>{item.jyutping}</p>
              <p><strong>释义：</strong>{item.definition}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
