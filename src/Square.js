import React from 'react';
import './App.css';

export function Square (props) {
        return (
            <button className="square" name={props.name} onClick={props.onClick}>
                {props.value}
            </button>
        );
}
