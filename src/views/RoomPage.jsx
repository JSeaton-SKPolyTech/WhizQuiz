import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

// import supabase from '../API/init';

function RoomPage() {
    const { id } = useParams();
    let timer = useRef(10);
    let first = useRef(true);
    const [count, setCount] = useState(timer.current);
    const [roomData, setRoomData] = useState(null);
    let timerCount;

    // function countDown(){
    //     if(timer.current > 0){
    //         --timer.current;
    //         setCount(timer.current);
    //     }else{
    //         clearInterval(timerCount);
    //     }
    // }

    // function updateQuestion(){
    //     let num = roomData.current_question + 1;
    //     supabase.from('room')
    //         .update({current_question: num})
    //         .eq('room_id', 1)
    //     .then(function(res, err){
    //         if(err){
    //             console.log(err);
    //         }
    //     });
    // }

    // useEffect(function(){
    //     if(first.current){
    //         first.current = false;
    //         timerCount = setInterval(countDown, 1000);

    //         supabase.from('room')
    //             .select(`*`)
    //             .eq('room_id', 1)
    //         .then(function(res){
    //             setRoomData(res.data[0]);
    //         }).catch(function(err){
    //             console.log(err);
    //         });

    //         const updateChannel = supabase.channel('question-change')
    //             .on('postgres_changes',
    //                 {
    //                     event: 'UPDATE',
    //                     schema: 'public',
    //                     table: 'room'
    //                 }, function(payload){ 
    //                     console.log('payload: ', payload);
    //                     setRoomData(payload.new);
    //                 }
    //             )
    //         .subscribe();
    //     }   
    // }, []);

    return(
        <>
            {roomData ? roomData.current_question : 'Loading...' }
            <br />
            {/* <input type='button' value='increase' onClick={updateQuestion} /> */}
        </>
    );
}

export default RoomPage;
