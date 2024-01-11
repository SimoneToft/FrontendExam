package dk.lyngby.controller.impl;

import dk.lyngby.config.HibernateConfig;
import dk.lyngby.controller.IController;
import dk.lyngby.dao.impl.ProductDao;
import dk.lyngby.dto.ProductDTO;
import dk.lyngby.model.Cart;
import dk.lyngby.model.Product;
import io.javalin.http.Context;
import jakarta.persistence.EntityManagerFactory;

import java.util.List;

public class ProductController implements IController<Product, Integer> {
    private final ProductDao dao;
    public ProductController() {
        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();
        this.dao = ProductDao.getInstance(emf);
    }
    @Override
    public void read(Context ctx) {
        // request
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        // entity
        Product product = dao.read(id);
        // dto
        ProductDTO productDTO = new ProductDTO(product);
        // response
        ctx.res().setStatus(200);
        ctx.json(productDTO, ProductDTO.class);
    }

    @Override
    public void readAll(Context ctx) {
        // entity
        List<Product> products = dao.readAll();
        // dto
        List<ProductDTO> productDTOS = ProductDTO.toProductDTOList(products);
        // response
        ctx.res().setStatus(200);
        ctx.json(productDTOS, ProductDTO.class);
    }
    public void readAllFish(Context ctx) {
        // entity
        List<Product> fishProducts = dao.readAllByCategory("Fish");
        // dto
        List<ProductDTO> fishProductDTOs = ProductDTO.toProductDTOList(fishProducts);
        // response
        ctx.res().setStatus(200);
        ctx.json(fishProductDTOs, ProductDTO.class);
    }

    @Override
    public void create(Context ctx) {
        // request
        //Hotel jsonRequest = validateEntity(ctx);
        Product jsonRequest = ctx.bodyAsClass(Product.class);
        // entity
        Product product = dao.create(jsonRequest);
        // dto
        ProductDTO productDTO = new ProductDTO(product);
        // response
        ctx.res().setStatus(201);
        ctx.json(productDTO, ProductDTO.class);
    }

    @Override
    public void update(Context ctx) {
        // request
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        // entity
        Product update = dao.update(id, validateEntity(ctx));
        // dto
        ProductDTO productDTO = new ProductDTO(update);
        // response
        ctx.res().setStatus(200);
        ctx.json(productDTO, Product.class);
    }

    @Override
    public void delete(Context ctx) {
        // request
        int id = ctx.pathParamAsClass("id", Integer.class).check(this::validatePrimaryKey, "Not a valid id").get();
        // entity
        dao.delete(id);
        // response
        ctx.res().setStatus(204);
    }

    @Override
    public boolean validatePrimaryKey(Integer integer) {
        return dao.validatePrimaryKey(integer);
    }

    @Override
    public Product validateEntity(Context ctx) {
        return null;
    }
}
