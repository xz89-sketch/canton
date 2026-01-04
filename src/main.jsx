

// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 引入你的主组件

// 找到 HTML 中的 <div id="root"></div>
const root = ReactDOM.createRoot(document.getElementById('root'));

// 渲染 App 组件
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
