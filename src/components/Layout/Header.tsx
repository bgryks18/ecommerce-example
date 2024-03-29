import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/PersonOutlined'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined'
import MoreIcon from '@mui/icons-material/MoreVert'
import LoginIcon from '@mui/icons-material/Login'
import { useId, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {
  Link,
  createSearchParams,
  useNavigate,
  createPath,
  useSearchParams,
} from 'react-router-dom'
import { PATH } from '@/types/paths'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getCurrency } from '@/utils/currency'

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.common.black,
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      boxShadow: '0.5px 0.5px 2px #ddd',
    },
  },
  toolBar: {
    color: theme.palette.common.black,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      width: 160,
      maxWidth: '100%',
      aspectRatio: '125/35',
    },
    [theme.breakpoints.down('md')]: {
      '& img': {
        width: 55,
        maxWidth: '100%',
        aspectRatio: '1/1',
      },
    },
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    position: 'relative',
    '& > div': {
      width: '100%',
      height: '100%',
      borderRadius: 50,
      paddingRight: 0,

      '& input': {
        padding: 4,
        marginRight: 4,
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '38px',
    },
  },
  searchButton: {
    height: '100%',
    borderRadius: '50px',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    border: '0',
    minWidth: '118px',
    textTransform: 'none',
    [theme.breakpoints.down('md')]: {
      height: '38px',
      minWidth: 'auto',
      maxWidth: '90px',
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  iconButton: {
    backgroundColor: theme.palette.background.default,
  },
  popover: {
    width: '300px',
  },
  menuItem: {
    padding: '6px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '30px',
    [theme.breakpoints.down('md')]: {
      padding: '3px 9px',
    },
  },
  quantity: {
    fontSize: '14px',
    fontWeight: '600',
  },
  price: {
    fontSize: '14px',
    fontWeight: '600',
    color: theme.palette.secondary.main,
  },
}))

