import { useState, FormEvent } from 'react'
import { ShieldCheckIcon } from '@heroicons/react/solid'
import { useMutateAuth } from '../hooks/useMutateAuth'

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const {
    email,
    setEmail,
    password,
    setPassword,
    registerMutation,
    loginMutation,
  } = useMutateAuth()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate()
    } else {
      registerMutation.mutate()
    }
  }

  return (
    <>
      <ShieldCheckIcon className="mb-8 h-12 w-12 text-blue-500" />
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            required
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <div>
          <input
            type="password"
            required
            placeholder="パスワード"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            className="my-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="my-6 flex items-center justify-center text-sm">
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer font-medium hover:text-indigo-500"
          >
            {isLogin ? '新規登録' : 'ログイン'}
          </span>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm text-white"
        >
          {isLogin ? 'ログイン' : '新規登録'}
        </button>
      </form>
    </>
  )
}
