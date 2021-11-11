import './App.css';
import axios from 'axios';
import React,{useEffect,useState, useRef} from 'react'
import { GiphyFetch } from "@giphy/js-fetch-api";
import {
  Carousel,
} from "@giphy/react-components";


function App() {
  const giphyFetch = new GiphyFetch("zkhcohQVCG9TaqEsRr88ipZPXtPufay7");
  const [text, setText] = useState("");
  const [keyword, setKeyword] = useState("");

  const fetchGifs = (offset) => {
    return giphyFetch.search(keyword, { offset, limit: 10 });
  };

  const isMounted = React.useRef(true);
  
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");


  useEffect(() => {
    axios.get("http://13.235.145.237:8099/designer/api/object-class/all/1")
    .then((e) => {
      setData(e.data.data)
    })
  }, [])

  return (
    <div className="App">
      <h1>Challenge 2 - Dynamic table</h1>
      <table >
        <thead>
          <tr>
            <td>ID</td>
            <td>className</td>
            <td>entityName</td>
            <td>securityEnabled</td>
            <td>systemClass</td>
            <td>counterName</td>
          </tr>
        </thead>
        <tbody>
          {data && data.map((e) =>{return(
            <tr>
                <td>{e.id}</td>
                <td>{e.className}</td>
                <td>{e.entityName}</td>
                <td>{e.securityEnabled ? "true":"false"}</td>
                <td>{e.systemClass ? "true":"false"}</td>
                <td>{e.counterName}</td>
              </tr>
          )})
        }
        </tbody>
      </table>

      <hr></hr>


      <h1>Challenge 3 - Search GIF</h1>
       <input
          value={text}
          type="text"
          onChange={e => setText(e.target.value)}
        />
        <button onClick={e => setKeyword(text)}>Send</button>

      <h4>search results</h4>
            <Carousel
              key={keyword}
              fetchGifs={() => fetchGifs(5)}
              gifHeight={200}
              gutter={6}
            />
    </div>
  );
}

export default App;
