import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CallbackScreen() {
  const router = useRouter()
  const queryParams = router.query

  const [userInfo, setUserInfo] = useState<any>('')

  useEffect(() => {
    if (!queryParams?.['code']) return
    fetch(
      `/api/userinfo-with-code?code=${queryParams['code']}&state=${queryParams['state']}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) router.push('/')
        else setUserInfo(data)
      })
      .catch((err) => router.push('/'))
  }, [queryParams, router])

  return <div>Logged In - {JSON.stringify(userInfo)}</div>
}
