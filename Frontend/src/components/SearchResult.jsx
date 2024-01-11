import { SearchContext } from "../components/SearchProvider";
import { searchItems, allItems } from '../components/Search';
import Product from "../components/Product"; 
import { useContext } from 'react';
import { Outlet } from "react-router-dom"

function SearchResult(){
    const { searchQuery } = useContext(SearchContext);

    const filteredItems = allItems.map(itemType => ({
        type: itemType.type,
        items: searchItems(itemType.items, searchQuery)
      }));

      return(
        <div>
          <div className="row">
            {searchQuery ? (
              // Render search results
              <>
                <div className="content">
                <h1>Search Results for '{searchQuery}'</h1>
                <div>
                    {filteredItems.map(itemType => (
                    itemType.items.map(item => (
                        <Product
                        key={item.name}
                        productName={item.name}
                        productText={item.text}
                        productPrice={item.price}
                        productImage={item.image}
                        />
                    ))
                    ))}
                </div>
                {filteredItems.every(itemType => itemType.items.length === 0) && (
                  <p>No results found for '{searchQuery}'</p>
                )}
                </div>
              </>
            ) : (
              // Render default content when there's no search query
              <>
               <Outlet/> 
              </>
            )}
          </div>
        </div>
      )

}
export default SearchResult;