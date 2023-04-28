import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function LoggedInScreen() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>('')

  useEffect(() => {
    fetch('/api/userinfo')
      .then((res) => res.json())
      .then((data) => setUserInfo(data))
      .catch((err) => router.push('/'))
  }, [])

  return <div>Logged In - {JSON.stringify(userInfo)}</div>
}
