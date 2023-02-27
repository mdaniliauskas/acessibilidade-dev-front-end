import {useState, useEffect} from "react";

const useFetch = (url, option = {}) =>{

  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    fetch(url, option)
    .then(res =>{
      if(!res.ok)
        throw Error('Deu ruim na requisição dos dados!');
      return res.json();
    })  
    .then(data =>{
      setTimeout(() => {
        setData(data);
        setIsPending(false);
        setError(null); 
      }, 5000);
      
    })
    .catch(err =>{
      setIsPending(false);
      setError(err.message)
    })
  }, [url])

  return {data, isPending, error};

};

export default useFetch;

// fetch('http://localhost:8000/empresas', {
//   method: 'POST',
//   headers: {"Content-Type":"application/json"},
//   body: JSON.stringify(empresa)
// })