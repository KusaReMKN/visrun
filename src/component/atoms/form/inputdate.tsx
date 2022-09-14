import React from 'react';
import { DateContext } from '../../../pages/_app';
import { useContext } from 'react';

const InputDate = () => {
    const { date, setDate } = useContext(DateContext)

    return (
        <span>
            <input type='date' id='date' className='px-5  border border-slate-800 p-1 rounded-lg' defaultValue={date} />
            <button className='leading-10 px-5 m-2 text-xl text-white transition-colors duration-150 bg-indigo-800
            rounded-lg focus:first-line shadow-xl hover:bg-indigo-300'
                onClick={() => {
                    const foo = document.getElementById('date') as HTMLInputElement;
                    setDate(foo.value);
                    if (location.pathname.indexOf("View/ViewMap") !== -1) {
                        document.getElementById("mapbutton")?.click();
                        setTimeout(() => {
                            document.getElementById("mapbutton")?.click();
                        }, 100)
                    }
                    if (location.pathname.indexOf("View/ViewChart") !== -1) {
                        document.getElementById("mapbutton")?.click();
                        setTimeout(() => {
                            document.getElementById("chartbutton")?.click();
                        }, 10)
                        setTimeout(() => {
                            document.getElementById("chartbutton")?.click();
                        }, 50)
                        setTimeout(() => {
                            document.getElementById("chartbutton")?.click();
                        }, 500)
                    }
                }}>
                この日を表示
            </button>
        </span >

    )
}
export default InputDate;