import Image from 'next/image'
import { CameraIcon } from '@heroicons/react/solid'
import { format } from 'date-fns'
import useStore from '../store'
import { useQueryProfile } from '../hooks/query/useQueryProfile'
import { useMutateProfile } from '../hooks/mutate/useMutateProfile'
import { useDownloadUrl } from '../hooks/other/useDownloadUrl'
import { useUploadAvatarImg } from '../hooks/other/useUploadAvatarImg'
import { Spinner } from './Spinner'

export const UserProfile: React.FC = () => {
  const session = useStore((state) => state.session)
  const editedProfile = useStore((state) => state.editedProfile)
  const updateEditedProfile = useStore((state) => state.updateEditedProfile)

  const { data: profile } = useQueryProfile()
  const { updateProfileMutation } = useMutateProfile()
  const { useMutateUploadAvatarImg } = useUploadAvatarImg()
  const { fullUrl: avatarUrl, isLoading } = useDownloadUrl(
    editedProfile.avatar_url,
    'avatars'
  )
  const updateProfile = () => {
    updateProfileMutation.mutate({
      id: session?.user?.id,
      username: editedProfile.username,
      favorites: editedProfile.favorites,
      avatar_url: editedProfile.avatar_url,
    })
  }
  return (
    <>
      <p className="mb-4">{profile?.username}</p>
      {profile?.created_at && (
        <p className="my-1 text-sm">
          {format(new Date(profile.created_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
      {profile?.updated_at && (
        <p className="text-sm">
          {format(new Date(profile.updated_at), 'yyyy-MM-dd HH:mm:ss')}
        </p>
      )}
      <p className="mt-4">ユーザーネーム</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        placeholder="ユーザーネーム"
        value={editedProfile.username || ''}
        onChange={(e) =>
          updateEditedProfile({ ...editedProfile, username: e.target.value })
        }
      />
      <p>趣味</p>
      <input
        className="my-2 mx-2 rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none"
        type="text"
        value={editedProfile.favorites || ''}
        onChange={(e) =>
          updateEditedProfile({ ...editedProfile, favorites: e.target.value })
        }
      />
      <button
        className={`my-5 rounded ${
          updateProfileMutation.isLoading || !editedProfile.username
            ? 'bg-gray-400'
            : 'bg-indigo-600'
        } px-3 py-2 text-sm font-medium text-white`}
        onClick={updateProfile}
        disabled={updateProfileMutation.isLoading || !editedProfile.username}
      >
        {updateProfileMutation.isLoading ? '更新中...' : '更新'}
      </button>
      {avatarUrl && (
        <Image
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          width={150}
          height={150}
        />
      )}
      {isLoading && <Spinner />}
      <div className="flex justify-center">
        <label htmlFor="avatar">
          <CameraIcon className="my-3 h-7 w-7 cursor-pointer text-gray-500" />
        </label>
        <input
          className="hidden"
          type="file"
          id="avatar"
          accept="image/*"
          onChange={(e) => useMutateUploadAvatarImg.mutate(e)}
        />
      </div>
    </>
  )
}
