import React from 'react'
import ProductContainer from '@/components/ProductContainer'

const page = async ({params}) => {
    const {id} = await params
  return (
    <ProductContainer id={id} />
  )
}

export default page