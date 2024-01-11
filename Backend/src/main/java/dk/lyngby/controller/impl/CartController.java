package dk.lyngby.controller.impl;
import dk.lyngby.config.HibernateConfig;
import dk.lyngby.controller.IController;
import dk.lyngby.dao.impl.CartDao;
import dk.lyngby.model.Product;
import io.javalin.http.Context;
import jakarta.persistence.EntityManagerFactory;
import dk.lyngby.dto.CartDTO;
import dk.lyngby.model.Cart;

import java.util.List;

public class CartController implements IController<Cart, Integer> {
    private final CartDao dao;

    public CartController() {
        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();
        this.dao = CartDao.getInstance(emf);
    }

    @Override
    public void read(Context ctx) {
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        Cart cart = dao.read(id);
        CartDTO cartDTO = new CartDTO(cart);
        ctx.res().setStatus(200);
        ctx.json(cartDTO, CartDTO.class);
    }

    @Override
    public void readAll(Context ctx) {
        List<Cart> carts = dao.readAll();
        List<CartDTO> cartDTOS = CartDTO.toCartDTOList(carts);
        ctx.res().setStatus(200);
        ctx.json(cartDTOS, CartDTO.class);
    }

    @Override
    public void create(Context ctx) {
        Cart jsonRequest = ctx.bodyAsClass(Cart.class);
        Cart cart = dao.create(jsonRequest);
        CartDTO cartDTO = new CartDTO(cart);
        ctx.res().setStatus(201);
        ctx.json(cartDTO, CartDTO.class);
    }

    @Override
    public void update(Context ctx) {
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        Cart update = dao.update(id, validateEntity(ctx));
        CartDTO cartDTO = new CartDTO(update);
        ctx.res().setStatus(200);
        ctx.json(cartDTO, Cart.class);
    }

    @Override
    public void delete(Context ctx) {
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        dao.delete(id);
        ctx.res().setStatus(204);
    }
    public void addProductToCart(Context ctx) {
        int cartId = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid cart id").get();
        int productId = ctx.pathParamAsClass("productId", Integer.class).get();

        // Retrieve the cart and product
        Cart cart = dao.read(cartId);
        Product product = dao.getProductById(productId);

        // Add the product to the cart
        cart.getCart_products().add(product);
        dao.update(cartId, cart);

        ctx.res().setStatus(200);
    }

    @Override
    public boolean validatePrimaryKey(Integer integer) {
        return dao.validatePrimaryKey(integer);
    }

    @Override
    public Cart validateEntity(Context ctx) {
        // Implement validation logic for Cart entity here
        return null;
    }
}