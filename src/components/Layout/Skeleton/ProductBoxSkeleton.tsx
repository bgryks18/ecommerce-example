import { Skeleton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    boxSizing: 'border-box',
    animation: `$showProductBox 300ms ${theme.transitions.easing.easeInOut}`,
  },
  '@keyframes showProductBox': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  media: {
    position: 'relative',
    background: theme.palette.grey[200],
  },

  cardContent: {
    boxSizing: 'border-box',
    position: 'absolute',
    bottom: 0,
    height: 138,
    background: theme.palette.grey[50],

    width: '100%',
    padding: 16,
    paddingTop: 32,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  star: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
  },
  price: {
    display: 'flex',
    gap: 10,
  },
}))
const ProductBoxSkeleton = () => {
  const classes = useStyles()
  return (
    <Typography component="div" className={classes.container}>
      <Skeleton
        variant="rounded"
        width={'100%'}
        height={370}
        className={classes.media}
      ></Skeleton>

      <Typography component="div" className={classes.cardContent}>
        <Typography component="div" className={classes.cardInfo}>
          <Typography variant="body1" component="div" fontWeight="bold">
            <Skeleton width={140} height={26} />
          </Typography>
          <Typography variant="body2" component="div" className={classes.star}>
            <Skeleton variant="text" width={120} height={22} />
          </Typography>
          <Typography variant="body2" component="div" className={classes.price}>
            <Skeleton variant="text" width={90} height={22} />
          </Typography>
        </Typography>
      </Typography>
    </Typography>
  )
}

export default ProductBoxSkeleton
