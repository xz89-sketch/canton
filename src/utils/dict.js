// src/utils/dict.js

let DICTIONARY = null;

export async function loadDictionary() {
  if (DICTIONARY) return DICTIONARY;

  const res = await fetch('/data/canto_dict.json');
  const data = await res.json();

  // 构建一个简单的搜索索引（可选，提升查找速度）
  const index = {};
  data.forEach(item => {
    const keys = [
      item.simp?.toLowerCase(),
      item.trad?.toLowerCase(),
      item.jyutping?.toLowerCase()
    ].filter(Boolean);
    keys.forEach(key => {
      if (!index[key]) index[key] = [];
      index[key].push(item);
    });
  });

  DICTIONARY = { data, index };
  return DICTIONARY;
}

export function lookup(query) {
  if (!DICTIONARY) {
    console.warn('Dictionary not loaded yet. Call loadDictionary() first.');
    return [];
  }

  const q = query.trim().toLowerCase();
  if (DICTIONARY.index[q]) {
    return DICTIONARY.index[q];
  }

  // 模糊匹配（可选）
  return DICTIONARY.data.filter(item =>
    item.simp?.toLowerCase().includes(q) ||
    item.trad?.toLowerCase().includes(q) ||
    item.jyutping?.toLowerCase().includes(q)
  );
}
