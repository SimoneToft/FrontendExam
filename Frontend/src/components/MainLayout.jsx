import Navbar from './Navbar';
import Footer from './Footer';
import SearchResult from './SearchResult';
function MainLayout(){
    return(
        <div>
            <Navbar> </Navbar> 
            <SearchResult></SearchResult>
            <Footer> </Footer>
           
        </div>
    )
}
export default MainLayout;