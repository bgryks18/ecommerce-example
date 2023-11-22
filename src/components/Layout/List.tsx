import React, { ReactNode } from 'react'
import { Box, Grid, GridSize, Typography } from '@mui/material'
import ProductBox from '../ProductBox/ProductBox'

const List = ({
  children,
  gridSize = { md: 4 },
}: {
  children: ReactNode
  gridSize?: {
    xl?: GridSize
    lg?: GridSize
    md?: GridSize
    sm?: GridSize
    xs?: GridSize
  }
}) => {
  return (
    <Grid container columnSpacing="20px" sx={{ position: 'relative' }}>
      <Typography
        component="h2"
        variant="h4"
        sx={{
          fontWeight: '700',
          paddingInline: '20px',
          width: '100%',
          paddingBottom: '24px',
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
