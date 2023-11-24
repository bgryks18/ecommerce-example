import Page from '@/components/Layout/Page'
import ProducList from '@/components/ProductList/ProductList'
import { useSearchParams } from 'react-router-dom'

const Home = () => {
  const [currentSearchParamms] = useSearchParams()
  const name = currentSearchParamms.get('q')
  return (
    <Page>
      <ProducList title="Search Results" searchParams={{ name: name }} />
    </Page>
  )
}

export default Home
