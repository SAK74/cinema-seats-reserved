import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeats } from "./reservSlice";
import ShowHall from "./showHall";

export function FetchRequest(){
    const status = useSelector(state => state.status);
    const error = useSelector(state => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'iddle'){
            dispatch(fetchSeats())
        }
    }, [dispatch, status]);
    
    if (status === 'loading') return <div className = "message">... ładuje </div>
    else if (status === 'failed') return <div className = "message">{error}</div>
    else if (status === 'complete') return <ShowHall/>;
    return null;
}