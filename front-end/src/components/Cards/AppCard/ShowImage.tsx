import { DefaultImgIcon } from './DefaultImageIcon'

import { classNames } from '@/utils/classNames'
import { isImgUrl } from '@/utils/isImgUrl'

import Image from 'next/image'

export function ShowImage({ srcImg }) {
  const style = 'object-cover h-52 w-52 rounded-md bg-slate-100 border'
  const res = isImgUrl(srcImg)

  if (!srcImg || res == null) {
    return (
      <div className="flex size-52 items-center justify-center rounded-lg border bg-slate-100">
        <DefaultImgIcon className="size-32 text-slate-300 " />
      </div>
    )
  } else if (isImgUrl(srcImg)) {
    return (
      <Image
        loading="lazy"
        width={208}
        height={208}
        src={srcImg}
        alt=" application image"
        className={style}
      />
    )
  } else {
    return (
      <iframe
        title={'Lucidchart Diagram'}
        sandbox="allow-scripts"
        loading="lazy"
        width="208px"
        height="208px"
        className={classNames(style, 'pointer-events-none')}
        src={srcImg}
      ></iframe>
    )
  }
}
