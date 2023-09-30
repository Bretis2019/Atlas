import './App.css';
import {useEffect, useState} from "react";
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
import {Route, Routes, useLocation} from "react-router-dom";
function App() {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(prevState => !prevState);
    };

    const location = useLocation();
    const [page, setPage] = useState(location.pathname);
    useEffect(() => {
        setPage(location.pathname)
    }, [location]);

  return (
      <ErrorBoundary>
          {localStorage.getItem("token") === "" || page === "/Atlas/landing" ?  (<Landing/>) : (<div className={"md:overflow-hidden overflow-x-hidden bg-white dark:bg-black w-[100svw] h-[100svh] no-scrollbar"}>
              <Navbar onShow={handleShow}/>
              <div className={"flex"}>
                  <Sidebar show={show} onPageChage={handleShow}/>
                  <Routes>
                      <Route path="/Atlas/" element={<Markets/>} />
                      <Route path="/Atlas/markets" element={<Markets/>} />
                      <Route path="/Atlas/trade" element={<Trade/>} />
                      <Route path="/Atlas/profile" element={<Profile/>} />
                      <Route path="/Atlas/dashboard" element={<Dashboard/>} />
                      <Route path="/Atlas/order/:ticker" element={<Order/>} />
                      <Route path="/Atlas/stock/:ticker" element={<Stock/>} />
                  </Routes>
              </div>
          </div>)}
      </ErrorBoundary>
  );
}

export default App;
