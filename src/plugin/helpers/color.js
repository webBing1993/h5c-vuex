import tinycolor from './tinycolor'

module.exports = {
  /**
  color {Object|String}
  source {String}
  */
  getColor: (color, source) => {
    if (source === 'hsva') {
      let originColor = Object.assign({}, color)
      let hsva = tinycolor(color)
      let rgba = hsva.toRgb()
      let hex = hsva.toHexString()
      return {
        rgba,
        hex,
        hsva: originColor
      }
    } else if (source === 'rgba') {
      let rgba = tinycolor(color)
      let hsva = rgba.toHsv()
      let hex = rgba.toHexString()
      console.log(color)
      return {
        hex,
        hsva,
        rgba: color
      }
    } else {
      let hex = tinycolor(color)
      let rgba = hex.toRgb()
      let hsva = hex.toHsv()
      return {
        rgba,
        hsva,
        hex: `#${color}`
      }
    }
  }
}
