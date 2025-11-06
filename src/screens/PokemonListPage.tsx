import React, { useState, useMemo } from 'react';
import { tss } from '../tss';
import { Input, Spin } from 'antd';
import { useGetPokemons } from 'src/hooks/useGetPokemons';
import PokemonCard from 'src/components/PokemonCard';

const MESSAGE = {
  ERROR: 'Failed to get Pokémons.',
  NOT_FOUND: 'No Pokémon found.',
};

export const PokemonListPage = () => {
  const { classes } = useStyles();
  const { data, loading, error } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!data) return [];
    const term = searchTerm.toLowerCase();
    return data.filter((p) => p.name?.toLowerCase().includes(term));
  }, [data, searchTerm]);

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

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Input
          className={classes.searchInput}
          allowClear
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="large"
        />
        <div className={classes.grid}>
          {filteredData.length > 0 ? (
            filteredData.map((d) => (
              <div key={d.id}>
                <PokemonCard pokemon={d} onClick={() => {}} data-testid={`pokemon-${d.id}`} />
              </div>
            ))
          ) : (
            <div className={classes.noResults}>{MESSAGE.NOT_FOUND}</div>
          )}
        </div>
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
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  searchInput: {
    margin: theme.size.spacing.md,
    marginBottom: theme.size.spacing.lg,
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.size.spacing.md,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  noResults: {
    textAlign: 'center',
    marginTop: theme.size.spacing.xl,
    fontSize: theme.size.text.body,
    color: theme.color.text.secondary,
  },
}));
