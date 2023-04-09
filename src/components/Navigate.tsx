import { ReactNode } from 'react'
import { UrlObject } from 'url'
import { pagesPath, PagesPath } from '@src/lib/pathpida/$path'
import Link from 'next/link'

type Props = {
  href: UrlObject | ((path: PagesPath) => UrlObject)
  children: ReactNode
}

export const Navigate = ({ href, children }: Props) => {
  return (
    <Link href={typeof href === 'function' ? href(pagesPath) : href} passHref>
      {children}
    </Link>
  )
}
