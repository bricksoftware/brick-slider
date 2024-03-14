import { ATTRIBUTES, EVENTS, STYLES, TRANSITIONS } from "../util/constants"
import { updateDots } from "./updateDots"
import { State, State_Keys } from "../state/BrickState"
import {
  getChildren,
  getChildrenCount,
  getElementAttribute,
  setStyle
} from "@/dom"
import { listener, slideIndexBypass } from "@/util"
import { FROM } from "@/action/setCurrentSlide"
import { Slider } from "@/core/Slider"

export function handleClick(button: Element, $root: string): () => void {
  return () => {
    const state = new State($root)
    const isInfinite = state.get(State_Keys.Infinite)
    const $children = getChildren($root)
    const slider = new Slider($root)

    listener(EVENTS.MOUSELEAVE, button, () =>
      setStyle($children, STYLES.TRANSITION, "")
    )

    setStyle($children, STYLES.TRANSITION, TRANSITIONS.TRANSFORM_EASE)

    const getAttribute = getElementAttribute(button, ATTRIBUTES.DIRECTION)
    const isPrevDirection = getAttribute === FROM.PREV

    state.set(State_Keys.SliderReady, false)

    slider.setCurrentSlide({
      from: isPrevDirection ? FROM.PREV : FROM.NEXT,
      $root
    })

    const { slidesPerPage, slideIndex, dots } = state.store
    const numberOfSlides = getChildrenCount($children)
    const index = isInfinite
      ? slideIndexBypass(slideIndex, numberOfSlides, slidesPerPage)
      : slideIndex

    if (dots) updateDots(index, $root)

    listener(EVENTS.TRANSITIONEND, $children, () => {
      state.set(State_Keys.EndTime, Date.now())
      const { startTime, endTime, numberOfSlides } = state.store
      const isDefaultClick = Math.abs(startTime - endTime) >= 300
      state.set(State_Keys.SliderReady, true)

      if (
        isDefaultClick ||
        (!isInfinite && index > numberOfSlides - 1) ||
        (!isInfinite && numberOfSlides < 0)
      )
        setStyle($children, STYLES.TRANSITION, "")
    })
  }
}

// const isSliderReady = state.get(State_Keys.SliderReady)

//if (!isSliderReady) return

/* if (!isInfinite) {
}*/

/* waitFor(100, () => {
  /* if (
    (isInfinite && index !== numberOfSlides - 1) ||
    (isInfinite && numberOfSlides !== 0)
  ) {
  }
  // state.set(State_Keys.SliderReady, true)*/
//})

/*
    //const numberOfSlides = state.get(State_Keys.NumberOfSlides) + 4
*/
