import { getChildren } from "@/core/functions/getChildren"
import { State, State_Keys } from "../../state/BrickState"
import { transform } from "../../transition/transform"
import { getPositionX } from "./functions/getPositionX"
<<<<<<< HEAD
//import { getFirstChildren } from "@/dom/methods/getFirstChildren"
//import { getLastChildren } from "@/dom/methods/getLastChildren"
import { RequestAnimationFrame } from "./RequestAnimationFrame"
import { setSliderTransition } from "@/action/setSliderTransition"
=======
import { RequestAnimationFrame } from "./RequestAnimationFrame"
>>>>>>> master
import { updateSliderTransition } from "@/action/updateSliderTransition"

export class TouchMove {
  state: State
  rootSelector: string
  slider: HTMLElement
  animation: RequestAnimationFrame

  constructor(rootSelector: string) {
    this.animation = new RequestAnimationFrame(rootSelector)
    this.state = new State(rootSelector)
    this.rootSelector = rootSelector
    this.slider = getChildren(this.rootSelector)
  }

  public init = (event: Event): void => {
    const { state, rootSelector, animation } = this

    const [isDragging, currentPosition, prevTranslate, startPos] = [
      state.get(State_Keys.isDragging),
      getPositionX(event),
      state.get(State_Keys.prevTranslate),
      state.get(State_Keys.startPos)
    ]

    updateSliderTransition(rootSelector, "")

<<<<<<< HEAD
    if (isDragging) {
      const deltaX = currentPosition - startPos
      //const firstSlide = getFirstChildren(this.slider) as HTMLElement
      // const lastSlide = getLastChildren(this.slider)

      if (deltaX > 0) {
        // Movimento da esquerda para a direita
        // Execute ação desejada aqui.
        const sliderWidth = state.get(State_Keys.SliderWidth)
        const deltaPercentage = (deltaX / sliderWidth) * 100

        if (deltaPercentage >= 50) {
          console.log("Movimento atingiu 50% da largura do contêiner.", deltaPercentage)
        }
      } else if (deltaX < 0) {
        // Movimento da direita para a esquerda
        // Execute outra ação desejada aqui.
        /* if (
          state.get(State_Keys.SlideIndex) >=
          state.get(State_Keys.NumberOfSlides) - 1
        ) {
          this.slider.removeChild(firstSlide)
          this.slider.style.transform = "translateX(-1732px)"
          this.slider.appendChild(firstSlide)
        }*/
      }
      state.set(State_Keys.currentTranslate, prevTranslate + currentPosition - startPos)

      const setCurrentTranslate = state.get(State_Keys.currentTranslate)

      transform(rootSelector, setCurrentTranslate)
      requestAnimationFrame(animation.init)
=======
    if (isDragging && !state.get(State_Keys.SliderReady)) {
      state.set(State_Keys.currentTranslate, prevTranslate + currentPosition - startPos)

      if (state.get(State_Keys.SliderReady)) {
        const setCurrentTranslate = state.get(State_Keys.currentTranslate)
        transform(rootSelector, setCurrentTranslate)
        requestAnimationFrame(animation.init)
      }
>>>>>>> master
    }
  }
}
