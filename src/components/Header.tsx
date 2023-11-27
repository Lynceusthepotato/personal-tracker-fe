import React from 'react'

type HeaderProps = {
    style?: React.CSSProperties;
    children?: string | number;
}

const defaultHeaderStyle: React.CSSProperties = {
    color: 'black',
    padding: '10px',
    fontSize: '1.5rem',
    fontWeight: '700',
    textAlign: 'center',
}

export default function Header({style, children} : HeaderProps) {
    const customHeaderStyle = {...defaultHeaderStyle, ...style};
    return <div style={customHeaderStyle}> {children} </div>
}