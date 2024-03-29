import React , { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Profile from './Pages/Profile';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AddProduct from './Pages/AddProduct';
import ProductManager from './Pages/ProductManager';
import FilterProducts from './Pages/FilterProducts';
import { getAllProducts } from './services/product-controller';
import ProductPage from './Pages/ProductPage';
import Dashboard from './Pages/Dashboard';
import { authController } from './services/auth-controller';
import Home from './Pages/Home';
import ForgetPassword from './Pages/ForgetPassword';


function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  // const [userType , setUserType] = useState("");

  async function fetchProducts(){
   
    const response = await getAllProducts();
    setProducts(response.data.products);
    
  }

  const validateUser = async () => {

    const token = localStorage.getItem('token');

    if (token === null) {
        navigate('/');
    }

    const response = await authController();
    console.log(response);
    // setUserType(response.data.payload.type);
    if(response?.data?.payload?.type){
      setLoggedIn(true);
      navigate('/dashboard');
    }
}

  useEffect(()=>{
    fetchProducts();
    validateUser();
  } , [])

  return (
    <div className="w-full min-h-screen bg-richblack-900">
      
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      {/* <AddProduct/> */}
      
      {/* <FilterProducts data={products}/> */}
      {/* <ProductPage /> */}
      {/* <Dashboard/> */}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/profile" element={<Profile  />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/productmanager" element={<ProductManager data={products} />} />
        <Route path="/filterproducts" element={<FilterProducts data={products} />} />
        <Route path="/product/:productId" element={<ProductPage/>} />
      </Routes>

    </div>
  );
}

export default App;
