import React from 'react';
import { render } from '@testing-library/react';
import App from './router';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Not Found/i);
  expect(linkElement).toBeInTheDocument();
});
