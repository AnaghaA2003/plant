import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ShopLogin from './pages/ShopLogin';
import UserLogin from './pages/UserLogin';
import Login from './pages/Login';
import IndoorHome from './pages/IndoorHome';
import OutdoorHome from './pages/OutdoorHome';
import AddProduct from './pages/AddProduct';
import Homepage from './pages/Homepage';
import EditIndoorProduct from './pages/EditIndoorProduct';
import AllProduct from './pages/AllProduct';
import Shop from './pages/Shop';
import ShopEdit from './pages/ShopEdit';
import UserProfile from './pages/UserProfile';
import ShopMore from './pages/ShopMore';
import OwnProductsView from './pages/OwnProductsView';
function App() {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Homepage/>}/>
    <Route path='/indoor' element={<IndoorHome/>}/>
    <Route path='/outdoor' element={<OutdoorHome/>}/>
    <Route path='/shopRegistration' element={<ShopLogin/>}/>
    <Route path='/userRegistration' element={<UserLogin/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/add' element={<AddProduct/>}/>
    <Route path='/EditIndoorProduct/:id' element={<EditIndoorProduct/>}/>
    <Route path='/allProducts' element={<AllProduct/>}/>
    <Route path='/shop' element={<Shop/>}/>
    <Route path='/shopEdit/:id' element={<ShopEdit/>}/>
    <Route path='/userProfile' element={<UserProfile/>}/>
    <Route path='/shopMore/:id' element={<ShopMore/>}/>
    <Route path='/ownProduct' element={<OwnProductsView/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
