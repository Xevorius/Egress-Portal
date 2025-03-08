"use client"

import { useEffect, useRef } from "react"
import { useInView } from "motion/react"
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

import { TextRotate, TextRotateRef } from "@/components/ui/text-rotate"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1727341554370-80e0fe9ad082?q=80&w=2276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    author: "Branislav Rodman",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-brushing-her-teeth-r1SjnJL5tf0",
    title: "A Black and White Photo of a Woman Brushing Her Teeth",
  },
  {
    url: "https://images.unsplash.com/photo-1640680608781-2e4199dd1579?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
    title: "Neon Palm",
    author: "Tim Rietdijk, Founder",
  },
  {
    url: "https://images.unsplash.com/photo-1726083085160-feeb4e1e5b00?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
    author: "ANDRII SOLOK",
    title: "A blurry photo of a crowd of people",
  },
]

function Item({
  index,
  image,
  link,
  onInView,
}: {
  index: number
  image: string
  link: string
  onInView: (inView: boolean) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: "-45% 0px -45% 0px",
  })

  useEffect(() => {
    onInView(isInView)
  }, [isInView, onInView])

  return (
    <section
      ref={ref}
      key={index}
      className="h-full w-1/2 flex justify-center items-center snap-center"
    >
      <div className="w-16 h-16 sm:w-36 sm:h-36 md:w-40 md:h-40">
        <a href={link} target="_blank" rel="noreferrer">
          <img
            src={image}
            alt={`Example ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </a>
      </div>
    </section>
  )
}

function Preview() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const slicedImages = exampleImages.slice(1)

  const handleInView = (index: number, inView: boolean) => {
    if (inView && textRotateRef.current) {
      textRotateRef.current.jumpTo(index)
    }
  }

  return (
    <div className="w-full h-screen flex">
      <div className="w-full h-full relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-end bg-grey light:text-muted text-foreground">
          <div className="w-2/3">
            <TextRotate
              ref={textRotateRef}
              texts={slicedImages.map((image) => image.author)}
              mainClassName="text-sm sm:text-3xl md:text-4xl w-full justify-center flex pt-2"
              splitLevelClassName="overflow-hidden pb-2"
              staggerFrom={"first"}
              animatePresenceMode="wait"
              loop={false}
              auto={false}
              staggerDuration={0.005}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ type: "spring", duration: 0.6, bounce: 0 }}
            />
          </div>
        </div>
        <div className="absolute inset-0 overflow-auto snap-y snap-mandatory">
          {slicedImages.map((image, index) => (
            <Item
              key={index}
              index={index}
              image={image.url}
              link={image.link}
              onInView={(inView) => handleInView(index, inView)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Preview 
