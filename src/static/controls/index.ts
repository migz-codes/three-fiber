export enum CharacterControls {
  Forward = 'forward',
  Sprint = 'sprint',
  Backward = 'backward',
  Left = 'left',
  Right = 'right',
  Crouch = 'crouch',
  Jump = 'jump',
  Reset = 'reset',
  Dev = 'Dev'
}

const controls = {
  [CharacterControls.Dev]: ['KeyY'],
  [CharacterControls.Reset]: ['KeyR'],
  [CharacterControls.Forward]: ['KeyW', 'ArrowUp'],
  [CharacterControls.Sprint]: ['ShiftLeft'],
  [CharacterControls.Backward]: ['KeyS', 'ArrowDown'],
  [CharacterControls.Left]: ['KeyA', 'ArrowLeft'],
  [CharacterControls.Right]: ['KeyD', 'ArrowRight'],
  [CharacterControls.Crouch]: ['ControlLeft', 'KeyC'],
  [CharacterControls.Jump]: ['Space']
}

export const controlsMap = Object.entries(controls).map(([key, value]) => ({
  name: key,
  keys: value
}))
