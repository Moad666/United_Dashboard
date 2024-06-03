import ImagePopup from '@/components/Modal/ImageModal'
import { isImgUrl } from '@/utils/isImgUrl'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'

import type { MouseEventHandler, PropsWithChildren } from 'react'

export default function Carousel({ imgs }) {
  if (!(imgs instanceof Array)) {
    imgs = []
  }

  const [currentIdx, setCurrentIdx] = useState(0)

  const handleNextBtn = () => {
    setCurrentIdx((currentIdx + 1) % imgs.length)
  }
  const handlePrevBtn = () => {
    setCurrentIdx((currentIdx - 1 + imgs.length) % imgs.length)
  }

  return (
    <div className="space-y-5">
      <div className="flex h-[450px] w-full justify-center">
        <div className="relative  flex w-full justify-center">
          <div className="relative h-[450px] min-w-[700px]">
            {imgs.map((src, idx) => {
              return (
                <MainImage key={src} isActive={currentIdx === idx} src={src} />
              )
            })}

            <Button className="end-0" handleClick={handlePrevBtn}>
              <ChevronRightIcon
                className="size-5 text-black dark:text-gray-800"
                strokeWidth={3}
              />
            </Button>
            <Button className="start-0" handleClick={handleNextBtn}>
              <ChevronLeftIcon
                className="size-5 text-black dark:text-gray-800"
                strokeWidth={3}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex h-20 flex-row justify-center  gap-4 p-2">
        {imgs.map((src, idx) => {
          return (
            <SecondaryImage
              src={src}
              key={src}
              active={idx === currentIdx}
              handleClick={() => setCurrentIdx(idx)}
            />
          )
        })}
      </div>
    </div>
  )
}

function MainImage({ src, alt = 'main Image', isActive }) {
  const style = `absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-xl border p-2 ${
    !isActive && 'hidden'
  }`
  return (
    <>
      {isActive && <ImagePopup imgSrc={src} />}
      {isImgUrl(src) ? (
        <Image
          priority={false}
          className={style}
          src={src}
          width={700}
          height={450}
          alt={alt}
          sizes="100vw"
          style={{ width: 'auto', height: '100%', minWidth: '700px' }}
        />
      ) : (
        <iframe
          sandbox="allow-scripts"
          width="700px"
          height="450px"
          allowFullScreen
          className={style}
          src={src}
        ></iframe>
      )}
    </>
  )
}
function SecondaryImage({
  src,
  alt = 'secondary image',
  active = false,
  handleClick,
}) {
  return (
    <button className={' size-20 rounded-lg'} onClick={handleClick}>
      {isImgUrl(src) ? (
        <Image
          priority={false}
          src={src}
          height={80}
          width={80}
          alt={alt}
          className={` z-0 size-20 rounded-lg border bg-cover bg-origin-padding ${
            active &&
            'ring-2 ring-blue-500  transition-all duration-300 ease-in'
          }`}
        />
      ) : (
        <iframe
          sandbox="allow-scripts"
          width="78px"
          height="78px"
          className={`pointer-events-none z-0 size-20 rounded-lg bg-cover bg-origin-padding ring-2  transition-all duration-300 ease-in ${
            active ? ' ring-blue-500 ' : 'ring-gray-200'
          }`}
          src={src}
        ></iframe>
      )}
    </button>
  )
}

function Button({
  children,
  className,
  handleClick,
}: PropsWithChildren<{
  handleClick: MouseEventHandler<HTMLButtonElement>
  className: string
}>) {
  return (
    <button
      type="button"
      className={`group absolute top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none ${className}`}
      onClick={handleClick}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-gray-300 bg-white transition-all duration-300 ease-in group-hover:bg-slate-100">
        {children}
      </span>
    </button>
  )
}
