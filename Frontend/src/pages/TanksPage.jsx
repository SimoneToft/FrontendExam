import Product from "../components/Product";

function TanksPage() {
  const tankData = [
    {name: "Fish Box Moon",text: "19L",price: "$75",image: "src/assets/images/tank19l.jpg",},
    {name: "Aquatropic LED 60",text: "60L",price: "$145",image: "src/assets/images/tank60l.jpg",},
    {name: "Superfish Tropical Medium",text: "62L",price: "$109.99",image: "src/assets/images/tank62l.jpg",},
    {name: "Fishotronic L 160",text: "160L",price: "$199.99",image: "src/assets/images/tank160l.jpg",},
    {name: "Tetra XL Aquarium",text: "200L",price: "$215",image: "src/assets/images/tank200l.jpg",},
  ];

  return (
    <div className="content">
      <h1>Tranquil Tanks</h1>
      <p>Let the fishies feel at home</p>
      {tankData.map((tank) => (
        <Product
          key={tank.name}
          productName={tank.name}
          productText={tank.text}
          productPrice={tank.price}
          productImage={tank.image}
        />
      ))}
    </div>
  );
}

export default TanksPage;