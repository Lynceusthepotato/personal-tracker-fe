import React from 'react'

type ButtonProps = {
    style?: React.CSSProperties;
    onClick?: () => void;
    children: React.ReactNode;
}

const defaultButtonStyle: React.CSSProperties = {
    display: 'grid',
    background: 'rgb(0, 0, 0)',
    color: 'white',
    borderRadius: '20px',
    padding: '10px',
    margin: '10px',
    border: '2px solid black',
    justifyItems: 'center',
    cursor:'pointer',
    transition: 'all 0.08s ease',
}

export default function CustomButton ({style, onClick, children} : ButtonProps) {
    const buttonStyle: React.CSSProperties = { ...defaultButtonStyle, ...style };
    return <div onClick={onClick} style={buttonStyle} > {children} </div>
}