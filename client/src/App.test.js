import { render, screen } from "@testing-library/react";
import App from "./App";

test("Tiene un boton el Landing Page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenidos/i);
  expect(linkElement).toBeInTheDocument();
});

test("Tiene una imgaen como background", () => {
  render(<App />);
  const linkElement = screen.getByTex(/Crear/i);
  expect(linkElement).toBeInTheDocument();
});
