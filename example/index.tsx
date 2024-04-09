import React from 'react';
import ReactDOM from 'react-dom';
import { When, Each } from '../dist/main.mjs';

const App = () => {

  return (
    <div>
      <When condition={true}>test  When</When>
      <Each items={[1, 3, 4, 5]}>
        {i => (<span>a-${i}</span>)}
      </Each>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
