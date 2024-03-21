import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Filmek from './Filmek';
import Navbar from './Navbar';
import { FilmPost } from './FilmPost';
import { FilmPut } from './FilmPut';
import { FilmSelect } from './FilmSelect';
import { DeleteConfirmModal } from './DeleteConfirmModal';


function App() {
  const [filmek, setFilmek] = React.useState([]);
  const [isFetchPending, setFetchPending] = React.useState(true)
  const [selectedFilm, setSelectedFilm] = React.useState({});


  return (
      <BrowserRouter>
        <Navbar filmek={filmek} setFilmek={setFilmek} setFetchPending={setFetchPending} isFetchPending={isFetchPending} />
        <Routes>
          <Route path={"/Filmek"} element={<Filmek filmek={filmek} setFilmek={setFilmek} setSelectedFilm={setSelectedFilm} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/ujFilm"} element={<FilmPost filmek={filmek} setFilmek={setFilmek} setFetchPending={setFetchPending}/>} />
          <Route path={"/filmFrissit/:id"} element={<FilmPut selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm} setFetchPending={setFetchPending} isFetchPending={isFetchPending}/>} />
          <Route path={"/film/:id"} element={<FilmSelect selectedFilm={selectedFilm} setSelectedFilm={setSelectedFilm} />} />
        </Routes>
        <DeleteConfirmModal selectedFilm={selectedFilm} setFetchPending={setFetchPending} />
      </BrowserRouter>
  );
}

export default App;