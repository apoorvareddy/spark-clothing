import { render, fireEvent, screen } from '@testing-library/react';
import MenuItem from './MenuItem';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { HashRouter } from 'react-router-dom';

describe('MenuItem', () => {
  // Checking MenuItem is navigating to the correct path when clicked
  it('MenuItem should navigate to the correct path when clicked', () => {
    // Mock props for the MenuItem component
    const title = 'HOME';
    const path = '/';
    const iconSrc = faHouse;
    const showIcons = true;

    // 1) Render the MenuItem component with the mock props inside a HashRouter to check the NavLink
    render(
      <HashRouter>
        <MenuItem title={title} path={path} iconSrc={iconSrc} showIcons={showIcons} />
      </HashRouter>
    );

    // Get the title text from the rendered screen
    const linkTitle = screen.getByText(title);

    // Assert that the NavLink contains the title text
    expect(linkTitle).toBeInTheDocument();

    // Get the NavLink element
    const navLink = screen.getByText('HOME');

    // Simulate a click on the NavLink
    fireEvent.click(navLink);

    // Assert that the navigation to the correct path happened
    expect(window.location.hash).toBe(`#${path}`);
  });

  // 2) Checking whether the Font Awesome Icons rendered properly when showIcons is true
  it('MenuItem should render the FontAwesomeIcon when showIcons value is true', () => {
    // Mock props for the MenuItem component
    const title = 'HOME';
    const path = '/';
    const iconSrc = faHouse;
    const showIcons = true;

    // Render the MenuItem component with the mock props inside a HashRouter
    render(
      <HashRouter>
        <MenuItem title={title} path={path} iconSrc={iconSrc} showIcons={showIcons} />
      </HashRouter>
    )

    // get home icon and link text
    const home = screen.getByText('HOME');
    // Assert: HOME link text is present and fa-house icon present
    expect(home.childNodes[0]).toHaveClass('svg-inline--fa fa-house');
    expect(home.childNodes[1]).toHaveTextContent('HOME');
  });

  // 3) Checking to confirm the Font Awesome Icons not Rendered when showIcons is false
  it('MenuItem should not render the FontAwesomeIcon when showIcons value is false', () => {
    // Mock props for the MenuItem component
    const title = 'HOME';
    const path = '/';
    const iconSrc = faHouse;
    const showIcons = false;

    // Render the MenuItem component with the mock props inside a HashRouter
    render(
      <HashRouter>
        <MenuItem title={title} path={path} iconSrc={iconSrc} showIcons={showIcons} />
      </HashRouter>
    )
    // get home icon and link text
    const home = screen.getByText('HOME');
    // Assert: HOME link text is present and fa-house icon present
    expect(home.childNodes[0]).toHaveTextContent('HOME');
  });
});
