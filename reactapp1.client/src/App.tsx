import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.tsx';
import Login from './Pages/Login.tsx';
import Register from './Pages/Register.tsx';
import SeloList from './Components/Selo/SeloList.tsx';
import AddNews from './Components/Novosti/AddNews.tsx';
import Korisnici from './Components/Korisnici/Korisnici.tsx';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/selo" element={<SeloList />} />
                <Route path="/add-news" element={<AddNews seloId={1} />} />
                <Route path="/korisnici" element={<Korisnici />} />
            </Routes>
        </BrowserRouter>
    );

}
export default App;