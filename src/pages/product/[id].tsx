import { useRouter } from 'next/router'

export default function ProductDetail() {
  const { query } = useRouter()

  return <div>Product id: {JSON.stringify(query)}</div>
}
