import React from 'react';
import './App.css';
import BankList from './Component/BankList';
import Cache from 'react-api-cache';


class App extends React.Component {
  render() {
    return (
      <div>
        <Cache>
            {({ store, actions }) => (
                <BankList cacheActions={actions} />
            )}
        </Cache>
      </div>
    );
  }
}

export default App;
