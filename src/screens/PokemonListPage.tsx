import React from 'react';
import { tss } from '../tss';
import { Spin } from 'antd';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import PokemonCard from 'src/components/PokemonCard';

const MESSAGE = {
  ERROR: 'Failed to get Pokémons.',
  NOT_FOUND: 'No Pokémon found.',
};

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();

  if (loading) {
    return (
      <div className={classes.rootCenter}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className={classes.root}>{MESSAGE.ERROR}</div>;
  }

  if (!data || data.length === 0) {
    return <div className={classes.root}>{MESSAGE.NOT_FOUND}</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.grid}>
        {data.map((d) => (
          <div key={d.id}>
            <PokemonCard pokemon={d} onClick={() => {}} data-testid={`pokemon-${d.id}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const useStyles = tss.create(({ theme }) => ({
  root: {
    color: theme.color.text.primary,
    padding: theme.size.spacing.md,
    maxWidth: 1200,
    margin: '0 auto',
  },
  rootCenter: {
    padding: theme.size.spacing.xl,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.size.spacing.md,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
}));
