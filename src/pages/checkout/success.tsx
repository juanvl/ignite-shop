import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../../common/lib/stripe'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <main className="height-[656px] my-0 mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl text-gray100">Compra efetuada</h1>

      <div className="p-8"></div>

      <div className="flex h-[145px] w-full max-w-[130px] items-center justify-center rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1">
        <Image
          src={product.imageUrl}
          alt=""
          width={520}
          height={480}
          className="object-cover"
        />
      </div>

      <div className="p-4"></div>

      <p className="max-w-[560px] text-center text-xl leading-[1.4] text-gray300">
        Uhuul <strong>{customerName}</strong>, sua{' '}
        <strong>{product.name}</strong> já está a caminho da sua casa.
      </p>

      <div className="p-10"></div>

      <Link
        href="/"
        className="block text-lg font-bold text-green500 hover:text-green300"
      >
        Voltar ao catálogo
      </Link>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { session_id } = query

  if (!session_id) {
    return {
      props: {
        error: 'Invalid session_id',
      },
    }
  }

  const sessionId = session_id as string

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0].price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
