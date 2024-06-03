/**
 * Tag for Technoligie
 */
function Tag({ value, showAppWithTech }) {
  const handleClick = (e) => {
    e.stopPropagation()
    showAppWithTech(value)
  }
  return (
    <button
      type="button"
      className="group relative rounded-md border border-slate-200 bg-white p-1.5 pl-4 font-quicksand text-xs font-semibold shadow-sm hover:bg-blue-500 hover:text-white"
      onClick={handleClick}
    >
      <span className="absolute start-0 top-0 h-full rounded-es-md rounded-ss-md border-l-4 border-blue-500 group-hover:bg-white "></span>
      {value}
    </button>
  )
}

export default Tag
