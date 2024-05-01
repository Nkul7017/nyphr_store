import React from 'react'
import Protected from '../features/auth/components/Protected'
import Cart from '../features/cart/components/Cart'

function CartPage() {
  return (
    <>
    <Protected>
     <Cart/>
    </Protected>
    </>
  )
}

export default CartPage
