import { Suspense } from 'react'
import { useQueryClient } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'
import { supabase } from '../utils/supabase'
import useStore from '../store'
import { Spinner } from './Spinner'
import { UserProfile } from './UserProfile'
import { Notification } from '../components/Notification'
import { Feed } from './Feed'

export const DashBoard: React.FC = () => {
  const queryClient = useQueryClient()
  const resetEditedProfile = useStore((state) => state.resetEditedProfile)
  const resetEditedNotice = useStore((state) => state.resetEditedNotice)
  const resetEditedPost = useStore((state) => state.resetEditedPost)

  const signOut = () => {
    supabase.auth
      .signOut()
      .then(() => {
        resetEditedProfile()
        resetEditedNotice()
        resetEditedPost()
        queryClient.removeQueries(['profile'])
        queryClient.removeQueries(['notices'])
        queryClient.removeQueries(['posts'])
      })
      .catch((err: any) => {
        throw new Error(err.message)
      })
  }
  return (
    <>
      <LogoutIcon
        onClick={signOut}
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
        data-testid="logout"
      />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <UserProfile />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex w-96 flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Feed />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="flex flex-col items-center">
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense fallback={<Spinner />}>
              <Notification />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  )
}
