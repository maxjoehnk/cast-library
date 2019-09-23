import * as React from 'react';
import { useEffect, useState } from 'react';
import './toolbar.scss';

export const Toolbar = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch('/api/player')
            .then(res => res.json())
            .then(players => setDevices(players));
    }, []);

    return <div className="toolbar">
        <select>
            {devices.map(device => (<option value={device.id}>
                {device.name}
            </option>))}
        </select>
    </div>;
};