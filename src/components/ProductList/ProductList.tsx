import { Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '@/components/ProductBox/ProductBox'
import { ReactNode, useEffect } from 'react'
import { useGetProducts } from '@/api/product'
import { get, isEmpty } from 'lodash'
import ProductBoxSkeleton from '@/components/Layout/Skeleton/ProductBoxSkeleton'

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
  const {
    data = [],
    isFetched,
    isLoading,
    refetch,
    isRefetching,
    isFetching,
  } = useGetProducts(searchParams)
  const isSearchMode = !isEmpty(searchParams)
  const searchKey = get(searchParams, 'name') as string
  const isNoResult =
    data.length === 0 && !isLoading && isFetched && !isRefetching && !isFetching
  const showSkeleton =
    data.length === 0 && (isLoading || isRefetching || isFetching)
  const showdData = !isLoading && !isRefetching && !isFetching
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

      {showSkeleton &&
        Array(3)
          .fill(null)
          .map((item, key) => (
            <Grid item {...gridSize} width={'100%'} key={key}>
              <ProductBoxSkeleton />
            </Grid>
          ))}

      {showdData &&
        data.map((item) => {
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
