import "./News.css"

export default function News(props){
    const {news} = props;

    const Elements = news.map(item => {
        const url  = item.banner_image ? item.banner_image : "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
        return (
            <a href={item.url} target={"_blank"} rel="noreferrer" className={"my-8"} key={item.url}>
                <div className={"flex gap-x-4"} >
                    <img src={url} alt={""} className={"w-[80px] h-[80px] object-cover rounded-xl border-2 border-black dark:border-white"} loading="lazy"/>
                    <div className={"cutoff-text"}>{item.title}</div>
                </div>
            </a>
        )
    })

    return(
        <div className={"max-h-[530px] overflow-y-scroll flex flex-col"}>
            {Elements}
        </div>
    )
}