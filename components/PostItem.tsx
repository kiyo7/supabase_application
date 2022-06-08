import { useState, Suspense, memo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import { ChatAlt2Icon } from '@heroicons/react/outline'

import { Spinner } from './Spinner'
import useStore from '../store'
import { Post } from '../types'
import { useMutatePost } from '../hooks/mutate/useMutatePost'
import { useQueryAvatar } from '../hooks/query/useQueryAvatar'
import { useDownloadUrl } from '../hooks/other/useDownloadUrl'
import { Comments } from './Comments'

export const PostItemMemo: React.FC<Omit<Post, 'created_at'>> = ({
  id,
  title,
  post_url,
  user_id,
}) => {
  const [openComments, setOpenComments] = useState(false)
  const session = useStore((state) => state.session)
  const updateEditedPost = useStore((state) => state.updateEditedPost)
  const { data } = useQueryAvatar(user_id)
  const { deletePostMutation } = useMutatePost()
  const { fullUrl: avatarUrl, isLoading: isLoadingAvatar } = useDownloadUrl(
    data?.avatar_url,
    'avatars'
  )
  const { fullUrl: postUrl, isLoading: isLoadingPost } = useDownloadUrl(
    post_url,
    'posts'
  )

  return (
    <>
      <li className="w-80">
        <div className="my-3 w-full border border-dashed border-gray-400" />
        <div className="flex items-center justify-between">
          <div className="flex">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="inline-block h-8 w-8 cursor-pointer text-gray-500" />
            )}
            <span className="ml-2 font-bold">{title}</span>
          </div>
          {session?.user?.id === user_id && (
            <div className="flex pr-4">
              <PencilAltIcon
                data-testid="pencil-post"
                onClick={() =>
                  updateEditedPost({
                    id: id,
                    title: title,
                    post_url: post_url,
                  })
                }
                className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
              />
              <TrashIcon
                onClick={() => {
                  deletePostMutation.mutate(id)
                }}
                className="h-5 w-5 cursor-pointer text-blue-500"
              />
            </div>
          )}
        </div>
        <div className="my-3 flex justify-center">
          {postUrl && (
            <Image
              src={postUrl}
              alt="Image"
              width={300}
              height={220}
              className="rounded-lg"
            />
          )}
        </div>
        <div className="my-3 flex justify-center">
          {(isLoadingAvatar || isLoadingPost) && <Spinner />}
        </div>
        <ChatAlt2Icon
          data-testid="open-comments"
          onClick={() => setOpenComments(!openComments)}
          className="ml-2 h-6 w-6 cursor-pointer text-blue-500"
        />
        {openComments && (
          <ErrorBoundary
            fallback={
              <ExclamationCircleIcon className="my-5 h-10 w-10 text-pink-500" />
            }
          >
            <Suspense
              fallback={
                <div className="flex justify-center">
                  <Spinner />
                </div>
              }
            >
              <div className="flex justify-center">
                <Comments postId={id} />
              </div>
            </Suspense>
          </ErrorBoundary>
        )}
      </li>
    </>
  )
}

export const PostItem = memo(PostItemMemo)
