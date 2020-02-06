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

export interface Theme {
  primaryBackground: string
  editorBackground: string
  highlighter: string
  hoverHighlighterBar: string
  textPrimary: string
  textSecondary: string
  textHighlight: string
  primaryButton: string
  primaryHoverButton: string
  primaryButtonBorder: string
}
