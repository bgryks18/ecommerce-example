import Page from '@/components/Layout/Page'
import { categories } from '@/utils/ui'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'

const Category = () => {
  const { categoryId } = useParams()

  const availableCategories = categories()
  const currentCategory = availableCategories.find(
    (item) => item.id === categoryId
  )

  return (
    <Page>
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
        {!currentCategory
          ? 'Category not found'
          : `${currentCategory.label} page`}
      </Typography>
    </Page>
  )
}

export default Category
