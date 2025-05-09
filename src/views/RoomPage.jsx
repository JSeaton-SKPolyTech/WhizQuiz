import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RoomPage() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [error, setError] = useState(null);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!room) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>{room.quiz[0].Question}</p>
            <p>{room.quiz[0].A}</p>
            <p>{room.quiz[0].B}</p>
            <p>{room.quiz[0].C}</p>
        </div>
    );
}

export default RoomPage;
