package dk.lyngby.controller.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dk.lyngby.config.HibernateConfig;
import dk.lyngby.dao.impl.UserDao;
import dk.lyngby.dto.CartDTO;
import dk.lyngby.dto.ProductDTO;
import dk.lyngby.exception.ApiException;
import dk.lyngby.exception.AuthorizationException;
import dk.lyngby.model.Cart;
import dk.lyngby.model.Product;
import dk.lyngby.model.User;
import dk.lyngby.security.TokenFactory;
import io.javalin.http.Context;
import jakarta.persistence.EntityManagerFactory;

import java.util.Set;

public class UserController {

    private final UserDao userDao;
    private final TokenFactory tokenFactory = TokenFactory.getInstance();

    public UserController() {
        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();
        userDao = UserDao.getInstance(emf);
    }

    public void login(Context ctx) throws ApiException, AuthorizationException {
        String[] userInfos = getUserInfos(ctx, true);
        User user = getVerifiedOrRegisterUser(userInfos[0], userInfos[1], "", false);
        String token = getToken(userInfos[0], user.getRolesAsStrings());

        // Create response
        ctx.status(200);
        ctx.result(createResponse(userInfos[0], token));
    }

    public void register(Context ctx) throws ApiException, AuthorizationException {
        String[] userInfos = getUserInfos(ctx, false);
        User user = getVerifiedOrRegisterUser(userInfos[0], userInfos[1], userInfos[2], true);
        String token = getToken(userInfos[0], user.getRolesAsStrings());

        // Create response
        ctx.res().setStatus(201);
        ctx.result(createResponse(userInfos[0], token));
    }

    private String createResponse(String username, String token) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode responseJson = mapper.createObjectNode();
        responseJson.put("username", username);
        responseJson.put("token", token);
        return responseJson.toString();
    }

    private String[] getUserInfos(Context ctx, boolean tryLogin) throws ApiException {
        String request = ctx.body();
        return tokenFactory.parseJsonObject(request, tryLogin);
    }

    private User getVerifiedOrRegisterUser(String username, String password, String role, boolean isCreate) throws AuthorizationException {
        return isCreate ? userDao.registerUser(username, password, role) : userDao.getVerifiedUser(username, password);
    }

    private String getToken(String username, Set<String> userRoles) throws ApiException {
        return tokenFactory.createToken(username, userRoles);
    }
    public void findCartId(Context ctx) {
        // request
        String username = ctx.pathParamAsClass("username", String.class).get();
        // entity
        Integer i = userDao.readCartId(username);
        // response
        ctx.res().setStatus(200);
        ctx.json(i);
    }
}