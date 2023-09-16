import {
  CLASS_VALUES,
  EVENTS,
  /*TAGS s */ childrenSelector
} from "../util/constants"
import { transform as transformSlider } from "../transition/transform"
import { addClass } from "../dom/methods/addClass"
import { hasClass } from "../dom/methods/hasClass"
import { removeClass } from "../dom/methods/removeClass"
import { getAllElements } from "../dom/methods/getAllElements"
import { setSlideIndex } from "./setSlideIndex"
import { State, State_Keys } from "../state/BrickState"
import { getChildren } from "../core/functions/getChildren"
import { matchStateOptions } from "../util/matchStateOptions"
import { listener } from "@/util"

export enum FROM {
  DOTS = "dots",
  PREV = "prev",
  NEXT = "next",
  TOUCH = "touch"
}

export function setCurrentSlide(
  params: {
    from?: FROM.DOTS | FROM.PREV | FROM.NEXT | FROM.TOUCH
    index?: number
    rootSelector: string
  } = {
    rootSelector: ""
  }
): void {
  const { from, index, rootSelector } = params,
    state = new State(rootSelector),
    slider = getChildren(rootSelector),
    slides = Array.from(
      getAllElements<HTMLElement>(`${childrenSelector} > *`, slider)
    )

  const isInfinite = matchStateOptions(rootSelector, {
    [State_Keys.Infinite]: true
  })

  slides.forEach((slide, index) => {
    const [isFirst, isLast, isStopSlider] = [
      from === FROM.PREV && index === 0,
      from === FROM.NEXT && index === slides.length - 1,
      state.get(State_Keys.isStopSlider)
    ]

    switch (true) {
      case hasClass(slide, CLASS_VALUES.ACTIVE) && (isFirst || isLast):
        state.set(State_Keys.isStopSlider, true)
        break

      case hasClass(slide, CLASS_VALUES.ACTIVE) && !isStopSlider:
        removeClass(slide, CLASS_VALUES.ACTIVE)
        state.set(State_Keys.SlideIndex, index)
        break

      default:
        break
    }
  })

  if (from && !state.get(State_Keys.isStopSlider)) {
    const currentSlideIndex = state.get(State_Keys.SlideIndex)

    const slideIndex = setSlideIndex({
      from,
      currentSlideIndex,
      index
    })
    //getSlidePosition = (slideIndex + slides.length) % slides.length

    addClass([slides[slideIndex]], CLASS_VALUES.ACTIVE)

    state.set(State_Keys.SlideIndex, slideIndex)

    transformSlider(rootSelector)

    listener(EVENTS.TRANSITIONEND, slider, () => {
      if (isInfinite && state.get(State_Keys.SlideIndex) === 0) {
        console.log("vc me deve um translateX")
      }
    })
  } else {
    state.setMultipleState({
      [State_Keys.SliderReady]: true,
      [State_Keys.isStopSlider]: false
    })
  }
}
