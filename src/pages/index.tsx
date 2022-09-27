import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/future/image'
import Stripe from 'stripe'

import 'keen-slider/keen-slider.min.css'

import { stripe } from '../common/lib/stripe'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number | null
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })

  return (
    <main
      ref={sliderRef}
      className="keen-slider ml-auto flex min-h-[656px] w-full max-w-[calc(100vw-((100vw-1180px)/2))]"
    >
      {products.map((item) => (
        <a
          key={item.id}
          className="keen-slider__slide group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4]"
        >
          <Image
            src={item.imageUrl}
            alt=""
            width={520}
            height={480}
            className="object-cover"
          />

          <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/[0.6] p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-[0%] group-hover:opacity-100">
            <strong className="text-lg">{item.name}</strong>
            <span className="text-xl font-bold text-green300">
              R$ {item.price}
            </span>
          </footer>
        </a>
      ))}
    </main>
  )
}

export async function getServerSideProps() {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount ? price.unit_amount / 100 : null,
    }
  })

  return {
    props: {
      products,
    },
  }
}
