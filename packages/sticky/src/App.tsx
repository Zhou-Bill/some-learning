import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StickyCard, StickyCardItem } from './components/sticky-card';

function App() {
  return (
    <div className="App" style={{height: 2000}}>
      {/* <header className="App-header">
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
      </header> */}
      <StickyCard offset={0}>
        {
          [1, 2, 3, 4].map((_item) => {
            return (
              <StickyCardItem key={_item} title={`卡片${_item}`}>
                {
                  Array.from({ length: 6 * _item }).map((item, index) => {
                    return (
                      <div style={{height: 32}} key={index}>
                        123123123-{index}
                      </div>
                    )
                  })
                }
              </StickyCardItem>
            )
          })
        }
      </StickyCard>
    </div>
  );
}

export default App;
