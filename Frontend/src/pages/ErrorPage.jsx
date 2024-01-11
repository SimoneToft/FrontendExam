import { Link } from "react-router-dom";

function ErrorPage() {
    return (
        <div className="ErrorPage" >
            <h1>Page not found!</h1>
            <h1>Go to the <Link to="/"class="linkText">Homepage</Link></h1>
            <img className="ErrorImage" src="\src\assets\images\fish.jpg" alt="fish" />
        </div>                      
    );
}

export default ErrorPage;