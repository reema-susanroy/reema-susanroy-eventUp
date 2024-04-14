import { useEffect, useState } from "react";
import FilteredEvent from "./FilteredEvent";

function Upcoming({events}){
    const [successFilter, setSuccessFilter]=useState(false);
    const [filteredEvents, setFilteredEvents] = useState();
    const currentDate = new Date();
    const utcCurrentString = currentDate.toISOString();

    useEffect(() =>{
        const upcoming = events.filter(event => {
            const eventDate = new Date(event.date);
            const utcString = eventDate.toISOString();
            return utcString > utcCurrentString;    
        });
        setFilteredEvents(upcoming);
        setSuccessFilter(upcoming.length > 0);
    },[])
    
    return(
        <>
        <h3>Upcoming Events</h3>
        {successFilter &&
            (filteredEvents.map((events)=> (
                <FilteredEvent key={events.id} events={events}/>

            )))
        }
        </>
    )
}
export default Upcoming;