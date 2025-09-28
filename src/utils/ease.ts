export const easeOutQuad = (x: number) => 1 - (1 - x) * (1 - x)

export const customEase = (x: number) => {
  if (x < 0.8) return Math.sqrt(x)
  return 0.8 + (x - 0.8) * 0.25
}
