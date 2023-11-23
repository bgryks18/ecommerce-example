import Page from '@/components/Layout/Page'
import ProducList from '@/components/ProductList/ProductList'
import { useCurrentUser } from '@/hooks/useCurrentUser'

const Home = () => {
  const { curentUser } = useCurrentUser()
  return (
    <Page>
      <ProducList title="Pears, apples, quinces" />
    </Page>
  )
}

export default Home
