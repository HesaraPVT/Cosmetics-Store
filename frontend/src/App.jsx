import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/productCard.jsx'

function App() {

  return (
    <>
      <Header/>
      <ProductCard name="Dove" description="soap" price="$9.99" image="https://portsunlightvillage.com/wp-content/uploads/2024/05/189A9012-Edit-scaled.jpg"/>
      <ProductCard name="Nivea" description="lotion" price="$14.99" image="https://cdn.shopify.com/s/files/1/0649/1503/files/1080x1080_Posts_7__Cosmetic1_1_480x480.jpg?v=1686728837"/>
    </>
  )
}

export default App
