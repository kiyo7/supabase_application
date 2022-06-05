import create from 'zustand'
import { Session } from '@supabase/supabase-js'
import { EditedPost, EditedNotice, EditedProfile } from '../types'

interface State {
  session: Session | null
  setSession: (payload: Session | null) => void
  editedProfile: EditedProfile
  updateEditedProfile: (payload: EditedProfile) => void
  resetEditedProfile: () => void
  editedNotice: EditedNotice
  updateEditedNotice: (payload: EditedNotice) => void
  resetEditedNotice: () => void
  editedPost: EditedPost
  updateEditedPost: (payload: EditedPost) => void
  resetEditedPost: () => void
}

const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  editedProfile: { username: '', avatar_url: '', favorites: '' },
  updateEditedProfile: (payload) =>
    set({
      editedProfile: {
        username: payload.username,
        avatar_url: payload.avatar_url,
        favorites: payload.favorites,
      },
    }),
  resetEditedProfile: () =>
    set({ editedProfile: { username: '', avatar_url: '', favorites: '' } }),
  editedNotice: { id: '', content: '' },
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: '', content: '' } }),
  editedPost: { id: '', title: '', post_url: '' },
  updateEditedPost: (payload) =>
    set({
      editedPost: {
        title: payload.title,
        id: payload.id,
        post_url: payload.post_url,
      },
    }),
  resetEditedPost: () =>
    set({ editedPost: { id: '', title: '', post_url: '' } }),
}))

export default useStore
