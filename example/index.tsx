import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { When, Each } from '../dist/main.mjs';

const App = () => {
   
  return (
    <div>hoañ
      <When condition={true}>test </When>
      <Each items={[1,3,4,5]}>
        {i=>(<span>a-</span>)}
      </Each>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
