import { getElementAttribute } from "../../dom/methods/getElementAttribute"
import { ATTRIBUTES /*TIMES */, EVENTS } from "../../util/constants"
import { FROM, setCurrentSlide } from "../../action/setCurrentSlide"
import { updateDots } from "../../action/updateDots"
import { State, State_Keys } from "../../state/BrickState"
import { matchStateOptions } from "../../util/matchStateOptions"
import { listener } from "../../util"
import { getChildren } from "../../core/functions/getChildren"
import { slideIndexBypass } from "@/action/slideIndexBypass"

export function handleClick(button: Element, rootSelector: string): () => void {
  return () => {
    const state = new State(rootSelector)

    if (!state.get(State_Keys.SliderReady)) return

    state.set(State_Keys.SliderReady, false)

    const getAttribute = getElementAttribute(button, ATTRIBUTES.DIRECTION)
    const isPrevDirection = getAttribute === FROM.PREV

    setCurrentSlide({
      from: isPrevDirection ? FROM.PREV : FROM.NEXT,
      rootSelector
    })

    const isInfinite = state.get(State_Keys.Infinite)

    const index = state.get(State_Keys.SlideIndex)
    const numberOfSlides = state.get(State_Keys.NumberOfSlides) + 2

    const slideIndex = isInfinite
      ? slideIndexBypass(index, numberOfSlides)
      : index

    console.log("index é ", slideIndex, " index real é", index)

    const setActiveDot = () => {
      updateDots(slideIndex, rootSelector)
    }

    matchStateOptions(rootSelector, { [State_Keys.Dots]: true }, setActiveDot)

    const childrenSelector = getChildren(rootSelector)

    listener(EVENTS.TRANSITIONEND, childrenSelector, () => {
      state.set(State_Keys.SliderReady, true)
    })
  }
}
