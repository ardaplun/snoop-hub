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

describe('<MainPage />', () => {
  let component = <OnTestedComponent />

  it('properly show loader', async () => {
    const { asFragment, findByTestId } = render(component);
    const loader = await findByTestId('loader');

    expect(asFragment()).toMatchSnapshot();
    expect(loader).toBeInTheDocument();
  });

  it('properly show main page', async () => {
    const { asFragment, findByTestId, queryByText } = render(component);
    const inputSearch = await findByTestId('input-search');
    const welcomeMessage = queryByText(/Welcome to Snoop-hub/i);

    expect(welcomeMessage).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });

  it('input properly do receive value', async () => {
    const { asFragment, getByPlaceholderText } = render(component);
    const inputSearch = getByPlaceholderText(/Search github user/i);
    fireEvent.change(inputSearch, { target: { value: 'ardaplun' } });

    expect(inputSearch.value).toBe('ardaplun');
    expect(asFragment()).toMatchSnapshot();
  });

  it('search by inputted value', async () => {
    const { asFragment, queryByText, queryAllByText, getByPlaceholderText } = render(component);
    const inputSearch = getByPlaceholderText(/Search github user/i);
    
    fireEvent.change(inputSearch, { target: { value: 'ardaplun' } });
    fireEvent.keyDown(inputSearch, { key: 'Enter', keyCode: 13 });
    
    expect(inputSearch).toHaveProperty('disabled');

    await waitForElement(() => queryByText(/Found/i));
    const foundText = queryByText(/Found/i);
    const userNameFound = queryAllByText(/ardaplun/i);

    expect(foundText).toBeInTheDocument();
    expect(userNameFound).toHaveLength(2);
    expect(asFragment()).toMatchSnapshot();
  });

  it('click on search result redirect to user page', async () => {

    const { asFragment, getByPlaceholderText, findByTestId, queryByText, queryAllByText } = render(component);
    const inputSearch = getByPlaceholderText(/Search github user/i);

    fireEvent.change(inputSearch, { target: { value: 'ardaplun' } });
    fireEvent.keyDown(inputSearch, { key: 'Enter', keyCode: 13 });

    await waitForElement(() => queryByText(/Found/i));
    const userNameFound = queryAllByText(/ardaplun/i);
    fireEvent.click(userNameFound[1]);

    // check loader on change page
    await waitForElement(() => findByTestId('loader'));
    const loader = await findByTestId('loader');
    expect(loader).toBeInTheDocument();

    await waitForElement(() => queryByText(/Welcome/i));

    expect(asFragment()).toMatchSnapshot();
  });

})