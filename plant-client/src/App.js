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
import ShopOwnProfileView from './pages/ShopOwnProfileView';
import Cart from './pages/Cart';
import Footer from './components/Footer';
import MyOrderProducts from './pages/MyOrderProducts';
import WishList from './pages/WishList';
import Payment from './pages/Payment';
import CreditCard from './components/CreditCard';
import UpiPayment from './components/UpiPayment';
import ShopViewOrders from './pages/ShopViewOrders';
import UserOwnProfile from './pages/UserOwnProfile';
import UserEdit from './pages/UserEdit';
import ForgotPassword from './pages/ForgotPassword';
import Verification from './pages/Verification';
import SetNewPassword from './pages/SetNewPassword';
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
    <Route path='/shopownProfile' element={<ShopOwnProfileView/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/footer' element={<Footer/>}/>
    <Route path='/myOrder' element={<MyOrderProducts/>}/>
    <Route path='/wishlist' element={<WishList/>}/>
    <Route path='/payment' element={<Payment/>}/>
    <Route path='/creditCard' element={<CreditCard/>}/>
    <Route path='/upi' element={<UpiPayment/>}/>
    <Route path='/shopViewOrders' element={<ShopViewOrders/>}/>
    <Route path='/userOwnProfile' element={<UserOwnProfile/>}/>
    <Route path='/userEdit/:id' element={<UserEdit/>}/>
    <Route path='/forgotPassword' element={<ForgotPassword/>}/>
    <Route path='/verification' element={<Verification/>}/>
    <Route path='/newPassword' element={<SetNewPassword/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
