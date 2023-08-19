import './App.css';
import Markets from "./components/Markets/Markets";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Trade from "./components/Trade/Trade";
import {useEffect, useState} from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Stock from "./components/Stock/Stock";
function App() {

    const[stock, setStock] = useState("");

    const [favorites, setFavorites] = useState(["AAPL","META","GOOG"]);
    const [popular, setPopular] = useState(["TSLA","AMZN","MSFT",]);
    const alphaNews = require('alphavantage')({ key: '09ZZHPRCGQG4ZXS9' });
    const [news, setNews] = useState([]);

    useEffect(()=>{

        function treatNewsData(data){
            const randomizedNews = [...data.feed];

            for (let i = randomizedNews.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [randomizedNews[i], randomizedNews[j]] = [randomizedNews[j], randomizedNews[i]];
            }

            setNews(randomizedNews);
        }

        alphaNews.experimental("NEWS_SENTIMENT").then((data) => {
                treatNewsData(data);
            });

    },[favorites,popular]);

    const [page, setPage] = useState("Markets");

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setStock("");
    };

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

    const handleStock = (ticker) => {
        setStock(ticker);
        setPage("");
    }

  return (
    <div className={"md:overflow-hidden overflow-x-hidden bg-white dark:bg-black w-[100svw] h-[100svh] no-scrollbar"}>
        <Navbar onShow={handleShow} setStock={handleStock}/>
      <div className={"flex"}>
          <Sidebar onPageChange={handlePageChange} page={page} show={show}/>
          {stock !== "" ? <Stock ticker={stock} setStock={handleStock}/> : page === "Markets" ? <Markets setStock={handleStock}/> :
              page === "Trade" ? <Trade popularData={popular} favoritesData={favorites} news={news} setStock={handleStock}/>: <Dashboard/>}
      </div>
    </div>
  );
}

export default App;
