import axios from 'axios';
import React from 'react';

const sync = () => {
    axios.get('http://localhost:3000/api/matunaga/')
        .then(res => {
            console.log('げっっとが飛んだよ')
        })
        .catch((err) => {
            console.log(err);
        })
}

const _Doukibutton = () => {
    return (
        <button onClick={(e) => {
            sync();
        }}
        >同期
        </button>
    )
}
export default _Doukibutton;