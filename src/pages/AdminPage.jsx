import facade from '../util/apiFacade';
import { Link } from 'react-router-dom';
function AdminPage() {
    return (
      <div id="subpage">
        {facade.getUserRoles() === 'admin' ? (
          <p>Admin role activated</p>
        ) : (
          <div>
          <h1>You are not allowed here mister</h1>
          <h1>Go to the <Link to="/"class="linkText">Homepage</Link></h1>
          </div>
        )}
      </div>
    );
  }
  
  export default AdminPage;