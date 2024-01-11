package dk.lyngby.routes;

import dk.lyngby.controller.impl.ProductController;
import dk.lyngby.security.RouteRoles;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.*;
import static io.javalin.apibuilder.ApiBuilder.delete;

public class ProductRoutes {

    private final ProductController productController = new ProductController();

    protected EndpointGroup getRoutes() {

        return () -> {
            path("/products", () -> {
                post("/", productController::create, RouteRoles.ADMIN, RouteRoles.MANAGER);
                get("/", productController::readAll, RouteRoles.ANYONE);
                get("/fish", productController::readAllFish, RouteRoles.ANYONE);
                get("/{id}", productController::read, RouteRoles.USER, RouteRoles.ADMIN, RouteRoles.MANAGER);
                put("/{id}", productController::update, RouteRoles.ADMIN, RouteRoles.MANAGER);
                delete("/{id}", productController::delete, RouteRoles.ADMIN, RouteRoles.MANAGER);
            });
        };
    }
}