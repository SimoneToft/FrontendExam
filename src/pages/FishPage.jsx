import Product from "../components/Product";

function FishPage() {
  const fishData = [
    { id: 1, name: 'Angelfish', text: '(Pterophyllum scalare)', price: '$7', image: 'src/assets/images/angelfish.jpg' },
    { id: 2, name: 'Clownfish', text: '(Amphiprioninae)', price: '$15', image: 'src/assets/images/clownfish.jpg' },
    { id: 3, name: 'Royal Gramma', text: '(Gramma loreto)', price: '$25', image: 'https://freakincorals.com/cdn/shop/products/lg_72329_Royal_Gramma_Basslet_576x.jpg?v=1601919573' },
    { id: 4, name: 'Blue Tang', text: '(Paracanthurus hepatus)', price: '$30', image: 'src/assets/images/bluetang.jpeg' },
    { id: 5, name: 'Garryfish', text: '(Garryfish)', price: '$4', image: 'src/assets/images/garryfish.jpg' },
  ];

  return (
    <div className="content">
      <h1>Fancy Fish</h1>
      <p>blub blub</p>
      {fishData.map(fish => (
        <Product
          key={fish.name}
          productId={fish.id}
          productName={fish.name}
          productText={fish.text}
          productPrice={fish.price}
          productImage={fish.image}
        />
      ))}
    </div>
  );
}

export default FishPage;