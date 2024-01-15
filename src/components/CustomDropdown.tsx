import React, { useState } from 'react'
import Select from 'react-select';

export type DropdownOption = {
    value: number;
    label: string;
}

type DropdownProps = {
    style?: React.CSSProperties;
    option: DropdownOption[];
    selectedOption: DropdownOption;
    onOptionChange: (selectedOption: DropdownOption) => void;
}

const defaultDropdownStyle: React.CSSProperties = {

}

export default function CustomDropdown({style, option, selectedOption, onOptionChange} : DropdownProps) {
    const DropdownStyle: React.CSSProperties = {...defaultDropdownStyle, ...style};

    const handleChange = (selectedOption: DropdownOption) => {
        onOptionChange(selectedOption);
    }

    return (
        <Select
            options={option}
            value={selectedOption}
            onChange={(value) => handleChange(value as DropdownOption)}
            placeholder="Select Month"
        />
    )
}