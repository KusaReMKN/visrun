import Link from 'next/link';
import React from 'react';
import { _Basebutton } from '../atoms/button/_Basebutton';
import _Doukibutton from '../atoms/button/_Doukibutton';
import InputDate from '../atoms/form/inputdate';


export const GuestHeader = () => {
    return (
        <header className="relative w-full border-y-2 shadow-lg z-10">
            <nav className=''>
                <ul className='flex flex-row flex-wrap justify-around '>
                    <li className='leading-10 px-5 m-2 text-lg text-white transition-colors duration-150 bg-indigo-800
                             rounded-lg focus:first-line shadow-lg hover:bg-indigo-300'>
                        <Link href='../../View/ViewMap'>
                            <a id="mapbutton">MAP</a>
                        </Link>
                    </li>
                    {/* <li className='leading-10 px-5 m-2 text-lg text-white transition-colors duration-150 bg-indigo-800
                             rounded-lg focus:first-line shadow-lg hover:bg-indigo-300'>
                        <Link href='../../View/ViewtestMap'>
                            <a>テスト用MAP</a>
                        </Link>
                    </li> */}
                    <li className='leading-10 px-5 m-2 text-lg text-white transition-colors duration-150 bg-indigo-800
                             rounded-lg focus:first-line shadow-lg hover:bg-indigo-300'>
                        <Link href='../../View/ViewChart'>
                            <a id="chartbutton">グラフ</a>
                        </Link>
                    </li >
                    <li className='leading-10 px-5 m-2 text-lg text-white transition-colors duration-150 bg-indigo-800
                             rounded-lg focus:first-line shadow-lg hover:bg-indigo-300'>
                        <_Doukibutton />
                    </li>
                    <li className=''>
                        <InputDate />
                    </li>
                </ul>
            </nav>
        </header >
    )
}