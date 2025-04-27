import { Routes, Route } from 'react-router-dom' 
import { AuthLayout } from './Layout/auth' 
import { Home } from './pages/home' 
import { SignIn } from './pages/signIn' 
import { SignUp } from './pages/signup' 
import { AppLayout } from './Layout/app'
import { OrderPage } from './pages/Orders/order'

export function RouterApp(){
    return (
        <Routes>
            <Route path="/" element={<AppLayout/>}>
             <Route path='/' element={<Home/>}/>
             <Route path='/order' element={<OrderPage/>}/>
            </Route>
            <Route path="/auth" element={<AuthLayout/>}>
                <Route path='signin' element={<SignIn/>}/>
                <Route path='signup' element={<SignUp/>}/>
            </Route>
        </Routes>
    )
}
