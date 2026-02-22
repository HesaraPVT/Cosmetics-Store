export default function ProductCard(props) {
    console.log(props);
    return (
        // if you want to write js in html you have to use {} and not ""
        // you can create a class in css and use it insied className (you can add multiple classes by separating them with a space)
        <div className="card testing">
            <img className="productImage" src={props.image} />
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button className="addToCart">Add to Cart</button>
            <button className="buyNow">Buy Now</button>
        </div>
    )
}