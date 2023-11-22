import { Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '../ProductBox/ProductBox'

const List = ({
  gridSize = { md: 4 },
}: {
  gridSize?: {
    xl?: GridSize
    lg?: GridSize
    md?: GridSize
    sm?: GridSize
    xs?: GridSize
  }
}) => {
  return (
    <Grid
      container
      columnSpacing="20px"
      rowGap="20px"
      sx={{ position: 'relative' }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          fontWeight: '700',
          paddingInline: '20px',
          width: '100%',
          paddingBottom: '4px',
        }}
      >
        Pears, apples, quinces
      </Typography>
      <Grid item {...gridSize} width={'100%'}>
        <ProductBox />
      </Grid>
      <Grid item {...gridSize} width={'100%'}>
        <ProductBox />
      </Grid>
      <Grid item {...gridSize} width={'100%'}>
        <ProductBox />
      </Grid>
    </Grid>
  )
}

export default List
