import { Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '../ProductBox/ProductBox'
import { ReactNode, useEffect } from 'react'
import { getProducts } from '@/api/product'
import { get, isEmpty } from 'lodash'

const ProductList = ({
  title,
  gridSize = { md: 4 },
  searchParams,
}: {
  gridSize?: {
    xl?: GridSize
    lg?: GridSize
    md?: GridSize
    sm?: GridSize
    xs?: GridSize
  }

  title?: string | ReactNode
  searchParams?: Record<string, unknown>
}) => {
  const { data = [], isFetched, isLoading, refetch } = getProducts(searchParams)
  const isSearchMode = !isEmpty(searchParams)
  const searchKey = get(searchParams, 'name') as unknown as string
  const isNoResult = data.length === 0 && !isLoading && isFetched

  useEffect(() => {
    refetch(searchParams)
  }, [searchParams])
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

      {isNoResult && (
        <Typography
          component="div"
          variant="h5"
          sx={{
            fontWeight: '500',
            paddingInline: '20px',
            width: '100%',
            paddingBottom: '4px',
          }}
        >
          {isSearchMode ? (
            <Typography component="span">
              No data found for&nbsp;
              <Typography component="span" fontWeight="700">
                {searchKey}
              </Typography>
            </Typography>
          ) : (
            <Typography component="span">No data found</Typography>
          )}
        </Typography>
      )}
    </Grid>
  )
}

export default ProductList
