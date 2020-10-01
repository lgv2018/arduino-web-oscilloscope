import React from 'react'
import {
  useIsChannelOn,
  oversamplingFactorState,
  fftState0,
  fftState1
} from '../../communication/bindings'
import { Panel, ButtonToolbar, ButtonGroup, Button, Slider } from 'rsuite'
import { useRecoilState, useRecoilValue } from 'recoil'

const ButtonToolbarStyle = {
  marginTop: 10,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

export default function Channels() {
  const [oversamplingFactor, setOversamplingFactor] = useRecoilState(
    oversamplingFactorState
  )
  const [fft0, setFFT0] = useRecoilState(fftState0)
  const [fft1, setFFT1] = useRecoilState(fftState1)
  const [isChannelOn, setIsChannelOn] = useRecoilState(useIsChannelOn.send)

  return (
    <Panel header="Channels" shaded collapsible defaultExpanded>
      <ButtonToolbar style={ButtonToolbarStyle}>
        <ButtonGroup>
          {['A0', 'AS', 'A2', 'A3', 'A4', 'A5'].map((name, i) => (
            <Button
              key={i}
              appearance={isChannelOn[i] ? 'primary' : 'default'}
              size="sm"
              onClick={() => {
                const buffer = isChannelOn.slice()
                buffer[i] = !buffer[i]
                setIsChannelOn(buffer)
              }}
            >
              {name}
            </Button>
          ))}
        </ButtonGroup>
      </ButtonToolbar>
      <div style={ButtonToolbarStyle}>
        Oversample
        <Slider
          style={{ width: '50%' }}
          value={oversamplingFactor}
          onChange={setOversamplingFactor}
          max={0.99}
          min={0}
          step={0.01}
        />
      </div>

      <ButtonGroup>
        <Button
          appearance={fft0 ? 'primary' : 'default'}
          disabled={!isChannelOn[0]}
          size="sm"
          onClick={() => {
            setFFT0(!fft0)
          }}
        >
          FFT A0
        </Button>
        <Button
          appearance={fft1 ? 'primary' : 'default'}
          disabled={!isChannelOn[1]}
          size="sm"
          onClick={() => {
            setFFT1(!fft1)
          }}
        >
          FFT AS
        </Button>
      </ButtonGroup>
    </Panel>
  )
}
