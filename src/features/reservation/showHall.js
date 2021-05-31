import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useParams} from "react-router-dom";
import { submit } from "./reservSlice";

export default function ShowHall(){    
    const seats = useSelector(state => state.seats);
    const dispatch = useDispatch();
    

    let {amount, near} = useParams();
    amount = Number(amount);
    near = (near === 'true');

    const [selected, setSelected] = useState([]);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = () => {
        const map = selected.map(val => {
            const {cords} = seats.find(item => item.id === val);
            return {id: val, cords};
        });
        dispatch(submit(map));   
        setTimeout(() => setRedirect(true), 1200);
    }

    const handleClick = ev => {
        const value = ev.target.getAttribute('value');
        setSelected(prev => {
            const temp = prev.slice();
            temp.shift();
            temp.push(value);
            return temp;
        });
    }
    
    // formatowanie -------------------------------------------------------------
    const arr = [[]];
    let x = 0;
    for (let i = 0; i< seats.length; i++){

        if (seats[i].cords.x !== x) arr.push([]);
        x = seats[i].cords.x;
        const y = seats[i].cords.y;        
        arr[x][y] = {id: seats[i].id, reserved: seats[i].reserved, y: y};
    }

    // Proponowane miejsca ---------------------------------------------------------
    function searchRow(quant, row){            
            const result = Array(quant);
            const temp = arr[row].filter(value => !value.reserved);
            if(temp.length < quant) return false;
            for (let startCell = 0; startCell <= temp.length - quant; startCell++){
                let isNear = true;
                for(let x = 0; x < quant-1; x++){
                    if((temp[startCell + 1 + x].y - temp[startCell + x].y) !== 1) {isNear = false; break;}
                    result[x] = temp[startCell + x].id;
                    result[x+1] = temp[startCell + 1 + x].id;
                }
                if (isNear) return result;
            }        
                return false;
    }

    function searchGlobal(quant){
        let temp = [];
        for (let i = 0; i < arr.length; i++){
            temp = temp.concat(arr[i].filter(val => !val.reserved).map(val => val.id));
        }
        return temp.slice(0, quant);
    }

    useEffect(() => {
        setSelected(() => {
            if (near) {
                for (let i = arr.length-1; i >=0; i--){
                    const tempRes = searchRow(amount, i);
                    if (tempRes) return tempRes;
                } 
            }
            return searchGlobal(amount);
        });
    }, [amount, near]);

    //  Wyświetlanie sali -----------------------------------------------------------

    const hall = [];
    for (let i = 0; i< arr.length; i++){
        let row = [];
        for (let j = 0; j<arr[i].length; j++){
            let cellClass = '';
            if (!arr[i][j]) cellClass = 'empty'
            else if (arr[i][j].reserved) cellClass = 'reserved'
            else cellClass = selected.some(elem => elem === arr[i][j].id) ? 'selected' : 'free';
            const value = arr[i][j] ? arr[i][j].id : Math.random();

            row[j] = <td className = {cellClass} onClick = {cellClass === 'free' ? handleClick : undefined} 
             value = {value} key = {value}></td>;
        } 
        hall.push(<tr key = {i}>{row}</tr>);               
    }

    return (
        <div>
            <div className = 'mainField'> Wybierz miejsca:</div>
            <div className = "mainTable">
                <table>
                    <tbody>
                        {hall}
                    </tbody>
                </table>
            </div>
            <div className = "footer">
                <span className = "legend free"></span> Miejsca dostępne
                <span className = "legend reserved"></span> Miejsca zarezerwowane
                <span className = "legend selected"></span> Twój wybór 
            </div>
            <div className = "navbar">
                <Link to = '/' className = 'select-button'>Wroć do poprzedniej strony</Link>
                <button onClick = {handleSubmit} className = 'select-button'>Zatwierdź</button>
            </div>
            {redirect && <Redirect to = '/summary'/>}                
        </div>
    )
}

