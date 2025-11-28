import Link from 'next/link'

const Header = () => {
  return (
     <nav className="flex justify-between items-center ">
          <div className="sm:flex hidden flex-1"></div>
          <h3 className="flex-1 text-4xl font-bold text-blue-400">Learning Lounge</h3>
          <div className="flex flex-1 justify-center gap-3 sm:justify-end">
            <Link href={'/register'}>
              <button className="cursor-pointer bg-blue-400 text-foreground p-3 rounded-4xl font-bold hover:bg-blue-300">
                Sign Up
              </button>
            </Link>
            <Link href={'/login'}>
              <button className="cursor-pointer text-white p-3 rounded-4xl font-bold hover:bg-blue-300">
                Login In
              </button>
            </Link>
          </div>
        </nav>
  )
}

export default Header