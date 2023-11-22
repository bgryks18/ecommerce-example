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
    top: 80,
    left: 0,
    padding: 20,
    paddingLeft: 0,
    paddingRight: 0,
    height: 'calc(100vh + (-120px))',
    [theme.breakpoints.down('md')]: {
      top: 0,
    },
    overflowY: 'auto',
  },
  paper: {
    boxShadow: 'none',
    '& .MuiMenuItem-root': {
      color: theme.palette.secondary.main,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      '&:last-child': {
        borderBottomRightRadius: 'inherit',
        borderBottomLeftRadius: 'inherit',
      },
    },
  },
  title: {
    fontWeight: 'bold',
    padding: '16px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    marginBottom: '4px',
  },
}))

const Sidebar = () => {
  const classes = useStyles()
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="body1" className={classes.title} component={'div'}>
          Top Categories
          <Divider />
        </Typography>
        <MenuItem>
          <EggIcon />
          <Typography variant="body2" fontWeight="bold">
            Dairy Eggs
          </Typography>
        </MenuItem>
        <MenuItem>
          <FreeBreakfastIcon />
          <Typography variant="body2" fontWeight="bold">
            Breakfast
          </Typography>
        </MenuItem>
        <MenuItem>
          <IcecreamIcon />
          <Typography variant="body2" fontWeight="bold">
            Frozen
          </Typography>
        </MenuItem>
        <MenuItem>
          <RestaurantIcon />
          <Typography variant="body2" fontWeight="bold">
            Vegetables
          </Typography>
        </MenuItem>
        <MenuItem>
          <RestaurantMenuIcon />
          <Typography variant="body2" fontWeight="bold">
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