const Header = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const logoUrl = isMobile ? '/favicon.png' : '/logo.png'

  return (
    <AppBar className={classes.appBar} position={'sticky'}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            spacing={2}
          >
            <Grid item xs={2} md={3}>
              <div className={classes.logo}>
                <Link to="/">
                  <img src={logoUrl} />
                </Link>
              </div>
            </Grid>
            <Grid item xs={8} md={6}>
              <SearchForm />
            </Grid>
            <Grid item xs={2} md={3}>
              <MenuLinks />
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header

const MenuLinks = () => {
  const classes = useStyles()
  const userMenuPopoverId = useId()
  const userBasketPopoverId = useId()
  const userMobileMenuId = useId()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { isLoggedIn, cartCount, cart, cartTotal } = useCurrentUser()

  const [anchorUserMenuPopoverEl, setAnchorUserMenuPopoverEl] =
    useState<HTMLButtonElement | null>(null)

  const [anchorUserBasketPopoverEl, setAnchorUserBasketPopoverEl] =
    useState<HTMLButtonElement | null>(null)

  const [anchorUserMobileMenuEl, setAnchorUserMobileMenuEl] =
    useState<HTMLButtonElement | null>(null)

  const handleUserMenuPopoverClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorUserMenuPopoverEl(event.currentTarget)
  }

  const handleUserMenuPopoverClose = () => {
    setAnchorUserMenuPopoverEl(null)
  }

  const handleUserBasketPopoverClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorUserBasketPopoverEl(event.currentTarget)
  }

  const handleUserBasketPopoverClose = () => {
    setAnchorUserBasketPopoverEl(null)
  }

  const handleUserMobileMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorUserMobileMenuEl(event.currentTarget)
  }

  const handleUserMobileMenuClose = () => {
    setAnchorUserMobileMenuEl(null)
  }

  const isUserMenuPopoverOpen = Boolean(anchorUserMenuPopoverEl)
  const isUserBasketPopoverOpen = Boolean(anchorUserBasketPopoverEl)
  const isUserMobileMenuOpen = Boolean(anchorUserMobileMenuEl)

  const cartItems = Array.isArray(cart) ? (
    cart.map((item) => (
      <Typography
        variant="body1"
        component="div"
        className={classes.menuItem}
        key={item.productId}
      >
        <span className={classes.quantity}>
          {item.quantity} {item.name}
        </span>
        <span className={classes.price}>
          {getCurrency(item.price * item.quantity)}
        </span>
      </Typography>
    ))
  ) : (
    <></>
  )

  const renderMenu = isLoggedIn ? (
    <>
      <IconButton
        size="large"
        className={classes.iconButton}
        onClick={handleUserMenuPopoverClick}
      >
        <PersonIcon />
      </IconButton>
      <Menu
        id={userMenuPopoverId}
        open={isUserMenuPopoverOpen}
        anchorEl={anchorUserMenuPopoverEl}
        onClose={handleUserMenuPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        <Link to={PATH.LOGOUT} className={classes.link}>
          <MenuItem className={classes.menuItem}>Logout</MenuItem>
        </Link>
      </Menu>

      <Badge badgeContent={cartCount} color="primary">
        <IconButton
          size="large"
          className={classes.iconButton}
          onClick={handleUserBasketPopoverClick}
        >
          <ShoppingBasketIcon />
        </IconButton>
      </Badge>
      <Menu
        id={userBasketPopoverId}
        open={isUserBasketPopoverOpen}
        anchorEl={anchorUserBasketPopoverEl}
        onClose={handleUserBasketPopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        {cartCount > 0 ? (
          <Box>
            {cartItems}
            <Divider />
            <Typography
              variant="body1"
              component="div"
              className={classes.menuItem}
            >
              <span className={classes.quantity}>Total</span>
              <span className={classes.price}>{getCurrency(cartTotal)}</span>
            </Typography>
            <MenuItem
              onClick={handleUserMenuPopoverClose}
              className={classes.menuItem}
            >
              <Typography variant="body2" fontWeight="600" component="span">
                Go to cart
              </Typography>
            </MenuItem>
          </Box>
        ) : (
          <Typography
            variant="body1"
            className={classes.menuItem}
            component="div"
          >
            No products in your cart
          </Typography>
        )}
      </Menu>
    </>
  ) : (
    <>
      <Link to={PATH.LOGIN}>
        <IconButton size="large" className={classes.iconButton}>
          <LoginIcon />
        </IconButton>
      </Link>
    </>
  )

  const renderMobileMenu = isLoggedIn ? (
    <>
      <Badge badgeContent={cartCount} color="primary">
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleUserMobileMenuClick}
        >
          <MoreIcon />
        </IconButton>
      </Badge>

      <Menu
        id={userMobileMenuId}
        open={isUserMobileMenuOpen}
        anchorEl={anchorUserMobileMenuEl}
        onClose={handleUserMobileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ paper: classes.popover }}
      >
        {cartCount > 0 && (
          <Box>
            {cartItems}
            <Divider />
            <Typography
              variant="body1"
              component="div"
              className={classes.menuItem}
            >
              <span className={classes.quantity}>Total</span>
              <span className={classes.price}>{getCurrency(cartTotal)}</span>
            </Typography>
            <MenuItem
              onClick={handleUserMobileMenuClose}
              className={classes.menuItem}
            >
              <Typography variant="body2" fontWeight="600" component="span">
                Go to cart
              </Typography>
            </MenuItem>
            <Divider />
          </Box>
        )}
        <Link to={PATH.LOGOUT} className={classes.link}>
          <MenuItem className={classes.menuItem}>Logout</MenuItem>
        </Link>
      </Menu>
    </>
  ) : (
    <>
      <Link to={PATH.LOGIN}>
        <IconButton size="large" className={classes.iconButton}>
          <LoginIcon />
        </IconButton>
      </Link>
    </>
  )

  return (
    <div className={classes.links}>
      {!isMobile && renderMenu}
      {isMobile && renderMobileMenu}
    </div>
  )
}

interface SearchFormProps {
  q: string
}
const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchFormProps>()
  const navigate = useNavigate()
  const [currentSearchParamms] = useSearchParams()

  const onSubmit: SubmitHandler<SearchFormProps> = async (data) => {
    const currentQuery = currentSearchParamms.get('q')
    if (
      (!currentQuery && !data.q.trim()) ||
      (currentQuery && currentQuery.trim() === data.q.trim())
    ) {
      return
    }
    const searchParams = createSearchParams(
      data as unknown as Record<string, string>
    )

    const createdPath = createPath({
      pathname: PATH.HOME,
      search: searchParams.toString(),
    })

    navigate(createdPath)
  }

  const classes = useStyles()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.searchBox}>
      <OutlinedInput
        size="medium"
        margin="none"
        placeholder="Searching for"
        startAdornment={<SearchIcon color={'action'} />}
        defaultValue={currentSearchParamms.get('q')}
        endAdornment={
          <Button
            variant="contained"
            className={classes.searchButton}
            type="submit"
          >
            Search
          </Button>
        }
        {...register('q')}
      />
    </form>
  )
}
