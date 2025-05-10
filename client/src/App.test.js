import { render, screen } from '@testing-library/react';
import App from './App';
import Register from './Components/Register';
import Header from './Components/Header';

test('renders learn react link', () => {
  render(
    <>
      <App />
      <Header />
      <Register/>
    </>
  );  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
