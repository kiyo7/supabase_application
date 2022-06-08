import { Dispatch, SetStateAction, memo } from 'react'
import Image from 'next/image'
import {
  PencilAltIcon,
  TrashIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import useStore from '../store'
import { EditedComment } from '../types'
import { useQueryAvatar } from '../hooks/query/useQueryAvatar'
import { useMutateComment } from '../hooks/mutate/useMutateComment'
import { useDownloadUrl } from '../hooks/other/useDownloadUrl'

interface Props {
  id: string
  comment: string
  user_id: string | undefined
  setEditedComment: Dispatch<SetStateAction<EditedComment>>
}

export const CommentItemMemo: React.FC<Props> = ({
  id,
  comment,
  user_id,
  setEditedComment,
}) => {
  const session = useStore((state) => state.session)
  const { data } = useQueryAvatar(user_id)
  const { deleteCommentMutation } = useMutateComment()
  const { fullUrl: avatarUrl } = useDownloadUrl(data?.avatar_url, 'avatars')
  return (
    <li className="my-3 flex items-center justify-between">
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
          <UserCircleIcon className="indigo-block h-8 w-8 cursor-pointer text-gray-500" />
        )}
        <span className="mx-1 text-sm">{comment}</span>
      </div>
      {session?.user?.id === user_id && (
        <div className="flex">
          <PencilAltIcon
            data-testid="pencil-comment"
            onClick={() => {
              setEditedComment({ id: id, comment: comment })
            }}
            className="h-5 w-5 cursor-pointer text-blue-500"
          />
          <TrashIcon
            data-testid="trash-comment"
            onClick={() => {
              deleteCommentMutation.mutate(id)
            }}
            className="h-5 w-5 cursor-pointer text-blue-500"
          />
        </div>
      )}
    </li>
  )
}

export const CommentItem = memo(CommentItemMemo)
