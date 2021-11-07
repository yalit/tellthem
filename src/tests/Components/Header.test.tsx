import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import Header from "../../Components/Header";
import {AppContextProvider} from "../../AppContext";
import SlidesLocalStorageProvider from "../../Providers/SlidesLocalStorageProvider";

describe('Header testing',() => {
  test('header renders app title by default', async () => {
    render(
        <AppContextProvider>
          <Header />
        </AppContextProvider>
    );

    await waitFor(() => {
        const headerElement = screen.getByText(/Tell Them All/i);
        expect(headerElement).toBeInTheDocument();
    })
  });
})


