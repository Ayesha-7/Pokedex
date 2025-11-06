import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Spin, Tag } from 'antd';
import { useGetPokemonDetails } from 'src/hooks/useGetPokemons';
import { tss } from 'src/tss';

export const PokemonDetailDialog = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useGetPokemonDetails(Number(id));
  const navigate = useNavigate();
  const { classes } = useStyles();

  const handleClose = () => navigate('/list');

  let content = null;

  if (loading) {
    content = (
      <div className={classes.center}>
        <Spin size="large" />
      </div>
    );
  } else if (error) {
    content = <div className={classes.center}>Failed to load Pokémon details.</div>;
  } else if (data) {
    content = (
      <div className={classes.content}>
        <div className={classes.imageWrap}>
          <img src={data.sprite} alt={data.name} className={classes.sprite} loading="lazy" />
        </div>

        <div className={classes.title}>
          {data.name} #{data.number}
        </div>

        <div className={classes.types}>
          {data.types?.map((t) => (
            <Tag key={t} className={classes.tag}>
              {t}
            </Tag>
          ))}
        </div>

        <div className={classes.infoGrid}>
          <div>
            <span className={classes.label}>Height</span>
            <p className={classes.value}>{data.height}</p>
          </div>
          <div>
            <span className={classes.label}>Weight</span>
            <p className={classes.value}>{data.weight}</p>
          </div>
          <div>
            <span className={classes.label}>Capture Rate</span>
            <p className={classes.value}>{data.capture_rate}</p>
          </div>
        </div>

        <div className={classes.stats}>
          <div className={classes.subTitle}>Stats</div>
          <div className={classes.statList}>
            {data.stats?.map((s: any) => (
              <div key={s.name} className={classes.statItem}>
                <span className={classes.statName}>{s.name}</span>
                <span className={classes.statValue}>{s.base_stat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={!!id}
      onCancel={handleClose}
      footer={null}
      centered
      width={520}
      destroyOnClose
      className={classes.modal}
    >
      {content}
    </Modal>
  );
};

const useStyles = tss.create(({ theme }) => ({
  modal: {
    '.ant-modal-content': {
      backgroundColor: theme.color.surfaceAlt,
      borderRadius: theme.size.radius.lg,
      border: `${theme.border.width.normal} ${theme.border.style.solid} ${theme.color.border}`,
      boxShadow: theme.shadow.lg,
      padding: theme.size.spacing.lg,
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    color: theme.color.text.secondary,
  },
  content: {
    textAlign: 'center',
  },
  imageWrap: {
    background: theme.color.surface,
    borderRadius: theme.size.radius.md,
    padding: theme.size.spacing.md,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.size.spacing.md,
  },
  sprite: {
    width: 160,
    height: 160,
    objectFit: 'contain',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  title: {
    fontWeight: theme.font.weight.bold,
    fontSize: theme.size.text.heading1,
    color: theme.color.text.primary,
    marginBottom: theme.size.spacing.sm,
  },
  subTitle: {
    fontSize: theme.size.text.heading2,
    fontWeight: theme.font.weight.medium,
    color: theme.color.text.secondary,
    marginBottom: theme.size.spacing.sm,
  },
  types: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.size.spacing.xs,
    flexWrap: 'wrap',
    marginBottom: theme.size.spacing.md,
  },
  tag: {
    background: theme.color.primary,
    color: theme.color.text.inverse,
    border: 'none',
    borderRadius: theme.size.radius.sm,
    padding: '2px 8px',
    fontWeight: theme.font.weight.medium,
    fontSize: theme.size.text.subtext,
  },
  infoGrid: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: theme.color.surface,
    borderRadius: theme.size.radius.md,
    padding: theme.size.spacing.sm,
    marginBottom: theme.size.spacing.lg,
  },
  label: {
    color: theme.color.text.secondary,
    fontSize: theme.size.text.subtext,
  },
  value: {
    color: theme.color.text.primary,
    fontWeight: theme.font.weight.medium,
    fontSize: theme.size.text.body,
  },
  stats: {
    textAlign: 'left',
  },
  statList: {
    backgroundColor: theme.color.surface,
    borderRadius: theme.size.radius.md,
    padding: theme.size.spacing.md,
    display: 'flex',
    flexDirection: 'column',
    gap: theme.size.spacing.xs,
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statName: {
    color: theme.color.text.secondary,
    textTransform: 'capitalize',
  },
  statValue: {
    color: theme.color.primary,
    fontWeight: theme.font.weight.medium,
  },
}));
