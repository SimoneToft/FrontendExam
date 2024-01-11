package dk.lyngby.routes;

import dk.lyngby.controller.impl.CartController;
import dk.lyngby.controller.impl.ProductController;
import dk.lyngby.security.RouteRoles;
import io.javalin.apibuilder.EndpointGroup;

import static io.javalin.apibuilder.ApiBuilder.*;
import static io.javalin.apibuilder.ApiBuilder.delete;

public class CartRoutes {

    private final CartController cartController = new CartController();

    protected EndpointGroup getRoutes() {

        return () -> {
            path("/carts", () -> {
                post("/", cartController::create, RouteRoles.ADMIN, RouteRoles.MANAGER);
                post("/{id}/products/{productId}", cartController::addProductToCart, RouteRoles.USER, RouteRoles.ADMIN, RouteRoles.MANAGER);
                get("/", cartController::readAll, RouteRoles.ANYONE);
                get("/{id}", cartController::read, RouteRoles.USER, RouteRoles.ADMIN, RouteRoles.MANAGER);
                put("/{id}", cartController::update, RouteRoles.ADMIN, RouteRoles.MANAGER);
                delete("/{id}", cartController::delete, RouteRoles.ADMIN, RouteRoles.MANAGER);
            });
        };
    }
}