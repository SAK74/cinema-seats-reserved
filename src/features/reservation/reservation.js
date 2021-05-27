import { useState } from "react";
import { Link } from "react-router-dom";

export default function Reservation() {
    const [amount, setAmount]  = useState();
    const [near, setNear] = useState(false);

    const handleChange = ev => {
        switch (ev.target.type){
            case 'checkbox' : setNear(!near); break;
            case 'number' : setAmount(ev.target.value); break;
        }
    }

    return(
        <div className = 'mainField'>
            <fieldset>
                <label htmlFor = 'seats count'>Liczba miejsc: &nbsp;</label>
                <input id = 'seats counts' type = "number" value = {amount} onChange = {handleChange}/> <br/><br/>
                <input checked = {near} id = 'check' type = "checkbox" onChange = {handleChange}/>
                <label htmlFor = 'check'>&nbsp; Czy mają być obok siebie</label><br/><br/>
                {amount && <Link className = 'select-button' to = {`/show/${amount}/${near}`}>Wybierz miejsca</Link>}
            </fieldset>
        </div>
    );
}