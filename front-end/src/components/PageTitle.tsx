type Props = { title: string }

export function PageTitle({ title = 'Home' }: Readonly<Props>) {
  return (
    <div className="py-1">
      <span className="mt-3 font-manrope text-2xl font-extrabold tracking-tight text-slate-900">
        {title}
      </span>
    </div>
  )
}

export default PageTitle
