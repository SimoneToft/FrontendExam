import Product from "../components/Product";

function SuppliesPage() {
  const suppliesData = [
    { name: 'TetraMin Tropical Flakes', text: '28G', price: '$12', image: 'src/assets/images/tetra-tropical-flakes.jpg' },
    { name: 'Tetra Cichlid Sticks', text: '30G', price: '$14', image: 'src/assets/images/tetra-cichlid.jpg' },
    { name: 'Tetra Pro Colour', text: '30G', price: '$16', image: 'src/assets/images/tetra-pro.jpg' },
    { name: 'Formula One Flake', text: '34G', price: '$12', image: 'https://oceanreef.b-cdn.net/wp-content/uploads/2022/09/Formula_One_Flakes_new_label.jpg' },
    { name: 'Frozen Brine Shrimp', text: '100G', price: '$9', image: 'https://hikariusa.com/img/bio_pure_frozen/042055323208-biopurefrozen-brineshrimp-32cubes-3.5oz-100g-32320[2012].png' },
  ];

  return (
    <div className="content">
      <h1>Sufficient Supplies</h1>
      <p>All the necessities</p>
      {suppliesData.map(supply => (
        <Product
          key={supply.name}
          productName={supply.name}
          productText={supply.text}
          productPrice={supply.price}
          productImage={supply.image}
        />
      ))}
    </div>
  );
}

export default SuppliesPage;