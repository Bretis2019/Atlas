import './App.css';
import Markets from "./components/Markets/Markets";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Trade from "./components/Trade/Trade";
import {useState} from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Stock from "./components/Stock/Stock";
function App() {

    const[stock, setStock] = useState("");
    const [favorites, setFavorites] = useState(["AAPL","META","GOOG"]);
    const [popular, setPopular] = useState(["TSLA","AMZN","MSFT",]);
    const [page, setPage] = useState("Markets");

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setStock("");
    };

    const handleStock = (ticker) => {
        setStock(ticker);
        setPage("");
    }

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

  return (
    <div className={"md:overflow-hidden overflow-x-hidden bg-white dark:bg-black w-[100svw] h-[100svh] no-scrollbar"}>
        <Navbar onShow={handleShow} setStock={handleStock}/>
      <div className={"flex"}>
          <Sidebar onPageChange={handlePageChange} page={page} show={show}/>
          {stock !== "" ? <Stock ticker={stock} setStock={handleStock}/> : page === "Markets" ? <Markets setStock={handleStock}/> :
              page === "Trade" ? <Trade popularData={popular} favoritesData={favorites} setStock={handleStock}/>: <Dashboard/>}
      </div>
    </div>
  );
}

export default App;
