import { Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '../ProductBox/ProductBox'
import { ReactNode } from 'react'
import { getProducts } from '@/api/product'

const ProductList = ({
  title,
  gridSize = { md: 4 },
}: {
  gridSize?: {
    xl?: GridSize
    lg?: GridSize
    md?: GridSize
    sm?: GridSize
    xs?: GridSize
  }

  title?: string | ReactNode
}) => {
  const { data = [] } = getProducts()

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
        {title && title}
      </Typography>
      {data.map((item) => {
        return (
          <Grid item {...gridSize} width={'100%'} key={item.id}>
            <ProductBox {...item} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ProductList
