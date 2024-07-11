export type StoredBlinks = Blink[]

export interface Blink {
  id: string
  blink: string
  address: string
  createdAt: string
  User: User
  Tags: Tag[]
}

export interface User {
  id: string
  address: string
  username: string
  avatar: string
  first_name: any
  last_name: any
  bio: any
  created_at: string
}

export interface Tag {
  id: string
  tag: string
  blink_id: string
  createdAt: string
}
