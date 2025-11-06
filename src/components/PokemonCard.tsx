import React from 'react';
import { Card, Tag } from 'antd';
import { tss } from 'src/tss';
import { Pokemon } from 'src/hooks/useGetPokemons';

const { Meta } = Card;

type Props = {
  pokemon: Pokemon;
  onClick: () => void;
};

export default function PokemonCard({ pokemon, onClick }: Props) {
  const { classes } = useStyles();

  return (
    <Card
      hoverable
      className={classes.card}
      onClick={onClick}
      cover={
        <div className={classes.coverWrap}>
          <div className={classes.coverInner}>
            {pokemon.sprite ? (
              <img
                src={pokemon.sprite}
                alt={pokemon.name}
                className={classes.cover}
                loading="lazy"
              />
            ) : undefined}
          </div>
        </div>
      }
    >
      <Meta
        title={<div className={classes.metaTitle}>{pokemon.name}</div>}
        description={<div className={classes.metaDesc}>#{pokemon.number}</div>}
      />
      <div className={classes.tags}>
        {(pokemon.types || []).map((t) => (
          <Tag key={t} color="default">
            {t}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

const CARD_SIZE = 200;

const useStyles = tss.create(({ theme }) => ({
  card: {
    borderRadius: theme.size.radius.md,
    border: `${theme.border.width.normal} ${theme.border.style.solid}`,
    borderColor: theme.color.border,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: theme.color.surfaceAlt,
    color: theme.color.text.primary,
    display: 'flex',
    flexDirection: 'column',
    width: CARD_SIZE,
    minWidth: CARD_SIZE,
    maxWidth: CARD_SIZE,
    alignItems: 'stretch',
    '&:hover': {
      transform: 'translateY(-6px)',
      borderColor: theme.color.text.primary,
    },
  },
  coverWrap: {
    width: '100%',
    aspectRatio: '1 / 1',
    position: 'relative',
    background: 'transparent',
  },
  coverInner: {
    position: 'absolute',
    inset: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  },
  cover: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  metaTitle: {
    fontWeight: theme.font.weight.bold,
    color: theme.color.text.primary,
    fontSize: theme.size.text.heading2,
  },
  metaDesc: {
    color: theme.color.text.secondary,
    fontSize: theme.size.text.body,
  },
  tags: {
    marginTop: theme.size.spacing.sm,
    display: 'flex',
    gap: theme.size.spacing.sm,
    flexWrap: 'wrap',
  },
  '@media (max-width: 360px)': {
    card: {
      width: CARD_SIZE,
      minWidth: CARD_SIZE,
      maxWidth: CARD_SIZE,
    },
    metaTitle: {
      fontSize: theme.size.text.heading2,
    },
    metaDesc: {
      fontSize: theme.size.text.body,
    },
  },
}));
