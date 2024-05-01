import { Suspense, lazy, useEffect } from "react"
import { Routes,Route, useLocation } from "react-router-dom"

const LoginPage=lazy(()=>import('./pages/LoginPage'))
const SignupPage=lazy(()=>import('./pages/SignupPage'))
const ResetPasswordPage=lazy(()=>import('./pages/ResetPasswordPage'))
const ForgetPasswordPage=lazy(()=>import('./pages/ForgetPasswordPage'))
const UserProfilePage=lazy(()=>import('./pages/UserProfilePage'))
const HomePage=lazy(()=>import('./pages/HomePage'))
const ProductsPage=lazy(()=>import('./pages/ProductPage'))
const ProductDetaislPage=lazy(()=>import('./pages/ProductDetailsPage'))
const CartPage=lazy(()=>import('./pages/CartPage'))

import Navbar from "./features/navbar/Navbar"
import Loader from "./components/Loader"
import Footer from "./features/footer/footer"
import Protected from "./features/auth/components/Protected"
import { useDispatch, useSelector } from "react-redux"
import { selectLoggedInUser } from "./features/auth/AuthSlice"
import { fetchuserAsync, userinfo } from "./features/user/userSlice"
import Error from "./components/Error"
import { FetchCartAsync } from "./features/cart/cartSlice"

function App() {


  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser)
  const user1=useSelector(userinfo);
  // console.log(user1)

  async function get()
  {
  await dispatch(fetchuserAsync({token:user?.loggedInUserToken}))
  }

  useEffect(() => {
    if (user1) {
      dispatch(FetchCartAsync({user:user1?._id}))
    }
  }, [user1,dispatch]);

  useEffect(()=>{
    if(user?.loggedInUserToken)
   get();
  },[dispatch,user?.loggedInUserToken])

   let {pathname}=useLocation();
   pathname=pathname.toLowerCase();
  return (
    <>
    {pathname === "/login" || pathname === "/signup" || pathname === "/verify" || pathname.startsWith("/reset") || pathname === "/forget"  ?null  : <Navbar />}
    <Routes>
      <Route path='/' element={<WithSuspense><HomePage/></WithSuspense>} />
      <Route path='/login' element={<WithSuspense><LoginPage/></WithSuspense>} />
      <Route path='/signup' element={<WithSuspense><SignupPage/></WithSuspense>} />
      <Route path='/reset/:token' element={<WithSuspense><ResetPasswordPage/></WithSuspense>} />
      <Route path='/forget' element={<WithSuspense><ForgetPasswordPage/></WithSuspense>} />
      <Route path='/profile' element={<WithSuspense><Protected><UserProfilePage/></Protected></WithSuspense>} />
      <Route path='/products' element={<WithSuspense><ProductsPage/></WithSuspense>} />
      <Route path='/details/:_id' element={<WithSuspense><ProductDetaislPage/></WithSuspense>} />
      <Route path='/*' element={<WithSuspense><Error/></WithSuspense>} /> 
      <Route path='/cart' element={<WithSuspense><CartPage/></WithSuspense>} /> 
    </Routes>
    {pathname === "/login" || pathname === "/signup" || pathname === "/verify" || pathname === "/reset" || pathname === "/profile" ?null  :<Footer/>}
    </>
  )
}

const WithSuspense=({children})=>{
  return(
    <Suspense fallback={<Loader/>}>
      {children}
    </Suspense>
  )
}

export default App
