import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <button
          onClick={async () => {
            router.push('/api/login?icecream=vanilla&toast=bread')
          }}
        >
          login
        </button>
      </div>
    </main>
  )
}
