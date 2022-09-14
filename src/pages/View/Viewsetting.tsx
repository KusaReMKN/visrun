import React, { ChangeEvent, useState } from 'react';
import _BaseGuestLayout from '../../layouts/_baseGuestLayout';


type formData = {
    bodyWeight: number;
};

function Setting() {

    const [formData, setFormData] = useState<formData>({
        bodyWeight: 0
    });
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prevValues => {
            return { ...prevValues, [e.target.name]: e.target.value }
        });
    }

    return (
        <_BaseGuestLayout>
            <div>
                <h1 className='text-9xl text-center text-red-500'>体重を設定してください</h1>
                <div className='rounded px-4 py-2'>
                    <label className='text-left text-slate-900 text-3xl' htmlFor='bodyWeight'>体重</label>
                    <input
                        className='bg-slate-400 rounded px-4 py-2'
                        type='number'
                        id='bodyWeight'
                        name='bodyWeight'
                        onChange={changeHandler}
                        value={formData.bodyWeight}
                    />
                </div>
            </div>
            <div>
                <button className='bg-slate-200 text-white rounded px-4 py-2'>
                    入力
                </button>
            </div>
        </_BaseGuestLayout>
    )
}
export default Setting;