import React from 'react';
import ReactDOM from 'react-dom';
import App from './Poll';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Poll />, div);
});
