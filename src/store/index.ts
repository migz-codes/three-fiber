import { atom } from 'jotai'

const isDev = atom(false)
const isLoading = atom(false)
const isStarted = atom(false)
const isGizmaViewCube = atom(false)
const mouseOverlayText = atom<string>()

const audioMapAtom = atom<Record<string, AudioBuffer | null>>({})

export const globalStore = {
  isDev,
  isLoading,
  isStarted,
  audioMapAtom,
  isGizmaViewCube,
  mouseOverlayText
}
