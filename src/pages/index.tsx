import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/future/image'

import 'keen-slider/keen-slider.min.css'

import tshirt1 from '../common/assets/tshirt1.png'

export default function Home() {
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
      {[...Array(4)].map((item, idx) => (
        <a
          key={idx}
          className="keen-slider__slide group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#1ea483] to-[#7465d4]"
        >
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
      ))}
    </main>
  )
}
