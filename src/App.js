import { useEffect, useState } from "react";
import "./App.css";
import cs from "./images/cs.png";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  let end_point = `${process.env.REACT_APP_BASE_URL}/content_types/${process.env.REACT_APP_CONTENT_TYPE_UID}/entries?environment=${process.env.REACT_APP_ENVIRONMENT}&locale=en-us&include_fallback=true&include_branch=false`;

  useEffect(() => {
    axios
      .get(end_point, {
        headers: {
          api_key: process.env.REACT_APP_API_KEY,
          access_token: process.env.REACT_APP_ACCESS_TOKEN,
        },
      })
      .then(
        (response) => {
          console.log(response.data.entries[0]);
          setData(response.data.entries[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [end_point]);

  return (
    <>
      {data.length !== 0 ? (
        <div>
          <nav>
            <div className="left">
              <img src={cs} alt="" />
              <h1 id="title">{data.header.brand.title}</h1>
            </div>
            <ul>
              <li>home</li>
              <li>about</li>
              <li>contact</li>
            </ul>
          </nav>
          <div className="main">
            <img src={data.main.main_banner.url} alt="..." id="mainimg" />
            <p id="mainp">{data.main.main_text}</p>
          </div>

          <div className="main2">
            <p id="mainp2">{data.main2.main2_text}</p>
            <img src={data.main2.main2_banner.url} alt="..." id="mainimg2" />
          </div>
          <footer id="footer">{data.footer.footer_content}</footer>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
export default App;
