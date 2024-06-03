import Link from 'next/link'

export function LinksCard({ name, links }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white py-4 shadow  dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-4 text-center font-poppins text-base font-semibold">
        {name}
      </h1>
      <ul className="grid grid-cols-1 gap-y-1 px-6">
        {links?.map((link, idx) => {
          return (
            <li
              className="inline-flex items-center break-words font-quicksand text-sm font-medium"
              key={idx}
            >
              <Link
                href={link.href}
                className=" w-full break-words text-blue-600 hover:underline dark:text-blue-500 "
              >
                {link.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
