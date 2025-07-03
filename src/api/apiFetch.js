import { useEffect, useRef, useState } from "react";

 export function useFetchApi(url, token){

    const [data, setData]  = useState(null)
    const [error, setError] = useState(null)
    const [loading,  setLoading] = useState(false)

    const abortController = useRef(null)

    const request =  async ({method = "GET", body = null}) => {

        if(abortController.current){
            abortController.current.abort();
        }

        abortController.current = new AbortController()
        const signal = abortController.current.signal;

        setLoading(true)
        setError(null)

        try {
            
          const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...(token && {Authorization: `Bearer ${token}`})
            },
            ...(body && {body: JSON.stringify(body)}),
            signal
            });

            if(!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Error en la solicitud")
            }

            const json = await res.json()
            setData(json)
            return json
        
        } catch(err){
            setError(err.message)
            setData(null)
        } finally {
            setLoading(false)
        }
    }

          useEffect(() => {
            return () => {
                if(abortController.current){
                    abortController.current.abort()
                }
            }
        }, [])

    return { data, error, loading, request }
}

