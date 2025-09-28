import { atom } from 'jotai'

const isDev = atom(false)
const isLoading = atom(false)
const isStarted = atom(false)
const isGizmaViewCube = atom(false)
const mouseOverlayText = atom<string>()

export const globalStore = { isDev, isGizmaViewCube, mouseOverlayText, isLoading, isStarted }
