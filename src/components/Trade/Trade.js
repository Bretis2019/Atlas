import Favourites from "./Favourites";
import News from "./News";

export default function Trade(props){
    const {favoritesData, popularData ,news} = props
    return(
        <div className={"dark:bg-black dark:divide-white dark:text-white w-[100svw] md:w-[82svw] md:h-[93svh] grid grid-cols-1 md:grid-cols-2 grid-rows-8 divide-x-2 divide-y-2 divide-black border-r-2 md:border-r-0"}>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-1"}>
                <div className={"py-7 px-4 text-5xl dark:border-white border-black"}>Trade</div>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"flex justify-between p-2"}>
                    <div className={"text-2xl"}>Popular</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <Favourites data={popularData} setStock={props.setStock}/>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-5 p-2"}>
                <div className={"flex justify-between mb-2 "}>
                    <div className={"text-4xl"}>News</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <News  news={news}/>
            </div>
            <div className={"border-t-2 dark:border-white border-black border-l-2 row-span-3"}>
                <div className={"flex justify-between p-2"}>
                    <div className={"text-2xl"}>Favourites</div>
                    <div className={"cursor-pointer rounded-full border-2 dark:border-white dark:hover:bg-gray-900 border-black px-2 py-2 hover:bg-gray-200"}>See all</div>
                </div>
                <Favourites data={favoritesData} setStock={props.setStock}/>
            </div>
        </div>
    )
}