import Slideshow from "../components/Slideshow";
import Product from "../components/Product";

    const fishData = [
      { id: 1, name: 'Angelfish', text: '(Pterophyllum scalare)', price: '$7', image: 'src/assets/images/angelfish.jpg' },
      { id: 2, name: 'Clownfish', text: '(Amphiprioninae)', price: '$15', image: 'src/assets/images/clownfish.jpg' },
      { id: 3, name: 'Royal Gramma', text: '(Gramma loreto)', price: '$25', image: 'https://freakincorals.com/cdn/shop/products/lg_72329_Royal_Gramma_Basslet_576x.jpg?v=1601919573' },
    { id: 4, name: 'Blue Tang', text: '(Paracanthurus hepatus)', price: '$30', image: 'src/assets/images/bluetang.jpeg' },
    { id: 5, name: 'Garryfish', text: '(Garryfish)', price: '$4', image: 'src/assets/images/garryfish.jpg' },
];
function HomePage({ onProductAdd }) {
    return (
        <div>
            <section className="frontpage">
                <div>
                    <div className="slideshow">
                        <Slideshow />
                    </div>
                    <div className="content">
                        <h1><br></br>MOST POPULAR FISH</h1>
                        {fishData.map(fish => (
                            // eslint-disable-next-line react/jsx-key
                            <Product
                                productId={fish.id}
                                onProductAdd={onProductAdd}
                                productName={fish.name}
                                productText={fish.text}
                                productPrice={fish.price}
                                productImage={fish.image}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;