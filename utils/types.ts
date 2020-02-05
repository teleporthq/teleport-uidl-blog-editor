export type Files = {
  [key: string]: File
}

export interface File {
  id: number
  name: string
  slug: string
  content: string
  home?: boolean // To make a specific file as anchor for the blog
}

export interface BlogMeta {
  blogName: string
  blogDescription: string
}
