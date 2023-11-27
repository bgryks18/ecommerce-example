import { Button, Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '@/components/ProductBox/ProductBox'
import { ReactNode, useEffect, useState } from 'react'
import { useGetProducts } from '@/api/product'
import { get, isEmpty } from 'lodash'
import ProductBoxSkeleton from '@/components/Layout/Skeleton/ProductBoxSkeleton'
import { useSearchParams } from 'react-router-dom'

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
  const limit = 3
  const [currentSearchParamms] = useSearchParams()
  const searchParams: Record<string, unknown> | undefined =
    currentSearchParamms.get('q')
      ? {
          name: currentSearchParamms.get('q'),
        }
      : undefined

  const {
    data = [],
    isFetched,
    isLoading,
    refetch,
    isRefetching,
    isFetching,
    error,
    isFetchedAfterMount,
  } = useGetProducts(searchParams)

  const [showCount, setShowCount] = useState<number>(limit)
  const isSearchMode = !isEmpty(searchParams)
  const searchKey = get(searchParams, 'name') as string
  const isNoResult =
    data.length === 0 && !isLoading && isFetched && !isRefetching && !isFetching
  const showSkeleton =
    data.length === 0 && (isLoading || isRefetching || isFetching)
  const showData = !isLoading && !isRefetching && !isFetching && !isNoResult

  const list = showData
    ? data.slice(data.length - showCount <= 0 ? 0 : data.length - showCount)
    : []

  useEffect(() => {
    if (searchParams && isFetchedAfterMount) {
      refetch(searchParams)
    }
  }, [currentSearchParamms])

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
      {isSearchMode && showData && (
        <Typography
          component="h2"
          variant="h5"
          sx={{
            fontWeight: '600',
            paddingInline: '20px',
            width: '100%',
            paddingBottom: '4px',
          }}
        >
          {data.length} {data.length === 1 ? `result` : `results`}
        </Typography>
      )}
      {showSkeleton &&
        Array(3)
          .fill(null)
          .map((item, key) => (
            <Grid item {...gridSize} width={'100%'} key={key}>
              <ProductBoxSkeleton />
            </Grid>
          ))}

      {showData &&
        list.map((item, index) => {
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
          {error ? (
            <Typography component="span">
              An error occured on the server
            </Typography>
          ) : isSearchMode ? (
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
      {showData && !isSearchMode && (
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItem: 'center',
              marginTop: '40px',
            }}
          >
            <Button
              variant="contained"
              sx={{ textTransform: 'none' }}
              disabled={!showData || showCount === data.length}
              onClick={() => {
                if (showCount < data.length) {
                  setShowCount((prev) =>
                    prev + limit > data.length ? data.length : prev + limit
                  )
                }
              }}
            >
              Load more...
            </Button>
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default ProductList
