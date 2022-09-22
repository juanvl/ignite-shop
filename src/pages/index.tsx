import Image from 'next/future/image'

import tshirt1 from '../common/assets/tshirt1.png'
import tshirt2 from '../common/assets/tshirt2.png'

export default function Home() {
  return (
    <main className="ml-auto flex min-h-[656px] w-full max-w-[calc(100vw-((100vw-1180px)/2))] gap-12">
      <a className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1 ">
        <Image
          src={tshirt1}
          alt=""
          width={520}
          height={480}
          className="object-cover"
        />

        <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/[0.6] p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-[0%] group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,98</span>
        </footer>
      </a>

      <a className="group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4] p-1 ">
        <Image
          src={tshirt2}
          alt=""
          width={520}
          height={480}
          className="object-cover"
        />

        <footer className="absolute bottom-1 left-1 right-1 flex translate-y-[110%] items-center justify-between rounded-md bg-black/[0.6] p-8 opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-[0%] group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,98</span>
        </footer>
      </a>
    </main>
  )
}
