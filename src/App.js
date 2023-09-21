import './App.css';
import {useState} from "react";
import Markets from "./components/Markets/Markets";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Trade from "./components/Trade/Trade";
import Dashboard from "./components/Dashboard/Dashboard";
import Stock from "./components/Stock/Stock";
import Order from "./components/Order/Order";
import Landing from "./components/Landing/Landing";
import Profile from "./components/Profile/Profile";
import ErrorBoundary from "./ErrorBoundary";
function App() {

    const[stock, setStock] = useState("");
    const [page, setPage] = useState(localStorage.getItem("token") && localStorage.getItem("token").trim() !== "" ? "Markets" : "Landing");

    const handlePageChange = (newPage) => {
        setPage(newPage);
        if(newPage !== "Order"){
            setStock("");
        }
        if(show){handleShow();}
    };

    const handleStock = (ticker) => {
        setStock(ticker);
        if(ticker === ""){
            setPage("Markets");
        }else{
            setPage("");
        }
    }

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

    function display(page){
        if(stock !== "" && page !== "Order"){
            return <Stock ticker={stock} setStock={handleStock} onPageChange={handlePageChange}/>
        }
        switch(page){
            case "Order":
                return <Order ticker={stock}/>
            case "Markets":
                return <Markets setStock={handleStock} onPageChange={handlePageChange}/>;
            case "Trade":
                return <Trade setStock={handleStock}/>
            case "Profile":
                return <Profile setStock={handleStock}/>
            case "Dashboard":
                return <Dashboard setStock={handleStock}/>
            default:
                return <Dashboard />
        }
    }

  return (
      <ErrorBoundary>
          {page === "Landing" ? (<Landing onPageChange={handlePageChange}/>) : (<div className={"md:overflow-hidden overflow-x-hidden bg-white dark:bg-black w-[100svw] h-[100svh] no-scrollbar"}>
              <Navbar onShow={handleShow} setStock={handleStock}/>
              <div className={"flex"}>
                  <Sidebar onPageChange={handlePageChange} page={page} show={show}/>
                  {display(page)}
              </div>
          </div>)}
      </ErrorBoundary>
  );
}

export default App;
