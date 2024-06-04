import { useState, useEffect } from "react";

function useFetch({limit= null, category = null, id= null}) {
    const url = 'https://fakestoreapi.com/products'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState([null])

    const throwData = async (data)=>{
        const json = await data.json()
        setData(json)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (category) {
                    const res = await fetch(url + `/category/${category}?limit=${limit}`)
                    throwData(res)
                    
                }else if (id){
                    const res = await fetch(url + `/${id}`)
                    throwData(res)
                }else{
                    const res = await fetch(url + `?limit=${limit}`)
                    throwData(res)
                }
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [])
    
    return { data, loading, error }
}
export default useFetch;