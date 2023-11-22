import { CardItemEntity, UserSessionIdEntity } from '@/types/type'
import { atom } from 'jotai'

export const currentUserState = atom<UserSessionIdEntity | null>(null)

export const isLoggedInState = atom<boolean>((get) =>
  Boolean(get(currentUserState))
)

export const cardState = atom<CardItemEntity[] | null>(null)
