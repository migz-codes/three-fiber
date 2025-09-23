import { atom } from 'jotai'

const isDev = atom(false)
const isGizmaViewCube = atom(false)

export const globalStore = { isDev, isGizmaViewCube }
