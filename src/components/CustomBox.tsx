import React, { useState } from 'react'

type BoxProps = {
    style?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    sentenceStyle?: React.CSSProperties;
    titleChildren?: string;
    paragraphChildren?: string;
    customClass?: string;
}

const defaultBoxStyle: React.CSSProperties = {
    position: 'relative',
    width: '200px',
    minHeight: '200px',
    margin: '20px 0',
    padding: '20px',
    background: 'rgb(62, 105, 144)',
    borderRadius: '5%',
    textAlign: 'center',
    transition: 'all 0.08s ease',
}

const defaultTitleStyle: React.CSSProperties = {
    paddingBottom: '15%',
}

const defaultSentenceStyle: React.CSSProperties = {
    textAlign: 'justify',
}

export default function CustomBox({style, titleStyle, sentenceStyle, titleChildren, paragraphChildren, customClass} : BoxProps) {
    const customboxStyle: React.CSSProperties = {...defaultBoxStyle, ...style};
    const customTitleStyle: React.CSSProperties = {...defaultTitleStyle, ...titleStyle};
    const customSentenceStyle: React.CSSProperties = {...defaultSentenceStyle, ...sentenceStyle};

    return (
        <div className={customClass} style={customboxStyle} > 
            <div style={customTitleStyle}> {titleChildren} </div>
            <div style={customSentenceStyle}> {paragraphChildren} </div>
        </div>
    )
}