import Home from '@/app/(site)/page';
import Slider from "@/components/Slider";


import { fireEvent, render, screen } from '@testing-library/react';

// Prueba Unitaria 
/* it('renders home page', () => {
  render(<Home/>);
  const headingElement = screen.getByText(/Hello/i); // Modified
  expect(headingElement).toBeInTheDocument();
}) */

// Prueba de Integración
/* describe('Home page integration', () => {
  it('renders home page with sidebar', () => {
    <>
    <Home/>
    <Slider/>
    </>
  })
  const headingElement = screen.getByText(/Hello/i);
  expect(headingElement).toBeInTheDocument();

}) */

// Prueba de Sistema
/* describe('Home page system', () => {
  it('allows user to interact to home page', () => {
    render(<Home/>);
    
    const headingElement = screen.getByText(/Hello/i);
    expect(headingElement).toBeInTheDocument();
    
    const buttonElement = screen.getByRole('button', {name: /Click me/i});
    fireEvent.click(buttonElement);

    const resultElement = screen.getByText(/You Clicked Button/i);
    expect(resultElement).toBeInTheDocument();
  })
}) */

// Prueba de Aceptación
describe('Home page acceptance', () => {
  it('allowsuser to navigate and use features as expected', () => {
    render(<Home/>);
    
    const headingElement = screen.getByText(/Hello/i);
    expect(headingElement).toBeInTheDocument();
    
    const navLinkElement = screen.getByRole('link', {name: /Go to Search/i});
    fireEvent.click(navLinkElement);

    const aboutHeadingElement = screen.getByText(/search/i);
    expect(aboutHeadingElement).toBeInTheDocument();

    const formInputElement = screen.getByLabelText(/Name/i)
    fireEvent.change(formInputElement, {target: {value: 'Franco Zeta'}});

    const submitButtonElement = screen.getByRole('button', {name: /Submit/i});
    fireEvent.click(submitButtonElement);

    const successMessageElement = screen.getByText(/Form submitted successfully/i);
    expect(successMessageElement).toBeInTheDocument();
  });
});