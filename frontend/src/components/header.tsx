// import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-500 to-secondary-500 p-4 md:px-12">
      <div className="m-auto flex max-w-5xl items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            {/* <Image alt="logo" width={30} height={30} src="/logo.png" /> */}
            <span className="text-xl font-bold text-white">Carbonara</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <p className="text-white">John Doe</p>
          <div className="rounded-full bg-white p-1">
            <span className="font-bold text-black">JD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
