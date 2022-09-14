import React from 'react';


export const _Basebutton = (props: any) => {
    return (
        <button
            className='bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-lg'
            onClick={(e) => {

            }}
        >
            {props.text}
        </button>
    )
}
export default _Basebutton;