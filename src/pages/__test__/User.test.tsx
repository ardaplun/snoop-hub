import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import OnTestedComponent from '../../router';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  const noop = () => {};
  Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
});

describe('<UserPage />', () => {
  let component = <OnTestedComponent />
  
  it('properly show loader when loading user the repos', async () => {
    // redirect url
    const { asFragment, findByTestId, queryByText, queryAllByText } = render(component);
    const inputSearch = await findByTestId('input-search');

    fireEvent.change(inputSearch, { target: { value: 'ardaplun' } });
    fireEvent.keyDown(inputSearch, { key: 'Enter', keyCode: 13 });

    await waitForElement(() => queryByText(/Found/i));
    const userNameFound = queryAllByText(/ardaplun/i);
    fireEvent.click(userNameFound[1]);
    // end of redirect url

    await waitForElement(() => queryByText(/Welcome/i));

    const loader = await findByTestId('loader');
    expect(loader).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('show the repos', async () => {
    const { asFragment, findByTestId, findAllByTestId } = render(component);

    const repos = await findByTestId('repos-list');
    const reposResult = await findAllByTestId('repos');
    expect(repos).toBeInTheDocument();
    expect(reposResult).toHaveLength(10);
    expect(asFragment()).toMatchSnapshot();
  });

  it('show the repos readme', async () => {
    const { asFragment, findByTestId, queryByText } = render(component);

    const reposClone = await findByTestId('repo-readme-snoop-hub');
    fireEvent.click(reposClone);

    await waitForElement(() => queryByText(/Readme/i));
    let readmePage = queryByText(/snoop-hub Readme/i);

    expect(readmePage).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
})