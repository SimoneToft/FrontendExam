
const URL = 'http://localhost:7070/api/v1/'
const USER_ROUTE = "user"
const AUTHENTICATION_ROUTE = 'auth/login'
const REGISTER_ROUTE = 'auth/register'

function apiFacade()
{

    const setToken = (token) =>
    {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () =>
    {
        return localStorage.getItem('jwtToken')
    }

    const setCartId = (cartid) =>
    {
        localStorage.setItem('cartId', cartid)
    }

    const getCartId = () =>
    {
        return localStorage.getItem('cartId')
    }

    const logout = (callback) =>
    {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('cartId')
        callback(false)
    }

    const handleHttpErrors = (res) =>
    {

        if (!res.ok)
        {
            return Promise.reject({ status: res.status, fullError: res.json() })
        }
        return res.json()
    }

    const login = (user, password, onSuccess, onError) => {
       // console.log("Jeg er fanget inde i login funktionen", user, password);
      
        const payload = { username: user, password: password};
      
        const options = makeOptions("POST", payload);
      
        return fetch(URL + AUTHENTICATION_ROUTE, options)
          .then(handleHttpErrors)
          .then((json) => {
            onSuccess(true);
            setToken(json.token);
            readCartId(user);
          })
          .catch((error) => {
            if (error.status) {
              error.fullError.then((e) => console.log(JSON.stringify(e)));
              onError(false); // Call the error callback for failed login
            } else {
              console.log("seriøs fejl", error);
              onError(false); // Call the error callback for failed login
            }
            throw error; // Propagate the error to indicate a failed login
          });
          
      };
      const readCartId = (user, onSuccess, onError) => {
         return fetchData( "auth/cartid/"+user, "GET")
         .then((cartId) => {
             setCartId(cartId);
         })
         .catch((error) => {
             console.error("Error fetching cart:", error);
             onError(error);
         });
       };
 

      const register = (user, password, onError) => {
        const payload = { username: user, password: password, role: "user"};
        const options = makeOptions("POST", payload);
    
        return fetch(URL + REGISTER_ROUTE, options)
            .then(handleHttpErrors)
            .then((json) => {
                setToken(json.token);
            })
            .catch((error) => {
                if (error.status) {
                    error.fullError.then((e) => console.log(JSON.stringify(e)));
                    onError(false);
                } else {
                    console.log("serious error", error);
                    onError(false);
                }
                throw error;
            });
    };

    const fetchData = (endpoint, method, payload) =>
    {
        const options = makeOptions(method, payload, true); //True add's the token
        return fetch(URL + endpoint, options).then(handleHttpErrors);
    }

    const makeOptions = (method, payload, addToken) =>
    {

        const opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            }
        }

        if (addToken)
        {
            opts.headers["Authorization"] = `Bearer ${getToken()}`
        }

        if (payload)
        {
            opts.body = JSON.stringify(payload)
        }

        return opts;
    }

    const getUserRoles = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }
    const getUsername = () =>
    {
        const token = getToken()
        if (token != null)
        {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const username = decodedClaims.sub
            return username
        } else return ""
    }
    const hasUserAccess = (neededRole, loggedIn) =>
    {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
    }
    const getCart = (onSuccess, onError) => {
        return fetchData( `carts/${getCartId()}`, "GET")
            .then((cart) => {
                onSuccess(cart);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
                onError(error);
            });
    };
    const addToCart = (id) => {
        return fetchData( `carts/${getCartId()}/products/`+id, "POST")
            .then((fish) => {
                (fish);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
    };
    const getFish = (onSuccess, onError) => {
        return fetchData( `products/fish`, "GET")
            .then((fish) => {
                onSuccess(fish);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
                onError(error);
            });
    };

    return {
        makeOptions,
        setToken,
        getToken,
        setCartId,
        getCartId,
        logout,
        login,
        register,
        getUserRoles,
        hasUserAccess,
        fetchData,
        getCart,
        getFish,
        addToCart,
        getUsername
    }

}

const facade = apiFacade();
export default facade;