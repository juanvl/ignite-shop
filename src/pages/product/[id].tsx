import { useRouter } from 'next/router'

export default function ProductDetail() {
  const { query } = useRouter()

  return (
    <div className="text-3xl font-bold underline">
      Product id: {JSON.stringify(query)}
    </div>
  )
}
