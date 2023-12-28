import React, { useState, useEffect } from 'react'
import { rgb2cmyk, cmykToRgb } from '../utils/converters'
import { formatInputValues } from '../utils/formatters'
import { usePicker } from '../context'
import { inputWrap, inputLabel } from '../style'

var tc = require('tinycolor2')

const Inputs = () => {
  const { handleChange, r, g, b, opacity, inputType, hideOpacity } = usePicker()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 14,
        flexWrap: 'wrap'
      }}
    >
      {inputType === 'hsl' && <HSLInputs />}
      {inputType === 'rgb' && <RGBInputs />}
      {inputType === 'hsv' && <HSVInputs />}
      {inputType === 'cmyk' && <CMKYInputs />}

      {!hideOpacity && (
        <Input
          value={Math.round(opacity * 100)}
          callback={(newVal) =>
            handleChange(`rgba(${r}, ${g}, ${b}, ${newVal / 100})`)
          }
          label="A"
        />
      )}
    </div>
  )
}

export default Inputs

const RGBInputs = () => {
  const { handleChange, r, g, b, opacity } = usePicker()

  const handleRgb = ({ r, g, b }) => {
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  return (
    <>
      <Input
        value={r}
        callback={(newVal) => handleRgb({ r: newVal, g: g, b: b })}
        label="R"
        max={255}
      />
      <Input
        value={g}
        callback={(newVal) => handleRgb({ r: r, g: newVal, b: b })}
        label="G"
        max={255}
      />
      <Input
        value={b}
        callback={(newVal) => handleRgb({ r: r, g: g, b: newVal })}
        label="B"
        max={255}
      />
    </>
  )
}

const HSLInputs = () => {
  const { handleChange, s, l, internalHue, opacity, setInternalHue } =
    usePicker()

  const handleH = (h, s, l) => {
    setInternalHue(h)
    let { r, g, b } = tc({ h: h, s: s, l: l }).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  const handleSl = (value) => {
    let { r, g, b } = tc(value).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  return (
    <>
      <Input
        value={round(internalHue)}
        callback={(newVal) => handleH(newVal, s, l)}
        label="H"
        max={360}
      />
      <Input
        value={round(s * 100)}
        callback={(newVal) => handleSl({ h: internalHue, s: newVal, l: l })}
        label="S"
      />
      <Input
        value={round(l * 100)}
        callback={(newVal) => handleSl({ h: internalHue, s: s, l: newVal })}
        label="L"
      />
    </>
  )
}

const HSVInputs = () => {
  const { handleChange, hsvS, hsvV, internalHue, setInternalHue, opacity } =
    usePicker()

  const handleH = (h, s, v) => {
    setInternalHue(h)
    let { r, g, b } = tc({ h: h, s: s, v: v }).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  const handleSV = (value) => {
    let { r, g, b } = tc(value).toRgb()
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  return (
    <>
      <Input
        value={round(internalHue)}
        callback={(newVal) => handleH(newVal, hsvS, hsvV)}
        label="H"
        max={360}
      />
      <Input
        value={round(hsvS * 100)}
        callback={(newVal) => handleSV({ h: internalHue, s: newVal, v: hsvV })}
        label="S"
      />
      <Input
        value={round(hsvV * 100)}
        callback={(newVal) => handleSV({ h: internalHue, s: hsvS, v: newVal })}
        label="V"
      />
    </>
  )
}

const CMKYInputs = () => {
  const { handleChange, r, g, b, opacity } = usePicker()
  const { c, m, k, y } = rgb2cmyk(r, g, b)

  const handleCmyk = (value) => {
    let { r, g, b } = cmykToRgb(value)
    handleChange(`rgba(${r}, ${g}, ${b}, ${opacity})`)
  }

  return (
    <>
      <Input
        value={round(c * 100)}
        callback={(newVal) => handleCmyk({ c: newVal, m: m, y: y, k: k })}
        label="C"
      />
      <Input
        value={round(m * 100)}
        callback={(newVal) => handleCmyk({ c: c, m: newVal, y: y, k: k })}
        label="M"
      />
      <Input
        value={round(y * 100)}
        callback={(newVal) => handleCmyk({ c: c, m: m, y: newVal, k: k })}
        label="Y"
      />
      <Input
        value={round(k * 100)}
        callback={(newVal) => handleCmyk({ c: c, m: m, y: y, k: newVal })}
        label="K"
      />
    </>
  )
}

const Input = ({ value, callback, max = 100, label }) => {
  const [temp, setTemp] = useState(value);
  const { hideOpacity } = usePicker();
  const width = hideOpacity ? '22%' : '18%'

  useEffect(() => {
    setTemp(value)
  }, [value])

  const onChange = (e) => {
    const newVal = formatInputValues(parseFloat(e.target.value), 0, max)
    setTemp(newVal)
    callback(newVal)
  }

  return (
    <div style={{ width: width }}>
      <input
        id="rbgcp-input"
        style={{ ...inputWrap }}
        value={temp}
        onChange={(e) => onChange(e)}
      />
      <div style={{ ...inputLabel }}>{label}</div>
    </div>
  )
}

const round = (val) => {
  return Math.round(val, 2)
}
