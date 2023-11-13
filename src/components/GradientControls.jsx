import React from 'react'
import { usePicker } from '../context'
import { formatInputValues } from '../utils/formatters'
import { controlBtnStyles } from './Controls'
import TrashIcon, {
  LinearIcon,
  RadialIcon,
  DegreesIcon,
  StopIcon,
} from './icon'
import {
  df,
  jsb,
  ac,
  controlBtnsWrap,
  controlBtn,
  degreeInput,
  psRl,
  jc,
  borderBox,
} from '../style'

const GradientControls = ({hideGradientType, hideGradientAngle, hideGradientStop}) => {
  const { gradientType } = usePicker()
  return (
    <div
      style={{
        ...df,
        ...jsb,
        marginTop: 12,
        marginBottom: -4,
        background: '#e9e9f5',
        borderRadius: 6,
        ...borderBox,
        paddingLeft: hideGradientType ? 4 : 0
      }}
    >
      {!hideGradientType && <GradientType />}
      <div style={{ width: 53 }}>
        {(!hideGradientAngle && gradientType === 'linear-gradient') && (
          <DegreePicker />
        )}
      </div>
      <DeleteBtn />
    </div>
  )
}

export default GradientControls

const GradientType = () => {
  const { gradientType, internalOnChange, value } = usePicker()
  let isLinear = gradientType === 'linear-gradient'
  let isRadial = gradientType === 'radial-gradient'

  const handleLinear = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`linear-gradient(90deg, ${remaining}`)
  }

  const handleRadial = () => {
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`radial-gradient(circle, ${remaining}`)
  }

  return (
    <div style={{ ...df, ...ac, ...controlBtnsWrap, ...borderBox }}>
      <div
        onClick={handleLinear}
        style={{ ...controlBtn, ...controlBtnStyles(isLinear) }}
      >
        <LinearIcon color={isLinear ? '#568CF5' : ''} />
      </div>
      <div
        onClick={handleRadial}
        style={{ ...controlBtn, ...controlBtnStyles(isRadial) }}
      >
        <RadialIcon color={isRadial ? '#568CF5' : ''} />
      </div>
    </div>
  )
}

const StopPicker = () => {
  const { currentLeft, handleGradient, currentColor } = usePicker()

  const handleMove = (newVal) => {
    handleGradient(currentColor, formatInputValues(newVal, 0, 100))
  }

  return (
    <div style={{ ...df, ...ac, ...controlBtnsWrap, paddingLeft: 8 }}>
      <StopIcon />
      <input
        id="rbgcp-input"
        style={degreeInput}
        value={currentLeft}
        onChange={(e) => handleMove(e.target.value || 0)}
      />
    </div>
  )
}

const DegreePicker = () => {
  const { degrees, internalOnChange, value } = usePicker()

  const handleDegrees = (e) => {
    let newValue = formatInputValues(e.target.value, 0, 360)
    const remaining = value.split(/,(.+)/)[1]
    internalOnChange(`linear-gradient(${newValue || 0}deg, ${remaining}`)
  }

  return (
    <div style={{ ...psRl, ...controlBtnsWrap, ...df, ...ac }}>
      <DegreesIcon />
      <input
        id="rbgcp-input"
        style={degreeInput}
        value={degrees}
        onChange={(e) => handleDegrees(e)}
      />
      <div
        style={{
          position: 'absolute',
          right: degrees > 99 ? 0 : degrees < 10 ? 7 : 3,
          top: 1,
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        °
      </div>
    </div>
  )
}

const DeleteBtn = () => {
  const { deletePoint } = usePicker()

  return (
    <div
      onClick={deletePoint}
      style={{
        ...df,
        ...jc,
        ...ac,
        ...controlBtnsWrap,
        width: 30,
        ...controlBtnStyles(false),
        marginRight: 1,
      }}
    >
      <TrashIcon />
    </div>
  )
}
