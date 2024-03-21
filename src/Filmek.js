import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Filmek = ({ filmek, setFilmek, setSelectedFilm, setFetchPending, isFetchPending }) => {
    const navigate = useNavigate();
    const fetchFilmek = async () => {
        try {
            const response = await fetch('https://localhost:7017/Film')
            const data = await response.json()
            setFilmek(data)
        } catch (error) {
            console.error(error)
        } finally {
            setFetchPending(false)
        }
    }
    useEffect(() => {
        fetchFilmek()
    }, [isFetchPending])

    return (
        <div className='row container-fluid justify-content-center'>
            {
                isFetchPending ? <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                    <div className='spinner-border text-danger' />
                </div> :
                    filmek.map(film => (
                        <div key={film.id} className="card m-3" style={{ width: '18rem' }}>
                            <Link onClick={() => {
                                navigate(`/film/${film.id}`);
                            }} to={`/film/${film.id}`}> <img src={film.kepneve ? film.kepneve : 'https://via.placeholder.com/200'} className="card-img-top p-3" alt="A film képe xd" /></Link>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{film.nev}</h5>
                                <p className="card-text">Kiadás éve: {film.kiadasEve}</p>
                                <p className="card-text">Értékelés: {film.ertekeles}</p>
                                <div className="mt-auto">
                                    <Link to={`/filmFrissit/${film.id}`} className="btn btn-warning m-1"
                                        onClick={async () => {
                                            await setSelectedFilm(film);
                                        }}>Frissítés</Link>
                                    <button type="button" data-bs-target="#deleteConfirm" data-bs-toggle="modal" onClick={async () => {
                                        await setSelectedFilm(film);
                                    }} className="btn btn-danger m-1">Törlés</button>
                                </div>
                            </div>
                        </div>
                    ))

            }
        </div>

    )
}

export default Filmek