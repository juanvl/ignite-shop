import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../common/lib/stripe'
import { toBRLCurrency } from '../../common/utils/format'
import { Product } from '../../modules/Product/types'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)

  const { isFallback } = useRouter()

  if (isFallback) {
    return <>Loading...</>
  }

  async function handleClickBuy() {
    try {
      setIsCreatingCheckoutSession(true)

      const res = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = res.data

      window.location.href = checkoutUrl
    } catch (error) {
      // TODO: Connect with observability tool (e.g. Datadog, Sentry)
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar para o checkout :(')
    }
  }

  return (
    <main className="my-0 mx-auto grid max-w-[1180px] grid-cols-2 items-stretch gap-16">
      <div className="flex h-[656px] w-full max-w-[576px] items-center justify-center rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1 ">
        <Image
          src={product.imageUrl}
          alt=""
          width={520}
          height={480}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="text-2xl text-gray300">{product.name}</h1>
        <strong className="mt-4 block text-2xl text-green300">
          {product.formattedPrice}
        </strong>

        <p className="mt-10 text-md leading-[1.6] text-gray300">
          {product.description}
        </p>

        <button
          onClick={handleClickBuy}
          disabled={isCreatingCheckoutSession}
          className="mt-auto cursor-pointer rounded-lg border-0 bg-green500 p-5 text-md font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 enabled:hover:bg-green300"
        >
          Comprar agora
        </button>
      </div>
    </main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id

  if (!productId) {
    return {
      props: {
        product: null,
        error: true,
      },
      revalidate: 60 * 60 * 1,
    }
  }

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const stripePrice = product.default_price as Stripe.Price
  const price = stripePrice.unit_amount ? stripePrice.unit_amount / 100 : null

  const serializedProduct: Product = {
    id: product.id,
    name: product.name,
    description: product.description,
    imageUrl: product.images[0],
    price,
    formattedPrice: price ? toBRLCurrency(price) : '',
    defaultPriceId: stripePrice.id,
  }

  return {
    props: { product: serializedProduct },
    revalidate: 60 * 60 * 1,
  }
}
