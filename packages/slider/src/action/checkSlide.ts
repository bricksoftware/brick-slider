import { getChildren } from "@/core/functions/getChildren"
import { setStyle } from "@/dom/methods/setStyle"
import { checkSlideCloned } from "@/action/checkSlideCloned"
import { STYLES, slideNodeList } from "@/util/constants"

export const checkSlide = ($root: string, isInfinite: boolean) => {
  const $children = getChildren($root)

  const slides = slideNodeList($root)

  if (isInfinite) {
    setStyle($children, STYLES.TRANSITION, "")

    checkSlideCloned($root, slides)
  }
}
