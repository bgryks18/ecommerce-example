import { Divider, MenuItem, Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import EggIcon from '@mui/icons-material/EggOutlined'
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfastOutlined'
import IcecreamIcon from '@mui/icons-material/IcecreamOutlined'
import RestaurantIcon from '@mui/icons-material/RestaurantOutlined'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenuOutlined'
import EggAltIcon from '@mui/icons-material/EggAltOutlined'

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'sticky',
    top: 100,
    left: 0,
    padding: 0,
    maxHeight: 'calc(100vh + (-120px))',
    overflowY: 'auto',
    [theme.breakpoints.down('md')]: {
      top: 0,
      maxHeight: 'unset',
    },
  },
  paper: {
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    flexWrap: 'wrap',
    '& .MuiMenuItem-root': {
      color: theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      columnGap: 8,
    },
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 0,
      '& .MuiMenuItem-root': {
        columnGap: 2,
        '& span': {
          fontSize: '0.8rem',
        },
      },
    },
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      padding: '6px 16px',
    },
  },
}))

const Sidebar = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="body1" className={classes.title} component="div">
          Top Categories
          <Divider />
        </Typography>
        <MenuItem>
          <EggIcon />
          <Typography variant="body2" fontWeight="bold" component="span">
            Dairy Eggs
          </Typography>
        </MenuItem>
        <MenuItem>
          <FreeBreakfastIcon />
          <Typography variant="body2" fontWeight="bold" component="span">
            Breakfast
          </Typography>
        </MenuItem>
        <MenuItem>
          <IcecreamIcon />
          <Typography variant="body2" fontWeight="bold" component="span">
            Frozen
          </Typography>
        </MenuItem>
        <MenuItem>
          <RestaurantIcon />
          <Typography variant="body2" fontWeight="bold" component="span">
            Vegetables
          </Typography>
        </MenuItem>
        <MenuItem>
          <RestaurantMenuIcon />
          <Typography variant="body2" fontWeight="bold" component="span">
            Fruits & Vegetables
          </Typography>
        </MenuItem>
        <MenuItem>
          <EggAltIcon />
          <Typography variant="body2" fontWeight="bold">
            Dairy & Eggs
          </Typography>
        </MenuItem>
      </Paper>
    </div>
  )
}

export default Sidebar
