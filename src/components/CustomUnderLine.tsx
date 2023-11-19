import React from 'react'

type underLineProps = {
  containerStyle?: React.CSSProperties;
  middleStyle?: React.CSSProperties;
  edgeStyle?: React.CSSProperties;
}

const defaultContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '0.1fr 0.8fr 0.1fr',
}

const defaultMiddleStyle: React.CSSProperties = {
  borderBottom: "2px solid black",

}

export default function CustomUnderLine({containerStyle, middleStyle, edgeStyle} : underLineProps) {
  const customContainerStyle = {...defaultContainerStyle, ...containerStyle};
  const customMiddleStyle = {...defaultMiddleStyle, ...middleStyle};

  return (
    <div style={customContainerStyle}>
      <div style={edgeStyle}/>
      <div style={customMiddleStyle}/>
      <div style={edgeStyle}/>
    </div> 
  )
}