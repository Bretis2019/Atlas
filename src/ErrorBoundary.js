import {useEffect, useState} from "react";
import Error from "./Error";

const useErrorBoundary = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleWindowError = (event) => {
            setError(event.error || new Error('Unknown error'));
        };

        window.addEventListener('error', handleWindowError);

        return () => {
            window.removeEventListener('error', handleWindowError);
        };
    }, []);

    return error;
};

export default function ErrorBoundary({children}) {
    const error = useErrorBoundary();

    if (error) {
        return <Error message={error} />;
    }

    return children;
}