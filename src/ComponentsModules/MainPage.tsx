import React from 'react';
import { BrowserRouter, Routes, Route, Link,} from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import { Navigate } from 'react-router-dom';
import Categories from './Categories';

const MainPage : React.FC = () => {
    return (
        <BrowserRouter>
            <nav className="bg-blue-800 p-4 flex">
                <li className="flex space-x-4">
                    <div className="rounded-md bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
                        <Link className="text-white hover:text-gray-300" to="/">Home</Link>
                    </div>
                </li>
                <li className="flex space-x-4">
                    <div className="rounded-md bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
                        <Link className="text-white hover:text-gray-300"  to="/Register">Register</Link>
                    </div>
                </li>
                <li className="flex space-x-4">
                    <div className="rounded-md bg-blue-500 hover:bg-blue-700 text-white px-4 py-2">
                        <Link className="text-white hover:text-gray-300" to="/Login">Login</Link>
                    </div>
                </li>
            </nav>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path="/categories" element={<Categories />} />
                <Route path="/login" element={<Login /> } />
            </Routes>
        </BrowserRouter>
    )
}
export default MainPage;
// need enchanctment on token ?