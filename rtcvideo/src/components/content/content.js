import React from 'react';
import './content.css'
import { useNavigate } from 'react-router-dom';

export function Content({ nameCam, location, latitude, longitude, camId }) {
    const nav = useNavigate()
    return (

            <table className='tabl'>
                <tbody>
                    <tr>
                        <td className='nameCam'>{nameCam}</td>
                        <td className='location'>{location}</td>
                        <td className='latitude'>{latitude}</td>
                        <td className='longitude'>{longitude}</td>
                        <td className='click' onClick={() => nav(`/hls/${camId}`)}>Смотреть</td>
                        <td className='edit' onClick={() => nav(`/editor/${camId}`)}>✏</td>
                    </tr>
                </tbody>
            </table>

    );
}