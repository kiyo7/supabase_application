export interface Profile {
  id: string | undefined
  updated_at: string
  created_at: string
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

export interface EditedProfile {
  username: string | undefined
  avatar_url: string | undefined
  favorites: string | undefined
}

export interface Notice {
  id: string
  created_at: string
  user_id: string | undefined
  content: string
}

export interface EditedNotice {
  id: string
  content: string
}
