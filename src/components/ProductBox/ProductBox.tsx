import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Rating from '@mui/material/Rating'

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    maxHeight: 240,
    backgroundSize: 'contain',
    WebkitBackgroundSize: 'contain',
    aspectRatio: '1/1',
    backgroundColor: theme.palette.secondary.main,
    width: '100%',
  },

  cardContent: {
    paddingTop: 32,
    display: 'flex',
    justifyContent: 'space-between',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardActions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 3,
    padding: '0',
    margin: '0',
    '& button': {
      padding: 0,
      minWidth: 'auto',
      width: 32,
      height: 32,
    },
  },
  price: {
    display: 'flex',
    gap: 10,
  },
  currentPrice: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  oldPrice: {
    color: theme.palette.secondary.main,
    textDecoration: 'line-through',
    fontWeight: '600',
  },
  star: {
    display: 'flex',
    alignItems: 'center',
    columnGap: 8,
  },
  discountButton: {
    borderRadius: 50,
    position: 'absolute',
    top: 10,
    left: 10,
    color: theme.palette.common.white,
    padding: '6px 16px',
    fontSize: '12px',
    cursor: 'default',
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function ProductBox() {
  const classes = useStyles()
  return (
    <Card sx={{ position: 'relative' }}>
      <Typography className={classes.discountButton}>12% off</Typography>
      <CardMedia
        className={classes.cardMedia}
        image="https://s3.amazonaws.com/www-inside-design/uploads/2020/10/aspect-ratios-blogpost-1x1-1.png"
        title="green iguana"
      />
      <CardContent className={classes.cardContent}>
        <Typography component="div" className={classes.cardInfo}>
          <Typography variant="body1" component="div" fontWeight="bold">
            Lizard
          </Typography>
          <Typography variant="body2" component="div" className={classes.star}>
            <Rating
              name="star"
              defaultValue={4}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography
              variant="body2"
              component="span"
              fontWeight="regular"
              color="gray"
            >
              (4)
            </Typography>
          </Typography>

          <Typography variant="body2" component="div" className={classes.price}>
            <span className={classes.currentPrice}>$174.24</span>
            <span className={classes.oldPrice}>$198.00</span>
          </Typography>
        </Typography>

        <CardActions className={classes.cardActions}>
          <Button size="small" variant="outlined">
            -
          </Button>
          <Typography
            component="div"
            textAlign="center"
            sx={{ width: '32px' }}
            variant="body2"
            fontWeight="bold"
          >
            3
          </Typography>
          <Button size="small" variant="outlined">
            +
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  )
}
