export interface Post {
  id: string
  created_at: string
  user_id: string | undefined
  title: string
  post_url: string
}

export interface EditedPost {
  id: string
  title: string
  post_url: string
}

export interface Comment {
  id: string
  created_at: string
  user_id: string | undefined
  post_id: string
  comment: string
}

export interface EditedComment {
  id: string
  comment: string
}

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
