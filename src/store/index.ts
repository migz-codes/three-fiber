import { atom } from 'jotai'

const isDev = atom(false)

export const globalStore = { isDev }
