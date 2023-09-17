export default function Error(props){
    const {message} = props;
    return (
        <div className={"w-[100svw] h-[100svh] bg-white dark:bg-black dark:text-white border-2 border-black dark:border-white flex flex-col text-center items-center justify-center"}>
            <h1 className={"text-5xl"}>An error occurred.</h1>
            <p className={"text-3xl"}>Sorry, something went wrong. Please try again later.</p>
            <p className={"text-xl"}>{JSON.stringify(message)}</p>
        </div>
    )
}