import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from "../Header";

test('header renders app title', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Tell Them with some slides/i);
  expect(headerElement).toBeInTheDocument();
});
