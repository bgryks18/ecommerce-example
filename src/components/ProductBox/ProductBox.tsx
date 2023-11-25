import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'
import Rating from '@mui/material/Rating'
import { CartItemEntity, ProductItemEntity } from '@/types/type'
import { getCurrency } from '@/utils/currency'
import { MouseEvent, useMemo, useRef, useState } from 'react'
import { addToCart, removeFromCart } from '@/api/card'
import { debounce } from 'lodash'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { Snackbar, useTheme } from '@mui/material'
const useStyles = makeStyles((theme) => ({
  cardMedia: {
    maxHeight: 240,
    backgroundSize: 'contain',
    WebkitBackgroundSize: 'contain',
    aspectRatio: '1/1',
    backgroundColor: '#efefef',
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

const ProductBox = ({
  id,
  image,
  name,
  originalPrice,
  price,
  rating,
  discount,
}: ProductItemEntity) => {
  const { cart, isLoggedIn } = useCurrentUser()
  const classes = useStyles()

  return (
    <Card sx={{ position: 'relative' }}>
      {discount && (
        <Typography className={classes.discountButton}>{discount}</Typography>
      )}
      <CardMedia
        className={classes.cardMedia}
        image={image}
        title="green iguana"
      />
      <CardContent className={classes.cardContent}>
        <Typography component="div" className={classes.cardInfo}>
          <Typography variant="body1" component="div" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="body2" component="div" className={classes.star}>
            <Rating
              name="star"
              defaultValue={rating}
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
              ({rating})
            </Typography>
          </Typography>

          <Typography variant="body2" component="div" className={classes.price}>
            <span className={classes.currentPrice}>{getCurrency(price)}</span>
            <span className={classes.oldPrice}>
              {getCurrency(originalPrice)}
            </span>
          </Typography>
        </Typography>

        <CardActions className={classes.cardActions}>
          {isLoggedIn && cart && <Counter cart={cart} productId={id} />}
        </CardActions>
      </CardContent>
    </Card>
  )
}

export default ProductBox

const Counter = ({
  cart,
  productId,
}: {
  cart: CartItemEntity[]
  productId: string
}) => {
  const theme = useTheme()

  const [errorBoxOpen, setErrorBoxOpen] = useState(false)

  const countRef = useRef<HTMLDivElement>(null)

  const initialCount = useMemo<number>(
    () =>
      Array.isArray(cart)
        ? cart.find((item) => item.productId === productId)?.quantity || 0
        : 0,
    []
  )

  const { mutateAsync: mutateAddToCart } = addToCart(productId)
  const { mutateAsync: mutateRemoveFromCart } = removeFromCart(productId)

  const increaseProduct = debounce(async () => {
    if (!countRef.current) return
    const prevQuantityValue = Number(countRef.current.textContent)
    const newQuantityValue = Number(countRef.current.textContent) + 1
    try {
      countRef.current.textContent = String(newQuantityValue)

      await mutateAddToCart()
    } catch (e: any) {
      console.log('error', e)
      setErrorBoxOpen(true)
      if (countRef.current) {
        countRef.current.textContent = String(prevQuantityValue)
      }
    }
  }, 120)

  const decreaseProduct = debounce(async () => {
    if (!countRef.current) return
    const prevQuantityValue = Number(countRef.current?.textContent)
    const newQuantityValue = Number(countRef.current.textContent) - 1

    try {
      countRef.current.textContent = String(newQuantityValue)

      await mutateRemoveFromCart()
    } catch (e: any) {
      console.log('error', e)
      setErrorBoxOpen(true)
      if (countRef.current) {
        countRef.current.textContent = String(prevQuantityValue)
      }
    }
  }, 120)

  const handleIncrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    increaseProduct()
  }

  const handleDecrease = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    decreaseProduct()
  }

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        onClick={handleDecrease}
        sx={{
          visibility:
            Number(countRef.current?.textContent || initialCount) >= 1
              ? 'visible'
              : 'hidden',
        }}
      >
        -
      </Button>

      <Typography
        component="div"
        textAlign="center"
        variant="body2"
        fontWeight="bold"
        ref={countRef}
      >
        {initialCount}
      </Typography>
      <Button
        size="small"
        variant="outlined"
        onClick={handleIncrease}
        onDoubleClick={(e) => {
          e.preventDefault()
        }}
      >
        +
      </Button>
      <Snackbar
        open={errorBoxOpen}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        autoHideDuration={5000}
        ContentProps={{ style: { background: theme.palette.error.main } }}
        onClose={() => {
          setErrorBoxOpen(false)
        }}
        message="An error occured"
      />
    </>
  )
}
