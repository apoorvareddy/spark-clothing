import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Menu from './Menu';

describe('Menu', () => {
  // Checking if Menu is rendering all the Menu Items correctly
  it('Menu should render all menu items correctly', () => {
    // Render the Menu component with showIcons prop inside HashRouter
    render(
      <HashRouter>
        <Menu showIcons={true} />
      </HashRouter>
    );

    // Assert that the correct prop is passed to all the menu item components
    const navItems = screen.getByTestId('nav-items').querySelectorAll('.nav-item');
    expect(navItems.length).toBe(4); // As we have 4 nav items

    // Assert that the Menu item title is rendered correctly
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument();
    expect(screen.getByText('ABOUT US')).toBeInTheDocument();
    expect(screen.getByText('CONTACT US')).toBeInTheDocument();
  });

  // Checking whether the Menu is passing correct showIcons prop to MenuItem component
  it('Menu should pass the correct showIcons prop to the MenuItem component', () => {
    // Render the Menu component with showIcons prop inside HashRouter
    render(
      <HashRouter>
        <Menu showIcons={true} />
      </HashRouter>
    );

    // Check the showIcons prop for all the nav items
    const fontIcons = screen.getByTestId('nav-items').querySelectorAll('.svg-inline--fa');
    expect(fontIcons.length).toBe(4);
  });
});
