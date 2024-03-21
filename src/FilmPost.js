import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export const FilmPost = ({setFetchPending}) => {
    const navigate = useNavigate();
    return (
        <div className='container w-25 mt-5'>
            <form onSubmit={async (e) => {
                e.preventDefault();
                e.persist();

                const filmNev = e.target.filmNev.value
                const filmKepURL = e.target.filmKepURL.value
                const kiadasEve = e.target.kiadasEve.value
                const ertekeles = e.target.ertekeles.value

                const postData = {
                    id: 0,
                    nev: filmNev,
                    kepneve: filmKepURL,
                    kiadasEve: kiadasEve,
                    ertekeles: ertekeles
                }
                await axios.post('https://localhost:7017/Film', postData).then(async () => {
                    await setFetchPending(true);
                    navigate('/Filmek');
                });

            }}>
                <div className="mb-3">
                    <label htmlFor="filmNev" className="form-label">Film címe</label>
                    <input type="text" className="form-control" id="filmNev" />
                </div>
                <div className="mb-3">
                    <label htmlFor="filmKepURL" className="form-label">Kép URL</label>
                    <input type="text" className="form-control" id="filmKepURL" />
                </div>
                <div className="mb-3">
                    <label htmlFor="kiadasEve" className="form-label">Kiadás éve</label>
                    <input type="text" className="form-control" id="kiadasEve" />
                </div>
                <div className="mb-3">
                    <label htmlFor="ertekeles" className="form-label">Értékelés</label>
                    <input type="text" className="form-control" id="ertekeles" />
                </div>
                
                <button type="submit" className="btn btn-success">Mentés</button>
            </form>
        </div>
    )
}
