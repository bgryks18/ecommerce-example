import {
  AppBar,
  Badge,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  OutlinedInput,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import { useId, useState } from 'react'

const useStyles = makeStyles((theme) => ({
  appBar: {
    color: theme.palette.common.black,
    padding: 8,
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
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: '56px',
    position: 'relative',
    '& > div': {
      width: '100%',
      borderRadius: 50,
      height: '100%',
      paddingRight: '0',
      '& input': {
        padding: 4,
      },
    },
  },
  searchButton: {
    height: '100%',
    borderRadius: '50px !important',
    borderTopLeftRadius: '0 !important',
    borderBottomLeftRadius: '0 !important',
    border: '0',
    width: '170px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#eee !important',
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

  const [anchorUserMenuPopoverEl, setAnchorUserMenuPopoverEl] =
    useState<HTMLButtonElement | null>(null)

  const [anchorUserBasketPopoverEl, setAnchorUserBasketPopoverEl] =
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
  const isUserMenuPopoverOpen = Boolean(anchorUserMenuPopoverEl)
  const isUserBasketPopoverOpen = Boolean(anchorUserBasketPopoverEl)

  return (
    <AppBar className={classes.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid
            container
            justifyContent={'space-between'}
            alignItems={'center'}
            gap={3}
          >
            <Grid item md={2}>
              <div className={classes.logo}>
                <img src="/logo.png" />
              </div>
            </Grid>
            <Grid item md={7}>
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

            <Grid item md={2}>
              <div className={classes.links}>
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
                  <Typography variant="body1" className={classes.basketItem}>
                    2 items
                  </Typography>
                  <MenuItem onClick={handleUserMenuPopoverClose}>
                    Go to the basket
                  </MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
