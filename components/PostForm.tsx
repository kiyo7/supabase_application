import { FormEvent, memo } from 'react'
import Image from 'next/image'
import { CameraIcon } from '@heroicons/react/solid'
import useStore from '../store'
import { useMutatePost } from '../hooks/mutate/useMutatePost'
import { useDownloadUrl } from '../hooks/other/useDownloadUrl'
import { useUploadPostImg } from '../hooks/other/useUploadPostImg'
import { Spinner } from './Spinner'

export const PostFormMemo: React.FC = () => {
  const session = useStore((state) => state.session)
  const editedPost = useStore((state) => state.editedPost)
  const updateEditedPost = useStore((state) => state.updateEditedPost)

  const { createPostMutation, updatePostMutation } = useMutatePost()
  const { useMutateUploadPostImg } = useUploadPostImg()
  const { fullUrl: postUrl, setFullUrl } = useDownloadUrl(
    editedPost.post_url,
    'posts'
  )
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedPost.id === '') {
      await createPostMutation.mutateAsync({
        user_id: session?.user?.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
      })
      setFullUrl('')
    } else {
      await updatePostMutation.mutateAsync({
        id: editedPost.id,
        title: editedPost.title,
        post_url: editedPost.post_url,
      })
      setFullUrl('')
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="New post ?"
        value={editedPost.title}
        onChange={(e) =>
          updateEditedPost({ ...editedPost, title: e.target.value })
        }
        className="my-1 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
      />
      <div className="my-3 flex justify-center">
        <button
          data-testid="btn-post"
          type="submit"
          disabled={useMutateUploadPostImg.isLoading || !editedPost.title}
          className={`rounded ${
            useMutateUploadPostImg.isLoading || !editedPost.title
              ? 'bg-gray-300'
              : 'bg-indigo-600'
          } px-3 py-2 text-sm text-white`}
        >
          {editedPost.id ? '更新' : '作成'}
        </button>
      </div>
      <div className="flex justify-center">
        {postUrl && (
          <Image
            src={postUrl}
            alt="Image"
            width={150}
            height={150}
            className="rounded"
          />
        )}
      </div>
      <div className="flex justify-center">
        {useMutateUploadPostImg.isLoading && <Spinner />}
      </div>
      <div className="flex justify-center">
        <label htmlFor="post">
          <CameraIcon className="mt-2 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          type="file"
          id="post"
          accept="image/*"
          onChange={async (e) => {
            await useMutateUploadPostImg.mutateAsync(e)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>
    </form>
  )
}

export const PostForm = memo(PostFormMemo)
