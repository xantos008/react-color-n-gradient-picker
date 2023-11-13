import React from 'react'
import { usePicker } from '../context'
import { psRl, df, jfe } from '../style'

const ComparibleColors = ({ openComparibles }) => {
  const { tinyColor, handleChange } = usePicker()

  const analogous = tinyColor.analogous()
  const monochromatic = tinyColor.monochromatic()
  const triad = tinyColor.triad()
  const tetrad = tinyColor.tetrad()

  const handleClick = (tiny) => {
    let { r, g, b, a } = tiny.toRgb()
    handleChange(`rgba(${r},${g},${b},${a})`)
  }

  return (
    <div
      style={{
        height: openComparibles ? 216 : 0,
        width: '100%',
        transition: 'all 120ms linear',
      }}
    >
      <div
        style={{
          paddingTop: 11,
          display: openComparibles ? '' : 'none',
          ...psRl,
        }}
      >
        <div
          style={{
            textAlign: 'center',
            color: '#323136',
            fontSize: 13,
            fontWeight: 600,
            position: 'absolute',
            top: 6.5,
            left: 2,
          }}
        >
            Цветовое руководство
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#323136',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 15,
          }}
        >
            Аналогичные
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', ...df }}>
          {analogous?.map((c, key) => (
            <div
              key={key}
              style={{ width: '20%', height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#323136',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
          }}
        >
            Монохромные
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', ...df, ...jfe }}>
          {monochromatic?.map((c, key) => (
            <div
              key={key}
              style={{ width: '20%', height: 30, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#323136',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
          }}
        >
            Триадные
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', ...df, ...jfe }}>
          {triad?.map((c, key) => (
            <div
              key={key}
              style={{
                width: 'calc(100% / 3)',
                height: 28,
                background: c.toHexString(),
              }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: 'center',
            color: '#323136',
            fontSize: 12,
            fontWeight: 500,
            marginTop: 3,
          }}
        >
            Тетраедные
        </div>
        <div style={{ borderRadius: 5, overflow: 'hidden', ...df, ...jfe }}>
          {tetrad?.map((c, key) => (
            <div
              key={key}
              style={{ width: '25%', height: 28, background: c.toHexString() }}
              onClick={() => handleClick(c)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComparibleColors
