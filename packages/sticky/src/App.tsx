import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StickyCard, StickyCardItem } from './components/sticky-card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <StickyCard>
        <StickyCardItem title="卡片1">
          123123123
        </StickyCardItem>
        <StickyCardItem title="卡片2">
          123123123
        </StickyCardItem>
        <StickyCardItem title="卡片2">
          123123123
        </StickyCardItem>
        <StickyCardItem title="卡片2">
          123123123
        </StickyCardItem>
        <StickyCardItem title="卡片2">
          123123123
        </StickyCardItem>
      </StickyCard>
    </div>
  );
}

export default App;
