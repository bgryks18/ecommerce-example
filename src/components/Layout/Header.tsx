import {
  AppBar,
  AppBarOwnProps,
  Badge,
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
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import MoreIcon from '@mui/icons-material/MoreVert'
import { useId, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.common.black,
    height: '80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
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
        width: 60,
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
      paddingRight: '0',
      '& input': {
        padding: 4,
      },
    },
    [theme.breakpoints.down('md')]: {
      height: '38px',
    },
  },
  searchButton: {
    height: '100%',
    borderRadius: '50px !important',
    borderTopLeftRadius: '0 !important',
    borderBottomLeftRadius: '0 !important',
    border: '0',
    width: '170px',
    [theme.breakpoints.down('md')]: {
      height: '38px',
      width: 'auto',
    },
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },
  iconButton: {
    backgroundColor: theme.palette.background.default + '!important',
  },
  popover: {
    width: '300px',
  },
  basketItem: {
    padding: '6px 16px',
  },
}))

const Header = () => {
  const classes = useStyles()
  const userMenuPopoverId = useId()
  const userBasketPopoverId = useId()
  const userMobileMenuId = useId()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
  const logoUrl = isMobile ? '/favicon.png' : '/logo.png'
  const appBarPosition = isMobile ? 'relative' : 'sticky'
  return (
    <AppBar className={classes.appBar} position={appBarPosition}>
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
                <img src={logoUrl} />
              </div>
            </Grid>
            <Grid item xs={8} md={6}>
              <div className={classes.searchBox}>
                <OutlinedInput
                  size="medium"
                  margin="none"
                  placeholder="Searching for"
                  startAdornment={<SearchIcon color={'action'} />}
                  endAdornment={
                    <Button
                      variant="contained"
                      className={classes.searchButton}
                    >
                      Search
                    </Button>
                  }
                />
              </div>
            </Grid>

            <Grid item xs={2} md={3}>
              <div className={classes.links}>
                {!isMobile ? (
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
                      <MenuItem onClick={handleUserMenuPopoverClose}>
                        Logout
                      </MenuItem>
                    </Menu>
                    <Badge badgeContent={4} color="primary">
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
                      <Typography
                        variant="body1"
                        className={classes.basketItem}
                      >
                        2 items
                      </Typography>
                      <MenuItem onClick={handleUserMenuPopoverClose}>
                        Go to the basket
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <>
                    <IconButton
                      size="small"
                      onClick={handleUserMobileMenuClick}
                    >
                      <MoreIcon />
                    </IconButton>
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
                      <Typography
                        variant="body1"
                        className={classes.basketItem}
                      >
                        2 items
                      </Typography>
                      <MenuItem onClick={handleUserMobileMenuClose}>
                        Go to the basket
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={handleUserMobileMenuClose}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
