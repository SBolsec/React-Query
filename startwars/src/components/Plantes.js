import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async ({queryKey}) => {
    console.log(queryKey);
    const page = queryKey[2];
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
    return res.json();
}

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery({queryKey: ['planets', 'hello, ninjas', page], queryFn: fetchPlanets});
    //console.log(data);

    return (
        <div>
            <h2>Planets</h2>

            <button onClick={() => setPage(1)}>page 1</button>
            <button onClick={() => setPage(2)}>page 2</button>
            <button onClick={() => setPage(3)}>page 3</button>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <div>
                    {data.results.map(planet => <Planet planet={planet} key={planet.name} /> )}
                </div>

            )}
        </div>
    );
}

export default Planets;