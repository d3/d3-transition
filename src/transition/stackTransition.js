export default function stackTransition(data) {
  const total = d3.sum(data)
  const scales = d3.stack()
    .keys([...data.keys()])
    ([data])
    .map(([[start, end]]) => d3.scaleLinear([start/total, end/total], [0, 1]))

  return function (element) {
    const ease = element.ease()
    element.delay(element.delay())
      .duration(element.duration())
      .easeVarying((_, i, slices) => t => {
        let variation = scales[i](ease(t))
        if (variation <= 0 && i > 0) return 0
        if (variation > 1 && i < slices.length - 1) return 1
        return variation
      })
  }
}