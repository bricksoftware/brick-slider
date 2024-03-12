/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrickSlider } from "./core/BrickSlider"
//;(window as any).BrickSlider = BrickSlider
const slider4 = new BrickSlider("#slide4_container", {
  infinite: false,
  slidesPerPage: 2,
  spacing: 20
})

slider4.init()

const slider = new BrickSlider("#slide1_container", {
  infinite: true,
  spacing: 20
})

slider.init()

const slider2 = new BrickSlider("#slide2_container", {
  arrows: true,
  spacing: 20
})

slider2.init()

const slider3 = new BrickSlider("#slide3_container", { spacing: 20 })

slider3.init()

export { BrickSlider }