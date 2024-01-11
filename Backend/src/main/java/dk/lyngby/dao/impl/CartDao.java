package dk.lyngby.dao.impl;

import dk.lyngby.dao.IDao;
import dk.lyngby.model.Cart;
import dk.lyngby.model.Product;
import jakarta.persistence.EntityManagerFactory;

import java.util.List;

public class CartDao implements IDao<Cart, Integer> {
    private static CartDao instance;
    private static EntityManagerFactory emf;

    public static CartDao getInstance(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new CartDao();
        }
        return instance;
    }

    @Override
    public Cart read(Integer integer) {
        try (var em = emf.createEntityManager()) {
            return em.find(Cart.class, integer);
        }
    }

    @Override
    public List<Cart> readAll() {
        try (var em = emf.createEntityManager()) {
            var query = em.createQuery("SELECT c FROM Cart c", Cart.class);
            return query.getResultList();
        }
    }

    @Override
    public Cart create(Cart cart) {
        try (var em = emf.createEntityManager()) {
            em.getTransaction().begin();
            em.persist(cart);
            em.getTransaction().commit();
            return cart;
        }
    }

    @Override
    public Cart update(Integer integer, Cart cart) {
        try (var em = emf.createEntityManager()) {
            em.getTransaction().begin();
            var c = em.find(Cart.class, integer);
            c.setCart_products(cart.getCart_products());
            Cart merge = em.merge(c);
            em.getTransaction().commit();
            return merge;
        }
    }

    public Product getProductById(Integer productId) {
        try (var em = emf.createEntityManager()) {
            return em.find(Product.class, productId);
        }
    }

    @Override
    public void delete(Integer integer) {
        try (var em = emf.createEntityManager()) {
            em.getTransaction().begin();
            var cart = em.find(Cart.class, integer);
            em.remove(cart);
            em.getTransaction().commit();
        }
    }

    @Override
    public boolean validatePrimaryKey(Integer integer) {
        try (var em = emf.createEntityManager()) {
            var cart = em.find(Cart.class, integer);
            return cart != null;
        }
    }
}