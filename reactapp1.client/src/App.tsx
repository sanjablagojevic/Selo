import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import SeloList from './Components/Selo/SeloList.tsx';
import AddNews from './Components/Novosti/AddNews.tsx';
import Korisnici from './Components/Korisnici/Korisnici.tsx';
import SeloProfil from './Components/Selo/SeloProfil.tsx';
import ForgottenPassword from './Pages/ForgottenPassword.tsx';
import NovostiLista from './Components/Novosti/NovostiLista.tsx';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotten-password" element={<ForgottenPassword />} />
                <Route path="/" element={<Home />} />
                <Route path="/selo" element={<SeloList />} />
                <Route path="/view/:id" element={<SeloProfil />} />
                <Route path="/news/:id" element={<NovostiLista />} />
                <Route path="/add-news" element={<AddNews seloId={0} />} />
                <Route path="/korisnici" element={<Korisnici />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;