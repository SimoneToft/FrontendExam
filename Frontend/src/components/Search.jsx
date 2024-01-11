import { useContext } from 'react';
import { SearchContext } from './SearchProvider';

const SearchComponent = () => {
  const { inputValue, handleSearch, updateInputValue } = useContext(SearchContext);

  const handleInputChange = (e) => {
    const query = e.target.value;
    updateInputValue(query);
    handleSearch(query);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={inputValue}
        className="search_bar"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchComponent;

export const searchItems = (items, query) => {
  return items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const allItems = [
  { type: 'Fish', items: [
    { id: 1, name: 'Angelfish', text: '(Pterophyllum scalare)', price: '$7', image: 'src/assets/images/angelfish.jpg' },
    { id: 2, name: 'Clownfish', text: '(Amphiprioninae)', price: '$15', image: 'src/assets/images/clownfish.jpg' },
    { id: 3, name: 'Royal Gramma', text: '(Gramma loreto)', price: '$25', image: 'https://freakincorals.com/cdn/shop/products/lg_72329_Royal_Gramma_Basslet_576x.jpg?v=1601919573' },
    { id: 4, name: 'Blue Tang', text: '(Paracanthurus hepatus)', price: '$30', image: 'src/assets/images/bluetang.jpeg' },
    { id: 5, name: 'Garryfish', text: '(Garryfish)', price: '$4', image: 'src/assets/images/garryfish.jpg' },
  ]},
  { type: 'Invertebrates', items: [
    { name: 'Moon Jellyfish', text: '(Aurelia aurita)', price: '$20', image: 'https://www.eopugetsound.org/sites/default/files/styles/magazinewidth_592px/public/topical_article/images/moon_jellyfish.jpg?itok=Esreg6zX'},
    { name: 'Anemone', text: '(Rose Bubble Tip)', price: '$140', image: 'https://static.wixstatic.com/media/f14946_e93a30d15ec24361805c00b3f721ddd1~mv2.jpg/v1/fill/w_2034,h_2036,al_c,q_85/f14946_e93a30d15ec24361805c00b3f721ddd1~mv2.jpg' },
    { name: 'Snail', text: '(Astraea Turbo)', price: '$2', image: 'https://www.abyssaquatics.co.uk/wp-content/uploads/2020/10/100073-1.jpg' },
    { name: 'Fire Blood Shrimp', text: '(Lysmata debelius)', price: '$65', image: 'https://www.oceanaquarium.com/wp-content/uploads/2012/12/35_fire_shrimp.jpg' },
    { name: 'Blue Tuxedo Urchin', text: '(Mespilia sp.) ', price: '$29', image: 'https://www.discountcoral.com/cdn/shop/products/BlueTuxedoUrchin.jpg?v=1661358001' },
  ]},
  { type: 'Supplies', items: [
    { name: 'TetraMin Tropical Flakes', text: '28G', price: '$12', image: 'src/assets/images/tetra-tropical-flakes.jpg' },
    { name: 'Tetra Cichlid Sticks', text: '30G', price: '$14', image: 'src/assets/images/tetra-cichlid.jpg' },
    { name: 'Tetra Pro Colour', text: '30G', price: '$16', image: 'src/assets/images/tetra-pro.jpg' },
  ]},
  { type: 'Tanks', items: [
    { name: 'Fish Box Moon', text: '19L', price: '$75', image: 'src/assets/images/tank19l.jpg' },
    { name: 'Aquatropic LED 60', text: '60L', price: '$145', image: 'src/assets/images/tank60l.jpg' },
    { name: 'Superfish Tropical Medium', text: '62L', price: '$109.99', image: 'src/assets/images/tank62l.jpg' },
    { name: 'Fishotronic L 160', text: '160L', price: '$199.99', image: 'src/assets/images/tank160l.jpg' },
    { name: 'Tetra XL Aquarium', text: '200L', price: '$215', image: 'src/assets/images/tank200l.jpg' },
  ]}
];