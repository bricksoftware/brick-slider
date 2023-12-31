export function adjustSlideIndex(index: number, slidesPerPage: number) {
  if (slidesPerPage > 1) {
    return Math.floor(index / slidesPerPage)
  }
  return index
}
