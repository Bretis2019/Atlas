import './App.css';
import Markets from "./components/Markets/Markets";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Trade from "./components/Trade/Trade";
import {useEffect, useState} from "react";
import Papa from "papaparse";
import Dashboard from "./components/Dashboard/Dashboard";
function App() {

    const alpha = require('alphavantage')({ key: 'WHISX77VWA1Z3PBH' });

    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [traded, setTraded] = useState([]);
    const [sp, setSp] = useState([]);
    const [dji, setDji] = useState([]);
    const [calendar, setCalendar] = useState([]);

    useEffect(() => {
        function dataTreatMost(data){
            setGainers(data.top_gainers);
            setLosers(data.top_losers);
            setTraded(data.most_actively_traded);
        }

        function dataTreatSpy(data){
            const timeSeriesDaily = data['Time Series (Daily)'];
            const timeSeriesKeys = Object.keys(timeSeriesDaily);
            const lastKey = timeSeriesKeys[0];
            const lastItem = timeSeriesDaily[lastKey];

            const diff = lastItem["4. close"] - lastItem["1. open"];
            const diffpercentage = (diff * 100) / lastItem["4. close"]

            setSp([Math.round(diffpercentage * 100) / 100, lastItem["4. close"]]);
        }

        function dataTreatDIA(data){
            const timeSeriesDaily = data['Time Series (Daily)'];
            const timeSeriesKeys = Object.keys(timeSeriesDaily);
            const lastKey = timeSeriesKeys[0];
            const lastItem = timeSeriesDaily[lastKey];

            const diff = lastItem["4. close"] - lastItem["1. open"];
            const diffpercentage = (diff * 100) / lastItem["4. close"]

            setDji([Math.round(diffpercentage * 100) / 100, lastItem["4. close"]]);
        }
        alpha.experimental("TOP_GAINERS_LOSERS").then((data) => {
                dataTreatMost(data);
            });
        alpha.data.daily(`spy`).then((data) => {
                dataTreatSpy(data);
            });
        alpha.data.daily(`DIA`).then((data) => {
                dataTreatDIA(data);
            });
    },[])

    useEffect(() => {
        const fetchData = () => {
            fetch(
                "https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=1month&apikey=WHISX77VWA1Z3PBH"
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.text();
                })
                .then((data) => {
                    const parsedData = Papa.parse(data, { header: true }).data;
                    function compareDates(a, b) {
                        const dateA = new Date(a.reportDate);
                        const dateB = new Date(b.reportDate);
                        return dateA - dateB;
                    }
                    parsedData.sort(compareDates);
                    const namesArray = [];

                    for (let i = 0; i < 25; i++) {
                        namesArray.push(parsedData[i]);
                    }
                    setCalendar(namesArray);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchData();
    }, []);

    const [favorites, setFavorites] = useState(["AAPL","META","GOOG"]);
    const [popular, setPopular] = useState(["TSLA","AMZN","MSFT",]);
    const [popularData, setPopularData] = useState("");
    const [favoritesData, setFavoritesData] = useState("");
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

            const urlfav = `https://financialmodelingprep.com/api/v3/quote/${favorites.join(",")}?apikey=d371b155d7d8049a82dcd38cd1494d99`;

            fetch(urlfav)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setFavoritesData(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
            const url = `https://financialmodelingprep.com/api/v3/quote/${popular.join(",")}?apikey=d371b155d7d8049a82dcd38cd1494d99`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    setPopularData(data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });

    },[favorites,popular]);

    const [page, setPage] = useState("Markets");

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

  return (
    <div className={"md:overflow-hidden bg-white dark:bg-black"}>
        <Navbar onShow={handleShow} />
      <div className={"flex"}>
          <Sidebar onPageChange={handlePageChange} page={page} show={show}/>
          {page === "Markets" ? <Markets gainers={gainers} losers={losers} traded={traded} sp={sp} dji={dji} calendar={calendar}/> :
              page === "Trade" ? <Trade popularData={popularData} favoritesData={favoritesData} news={news}/>: <Dashboard sp={sp}/>}
      </div>
    </div>
  );
}

export default App;
