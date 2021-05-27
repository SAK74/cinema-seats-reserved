import { useSelector } from "react-redux";

export default function Summary(){
    const selected = useSelector(state => state.reservedSeats);
    const mapSelected = selected.map(val => {
        const {x, y} = val.cords;
        return <li key = {val.id}>rząd x{x}, miejsce y{y}, (id: {val.id})</li>
    });

    return (
        <>
            <h3>Twoja rezerwacje przebiegła pomyślnie</h3>
            <div>
                <ul>Wybrałeś miejsca:
                    {mapSelected}
                </ul>
            </div>
            <h4>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</h4>
        </>
    );
}