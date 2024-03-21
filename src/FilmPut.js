import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export const FilmPut = ({ setFetchPending, selectedFilm, setSelectedFilm }) => {
  const navigate = useNavigate();
  const param = useParams();

  const [formPendingFetch, setFormPendingFetch] = React.useState(true)

  const [name, setName] = React.useState("")
  const [kepURL, setKepURL] = React.useState("")
  const [kiadasEve, setKiadasEve] = React.useState("")
  const [ertekeles, setErtekeles] = React.useState("")

  const fetchData = async () => {
    await axios.get(`https://localhost:7017/Film/${param.id}`).then(async (response) => {
      await setSelectedFilm(response.data);
      setName(response.data.nev);
      setKepURL(response.data.kepneve);
      setKiadasEve(response.data.kiadasEve);
      setErtekeles(response.data.ertekeles);
    }).finally(() => setFormPendingFetch(false));
  }

  useEffect(() => {
    fetchData();
  }, [formPendingFetch]);

  const Name = (e) => {
    setName(e.target.value)
  }

  const KepURL = (e) => {
    setKepURL(e.target.value)
  }

  const KiadasEve = (e) => {
    setKiadasEve(e.target.value)
  }

  const Ertekeles = (e) => {
    setErtekeles(e.target.value)
  }

  return (
    <div className='container w-25 mt-5'>
      <form onSubmit={async (e) => {
        e.preventDefault();
        e.persist();

        const filmNev = e.target.filmUpdateNev.value
        const filmKepURL = e.target.filmUpdateKepURL.value
        const kiadasEve = e.target.filmUpdateKiadasEve.value
        const ertekeles = e.target.filmUpdateErtekeles.value

        const updateData = {
          id: selectedFilm.id,
          nev: filmNev,
          kepneve: filmKepURL,
          kiadasEve: kiadasEve,
          ertekeles: ertekeles
        }
        console.log(updateData);
        await axios.put(`https://localhost:7017/Film/${param.id}`, updateData).then(async () => {
          await setFetchPending(true);
          navigate('/Filmek');
        });

      }}>
        <div className="mb-3">
          <label htmlFor="filmUpdateNev" className="form-label">Film neve</label>
          <input onChange={Name} type="text" className="form-control" id="filmUpdateNev" defaultValue={name} />
        </div>
        <div className="mb-3">
          <label htmlFor="filmUpdateKepURL" className="form-label">Kép URL</label>
          <input onChange={KepURL} type="text" className="form-control" id="filmUpdateKepURL" defaultValue={kepURL} />
        </div>
        <div className="mb-3">
          <label htmlFor="filmUpdateKiadasEve" className="form-label">Kiadás éve</label>
          <input onChange={KiadasEve} type="text" className="form-control" id="filmUpdateKiadasEve" defaultValue={kiadasEve} />
        </div>
        <div className="mb-3">
          <label htmlFor="filmUpdateErtekeles" className="form-label">Értékelés</label>
          <input onChange={Ertekeles} type="text" className="form-control" id="filmUpdateErtekeles" defaultValue={ertekeles} />
        </div>
        <button type="submit" className="btn btn-success">Mentés</button>
      </form>
    </div>
  )
}
