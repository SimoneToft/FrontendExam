package dk.lyngby.dao.impl;

import dk.lyngby.dao.IDao;
import dk.lyngby.model.Cart;
import dk.lyngby.model.Product;
import dk.lyngby.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.TypedQuery;

import java.util.List;

public class ProductDao implements IDao <Product, Integer> {
    private static ProductDao instance;
    private static EntityManagerFactory emf;
    public static ProductDao getInstance(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new ProductDao();
        }
        return instance;
    }

    @Override
    public Product read(Integer integer) {
        try (var em = emf.createEntityManager())
        {
            return em.find(Product.class, integer);
        }
    }

    @Override
    public List<Product> readAll() {
        try (var em = emf.createEntityManager())
        {
            var query = em.createQuery("SELECT h FROM Product h", Product.class);
            return query.getResultList();
        }
    }

    @Override
    public Product create(Product product) {
        try (var em = emf.createEntityManager())
        {
            em.getTransaction().begin();
            em.persist(product);
            em.getTransaction().commit();
            return product;
        }
    }

    @Override
    public Product update(Integer integer, Product product) {
        try(var em = emf.createEntityManager()) {
            em.getTransaction().begin();

            var h = em.find(Product.class, integer);
            h.setProductName(product.getProductName());
            h.setProductPrice(product.getProductPrice());
            Product merge = em.merge(h);
            em.getTransaction().commit();
            return merge;
        }
    }


    public List<Product> readAllByCategory(String category) {
        try(EntityManager em = emf.createEntityManager())
        {
            TypedQuery<Product> q1 = em.createQuery("SELECT p FROM Product p WHERE LOWER(p.productCategory) = LOWER(:category)", Product.class);
            q1.setParameter("category", category.toLowerCase());
            return q1.getResultList();
        }
    }

    @Override
    public void delete(Integer integer) {
        try(var em = emf.createEntityManager()) {
            em.getTransaction().begin();
            var hotel = em.find(Product.class, integer);
            em.remove(hotel);
            em.getTransaction().commit();
        }
    }

    @Override
    public boolean validatePrimaryKey(Integer integer) {
        try(var em = emf.createEntityManager()) {
            var person = em.find(Product.class, integer);
            return person != null;
        }
    }
}
