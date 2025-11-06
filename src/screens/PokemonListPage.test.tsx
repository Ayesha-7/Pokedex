import React from 'react';
import { act, render } from 'src/test-utils';
import { PokemonListPage } from './PokemonListPage';
import { useNavigate } from 'react-router-dom';

jest.mock('src/hooks/useGetPokemons', () => ({
  useGetPokemons: jest.fn().mockReturnValue({ data: [{ id: '1', name: 'Bulbasaur' }] }),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('PokemonListPage', () => {
  test('it renders', () => {
    const { getByText } = render(<PokemonListPage />);
    getByText('Bulbasaur');
  });
  test('clicking on a pokemon calls navigate', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    const { getByText, user } = render(<PokemonListPage />);

    await act(async () => {
      await user.click(getByText('Bulbasaur'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/list/1'); //The route to Bulbasaur
  });
  test('typing in the search bar filters the results', async () => {
    const { getByPlaceholderText, queryByText, user } = render(<PokemonListPage />);
    const input = getByPlaceholderText('Search Pokémon');

    await act(async () => {
      await user.type(input, 'Charmander');
    });

    expect(queryByText('Bulbasaur')).not.toBeInTheDocument();
    expect(queryByText('Charmander')).toBeInTheDocument();
  });
});
