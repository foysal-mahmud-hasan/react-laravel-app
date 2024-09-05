import { Routes, Route } from 'react-router-dom'
import IndexTestPage from './components/Index/IndexTestPage'
import React from "react";
import SignupForm from './components/SignupForm';
import EditForm from './components/EditForm';

function AppRoute() {

    return (
        <Routes>
            <Route path='/' element={<SignupForm />} />
            <Route path='edit/:id' element={<EditForm />} />
        </Routes>

    )
}

export default AppRoute
