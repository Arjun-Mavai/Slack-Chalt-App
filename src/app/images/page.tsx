// "use client"

// import { useState, useEffect, useCallback } from "react"
// import Image from "next/image"
// import { motion, AnimatePresence } from "framer-motion"
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"

// const mockImages = [
//   {
//     id: 1,
//     url: "https://picsum.photos/200/300",
//   },
//   {
//     id: 2,
//     url: "https://utfs.io/f/0Sb6USnWZbDH8M2Zfr7TuTZgCe8XvYlVxiD5jaNHyP60LdoI",
//   },
//   {
//     id: 3,
//     url: "https://utfs.io/f/0Sb6USnWZbDH5t0l3hXlP8b9rnxfTQOAd4SuZyHB13gjURve",
//   },
//   {
//     id: 4,
//     url: "https://utfs.io/f/0Sb6USnWZbDHThSVHNA5O1xF7CSR8oep0wmAycUQLhtqNvu9",
//   },
//   {
//     id: 5,
//     url: "https://utfs.io/f/0Sb6USnWZbDH4P8V1qJ5SrlXE4Vkd967ZDyGj0KbeLJv1pCH",
//   },
// ]

// export default function Component() {
//   const [api, setApi] = useState<any>()
//   const [current, setCurrent] = useState(0)

//   const scrollTo = useCallback((index: number) => {
//     api?.scrollTo(index)
//   }, [api])

//   useEffect(() => {
//     if (!api) return

//     const interval = setInterval(() => {
//       api.scrollNext()
//     }, 3000)

//     return () => clearInterval(interval)
//   }, [api])

//   useEffect(() => {
//     if (!api) return

//     const onSelect = () => {
//       setCurrent(api.selectedScrollSnap())
//     }

//     api.on("select", onSelect)
//     return () => {
//       api.off("select", onSelect)
//     }
//   }, [api])

//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 py-8">
//       <Carousel setApi={setApi} className="w-full">
//         <CarouselContent>
//           {mockImages.map((image, index) => (
//             <CarouselItem key={image.id} className="sm:basis-1/2 md:basis-1/3">
//               <AnimatePresence>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card>
//                     <CardContent className="flex aspect-square items-center justify-center p-2">
//                       <Image
//                         src={image.url}
//                         alt={`Gallery image ${image.id}`}
//                         width={300}
//                         height={300}
//                         className="rounded-md object-cover w-full h-full"
//                       />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </AnimatePresence>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       <div className="flex justify-center mt-4 space-x-2">
//         {mockImages.map((_, index) => (
//           <Button
//             key={index}
//             variant="ghost"
//             size="icon"
//             className={`w-3 h-3 rounded-full p-0 ${
//               current === index ? "bg-primary" : "bg-secondary"
//             }`}
//             onClick={() => scrollTo(index)}
//           >
//             <span className="sr-only">Go to slide {index + 1}</span>
//           </Button>
//         ))}
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
// import { Card, CardContent } from "@/components/ui/card"
// // import { useMediaQuery } from "@/hooks/use-media-query"
// import Image from "next/image"
// import { cn } from "@/lib/utils"

// const mockImages = [
//   { id: 1, url: "https://picsum.photos/200/300" },
//   { id: 2, url: "https://utfs.io/f/0Sb6USnWZbDH8M2Zfr7TuTZgCe8XvYlVxiD5jaNHyP60LdoI" },
//   { id: 3, url: "https://utfs.io/f/0Sb6USnWZbDH5t0l3hXlP8b9rnxfTQOAd4SuZyHB13gjURve" },
//   { id: 4, url: "https://utfs.io/f/0Sb6USnWZbDHThSVHNA5O1xF7CSR8oep0wmAycUQLhtqNvu9" },
//   { id: 5, url: "https://utfs.io/f/0Sb6USnWZbDH4P8V1qJ5SrlXE4Vkd967ZDyGj0KbeLJv1pCH" },
// ]

// export default function Component() {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const itemsToShow = 3

//   const nextSlide = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % mockImages.length)
//   }, [])

//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000)
//     return () => clearInterval(interval)
//   }, [nextSlide])

//   const handleDotClick = (index: number) => {
//     setCurrentIndex(index)
//   }
// console.log(currentIndex , "currentIndex")
//   return (
//     <div className="w-full max-w-4xl mx-auto px-4 py-8">
//       <Carousel className="w-full">
//         <CarouselContent>
//           <AnimatePresence initial={false}>
//             {mockImages.map((image, index) => (
//               <CarouselItem
//                 key={image.id}
//                 className={cn(
//                   "basis-full md:basis-1/3",
//                   index < itemsToShow ? "block" : "hidden md:block"
//                 )}
//               >
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <Card className={`bg-transparent border-none ${currentIndex === index ? 'border-2 border-red-500' : ''}`}>
//                     <CardContent className="flex aspect-square items-center justify-center p-2">
//                       <Image
//                         src={image.url}
//                         alt={`Gallery image ${image.id}`}
//                         width={300}
//                         height={300}
//                         className="rounded-full object-cover w-full h-full"
//                       />
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               </CarouselItem>
//             ))}
//           </AnimatePresence>
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//       <div className="flex justify-center mt-4 space-x-2">
//         {mockImages.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-primary" : "bg-gray-300"
//             }`}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }





"use client"

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
 
const mockImages = [
  {
    id: 1,
    url: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    url: "https://utfs.io/f/0Sb6USnWZbDH8M2Zfr7TuTZgCe8XvYlVxiD5jaNHyP60LdoI",
  }, 
  {
    id: 3,
    url: "https://utfs.io/f/0Sb6USnWZbDH5t0l3hXlP8b9rnxfTQOAd4SuZyHB13gjURve",
  }, 
  {
    id: 4,
    url: "https://utfs.io/f/0Sb6USnWZbDHThSVHNA5O1xF7CSR8oep0wmAycUQLhtqNvu9",
  }, 
  {
    id: 5,
    url: "https://utfs.io/f/0Sb6USnWZbDH4P8V1qJ5SrlXE4Vkd967ZDyGj0KbeLJv1pCH",
  }, 
]

const options: EmblaOptionsType = {
  loop: true,
  slidesToScroll: 1,
  startIndex: 0
}

const autoplayOptions = {
  delay: 2000,
  rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement
}

export default function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)])
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, setScrollSnaps, onSelect])

  return (
    <div className="embla relative max-w-6xl mx-auto px-4 py-8">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {mockImages.map((image) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4" key={image.id}>
              <img
                className="embla__slide__img block h-80 w-full object-cover rounded-lg"
                src={image.url}
                alt={`Slide ${image.id}`}
              />
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      <div className="embla__dots flex justify-center mt-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

// EmblaCarouselArrowsDotsButtons.tsx
 

 const DotButton: React.FC<{
  selected: boolean
  onClick: () => void
}> = (props) => {
  const { selected, onClick } = props

  return (
    <button
      className={`embla__dot w-3 h-3 rounded-full mx-1 ${
        selected ? 'bg-blue-500' : 'bg-gray-300'
      }`}
      type="button"
      onClick={onClick}
    />
  )
}

  const PrevButton: React.FC<{
  enabled: boolean
  onClick: () => void
}> = (props) => {
  const { enabled, onClick } = props

  return (
    <button
      className="embla__button embla__button--prev absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  )
}

  const NextButton: React.FC<{
  enabled: boolean
  onClick: () => void
}> = (props) => {
  const { enabled, onClick } = props

  return (
    <button
      className="embla__button embla__button--next absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 rounded-full p-2"
      onClick={onClick}
      disabled={!enabled}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )
}
