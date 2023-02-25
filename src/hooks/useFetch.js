import {useState, useEffect} from "react";

const useFetch = (url, option = {}) =>{

  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch(url, option)
    .then(res =>{
      if(!res.ok)
        throw Error('Deu ruim!');
      return res.json();
    })  
    .then(data =>{
      setData(data);
    })
    .catch(err =>{
      console.error(err);
    })

    //POST
  }, [url])

  return {data};

};

export default useFetch;