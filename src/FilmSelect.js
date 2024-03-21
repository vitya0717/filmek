import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

export const FilmSelect = ({ selectedFilm, setSelectedFilm }) => {

    const navigate = useNavigate();
    const param = useParams();

    const [isFetchPending, setFetchPending] = React.useState(true)

    const fetchData = async () => {
        await axios.get(`https://localhost:7017/Film/${param.id}`).then(async (response) => {
            await setSelectedFilm(response.data);
            console.log(response.data);
        }).finally(() => setFetchPending(false));
    }

    useEffect(() => {
        fetchData();
    }, [isFetchPending]);

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    <div key={selectedFilm.id} className="card m-3" style={{ width: '18rem' }}>
                        <Link to={`/Filmek`}> <img src={selectedFilm.kepneve ? process.env.PUBLIC_URL + '/' + selectedFilm.kepneve : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A film képe xd" /></Link>
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{selectedFilm.nev}</h5>
                            <p className="card-text">Kiadás éve: {selectedFilm.kiadasEve}</p>
                            <p className="card-text">Értékelés: {selectedFilm.ertekeles}</p>
                            <div className="mt-auto">
                                <Link to={`/filmFrissit/${selectedFilm.id}`} className="btn btn-warning m-1">Frissítés</Link>
                                <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" className="btn btn-danger m-1">Törlés</button>
                            </div>
                        </div>
                    </div>
            }
        </div>


    )
}
