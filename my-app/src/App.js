import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Information} from './FirstComponents/Information';
import {LogIn} from './FirstComponents/LogIn';
import {SignUp} from "./FirstComponents/SignUp";
import {FindId} from "./FirstComponents/FindId";
import {FindPassword} from "./FirstComponents/FindPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/login' />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/findid' element={<FindId />} />
                <Route path='/findpassword' element={<FindPassword />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Information />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;