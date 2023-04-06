import { useLocation, useParams } from "react-router-dom";
import { Personaje } from "../../models/Personaje";
import { useEffect, useState } from "react";



const Detail = ({data} : any) => {
     const location = useLocation();
     const [dataos, setDataos] = useState(null);
    
    let personaje : Personaje = useParams<any>();

    useEffect(() => {
        const queryString = new URLSearchParams(location.search);
        const jsonData = queryString.get('data');
        const parsedData = JSON.parse(jsonData as string);
        setDataos(parsedData);
        console.log(parsedData);
      }, [location]);
    
  return (
    <>
      <h1>{personaje.name}</h1>
      <p>{personaje.alterEgo}</p>
    </>
  );
};

export default Detail;