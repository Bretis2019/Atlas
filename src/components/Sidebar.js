export default function Sidebar(props){

    const {page, show} = props;

    function handleTradeClick(name){
        props.onPageChange(name);
    }

    return(
        <div className={`${show ? 'absolute': 'hidden'} bg-black w-fit z-40 md:flex border-t-2 border-black dark:bg-black dark:text-white dark:border-white md:w-[18svw] h-[93svh] flex-col justify-between`}>
            <div className={"flex flex-col"}>
                <div onClick={() => {handleTradeClick("Dashboard")}} className={`${page === "Dashboard" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-b-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="32px" height="32px" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path className={"dark:stroke-white"} d="M14.5 19.5V12.5M10.5 12.5V5.5M5.5 12.5H19.5M5.5 19.5H19.5V5.5H5.5V19.5Z" stroke="#000000" strokeWidth="1.2" /> </g></svg>My Dashboard</div>
                <div onClick={() => {handleTradeClick("Markets")}} className={` ${page === "Markets" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>monitor-trend</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="Combined-Shape" fill="#000000" transform="translate(64.000000, 64.000000)"> <path className={"dark:fill-white"} d="M42.6666667,1.42108547e-14 L42.4939709,343.395437 L384,341.333333 L384,384 L1.42108547e-14,384 L0.172695782,1.42108547e-14 L42.6666667,1.42108547e-14 Z M384,64 L384,192 L341.333333,192 L341.333055,135.367 L233.893601,232.06349 L181.333333,179.52 L79.0849447,281.751611 L48.9150553,251.581722 L181.333333,119.163444 L235.434667,173.248 L309.438055,106.666 L256,106.666667 L256,64 L384,64 Z"> </path> </g> </g> </g></svg>Markets</div>
                <div onClick={() => {handleTradeClick("Trade")}} className={` ${page === "Trade" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>swap-left-right</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="drop" fill="#000000" transform="translate(42.666667, 42.666667)"> <path className={"dark:fill-white"} d="M298.666667,170.666667 L426.666667,298.666667 L298.666667,426.666667 L268.373333,396.373333 L344.96,320 L170.666667,320 L170.666667,277.333333 L344.96,277.333333 L268.373333,200.96 L298.666667,170.666667 Z M128,7.10542736e-15 L158.293333,30.2933333 L81.7066667,106.666667 L256,106.666667 L256,149.333333 L81.7066667,149.333333 L158.293333,225.706667 L128,256 L-2.13162821e-14,128 L128,7.10542736e-15 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>Trade</div>
                <div onClick={() => {handleTradeClick("Wallet")}} className={` ${page === "Wallet" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path className={"dark:fill-white"} d="M917.52 369.86L594.24 98.59l-98.62 117.52-181.15-67.54-124.33 290.24h-80.28V914h804.57V438.81h-54.78l57.87-68.95zM603.24 201.62l211.25 177.23-50.33 59.96H404.21l199.03-237.19z m-248.99 39.84l91.47 34.1-136.98 163.25h-39.01l84.52-197.35z m487.04 599.39H183.01v-328.9H841.3v328.9z" fill="#000000" /><path d="M621.68 640.96h146.29v73.14H621.68z" fill="#000000" /></g></svg>Wallet</div>
                <div onClick={() => {handleTradeClick("Support")}} className={` ${page === "Support" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>support</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="support" fill="#000000" transform="translate(42.666667, 42.666667)"> <path className={"dark:fill-white"} d="M379.734355,174.506667 C373.121022,106.666667 333.014355,-2.13162821e-14 209.067688,-2.13162821e-14 C85.1210217,-2.13162821e-14 45.014355,106.666667 38.4010217,174.506667 C15.2012632,183.311569 -0.101643453,205.585799 0.000508304259,230.4 L0.000508304259,260.266667 C0.000508304259,293.256475 26.7445463,320 59.734355,320 C92.7241638,320 119.467688,293.256475 119.467688,260.266667 L119.467688,230.4 C119.360431,206.121456 104.619564,184.304973 82.134355,175.146667 C86.4010217,135.893333 107.307688,42.6666667 209.067688,42.6666667 C310.827688,42.6666667 331.521022,135.893333 335.787688,175.146667 C313.347976,184.324806 298.68156,206.155851 298.667688,230.4 L298.667688,260.266667 C298.760356,283.199651 311.928618,304.070103 332.587688,314.026667 C323.627688,330.88 300.801022,353.706667 244.694355,360.533333 C233.478863,343.50282 211.780225,336.789048 192.906491,344.509658 C174.032757,352.230268 163.260418,372.226826 167.196286,392.235189 C171.132153,412.243552 188.675885,426.666667 209.067688,426.666667 C225.181549,426.577424 239.870491,417.417465 247.041022,402.986667 C338.561022,392.533333 367.787688,345.386667 376.961022,317.653333 C401.778455,309.61433 418.468885,286.351502 418.134355,260.266667 L418.134355,230.4 C418.23702,205.585799 402.934114,183.311569 379.734355,174.506667 Z M76.8010217,260.266667 C76.8010217,269.692326 69.1600148,277.333333 59.734355,277.333333 C50.3086953,277.333333 42.6676884,269.692326 42.6676884,260.266667 L42.6676884,230.4 C42.6676884,224.302667 45.9205765,218.668499 51.2010216,215.619833 C56.4814667,212.571166 62.9872434,212.571166 68.2676885,215.619833 C73.5481336,218.668499 76.8010217,224.302667 76.8010217,230.4 L76.8010217,260.266667 Z M341.334355,230.4 C341.334355,220.97434 348.975362,213.333333 358.401022,213.333333 C367.826681,213.333333 375.467688,220.97434 375.467688,230.4 L375.467688,260.266667 C375.467688,269.692326 367.826681,277.333333 358.401022,277.333333 C348.975362,277.333333 341.334355,269.692326 341.334355,260.266667 L341.334355,230.4 Z"> </path> </g> </g> </g></svg>Support</div>
                <div onClick={() => {handleTradeClick("Settings")}} className={` ${page === "Settings" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="28px" height="28px" fill="#000000" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><title>ionicons-v5-q</title><path className={"dark:fill-white"} d="M256,176a80,80,0,1,0,80,80A80.24,80.24,0,0,0,256,176Zm172.72,80a165.53,165.53,0,0,1-1.64,22.34l48.69,38.12a11.59,11.59,0,0,1,2.63,14.78l-46.06,79.52a11.64,11.64,0,0,1-14.14,4.93l-57.25-23a176.56,176.56,0,0,1-38.82,22.67l-8.56,60.78A11.93,11.93,0,0,1,302.06,486H209.94a12,12,0,0,1-11.51-9.53l-8.56-60.78A169.3,169.3,0,0,1,151.05,393L93.8,416a11.64,11.64,0,0,1-14.14-4.92L33.6,331.57a11.59,11.59,0,0,1,2.63-14.78l48.69-38.12A174.58,174.58,0,0,1,83.28,256a165.53,165.53,0,0,1,1.64-22.34L36.23,195.54a11.59,11.59,0,0,1-2.63-14.78l46.06-79.52A11.64,11.64,0,0,1,93.8,96.31l57.25,23a176.56,176.56,0,0,1,38.82-22.67l8.56-60.78A11.93,11.93,0,0,1,209.94,26h92.12a12,12,0,0,1,11.51,9.53l8.56,60.78A169.3,169.3,0,0,1,361,119L418.2,96a11.64,11.64,0,0,1,14.14,4.92l46.06,79.52a11.59,11.59,0,0,1-2.63,14.78l-48.69,38.12A174.58,174.58,0,0,1,428.72,256Z" /></g></svg>Settings</div>
                <div onClick={() => {handleTradeClick("Profile")}} className={` ${page === "Profile" ? 'dark:border-white bg-green-300 border-black dark:bg-green-900':'border-white'} cursor-pointer text-xl flex items-center gap-2 pl-2 py-6 md:hover:bg-gray-200 border-y-2 md:hover:border-black dark:border-black dark:md:hover:border-white dark:md:hover:bg-gray-900`}><svg width="30px" height="30px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <title>user</title> <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"> <g id="icon" fill="#000000" transform="translate(85.333333, 42.666667)"> <path className={"dark:fill-white"} d="M170.666667,170.666667 C217.794965,170.666667 256,132.461632 256,85.3333333 C256,38.2050347 217.794965,7.10542736e-15 170.666667,7.10542736e-15 C123.538368,7.10542736e-15 85.3333333,38.2050347 85.3333333,85.3333333 C85.3333333,132.461632 123.538368,170.666667 170.666667,170.666667 Z M170.666667,42.6666667 C194.230816,42.6666667 213.333333,61.769184 213.333333,85.3333333 C213.333333,108.897483 194.230816,128 170.666667,128 C147.102517,128 128,108.897483 128,85.3333333 C128,61.769184 147.102517,42.6666667 170.666667,42.6666667 Z M213.333333,213.333333 L128,213.333333 C57.307552,213.333333 1.42108547e-14,270.640885 1.42108547e-14,341.333333 L1.42108547e-14,426.666667 L341.333333,426.666667 L341.333333,341.333333 C341.333333,270.640885 284.025781,213.333333 213.333333,213.333333 Z M298.666667,384 L42.6666667,384 L42.6666667,341.333333 C42.6666667,294.205035 80.8717013,256 128,256 L213.333333,256 C260.461632,256 298.666667,294.205035 298.666667,341.333333 L298.666667,384 Z" id="user"> </path> </g> </g> </g></svg>Profile</div>
            </div>
            <div className={"cursor-pointer py-6 text-xl pl-2 border-t-2 border-black dark:border-white flex items-center gap-2 md:hover:bg-gray-200 dark:md:hover:bg-gray-900"}><svg fill="#000000" height="30px" width="30px" version="1.1" id="XMLID_173_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 26" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g id="logout"> <g> <path  className={"dark:fill-white"} d="M15,24H0V2h15v8h-2V4H2v18h11v-6h2V24z M18.4,18.7L17,17.3l3.3-3.3H5v-2h15.3L17,8.7l1.4-1.4L24,13L18.4,18.7z" /> </g> </g> </g></svg>Logout</div>
        </div>
    )
}