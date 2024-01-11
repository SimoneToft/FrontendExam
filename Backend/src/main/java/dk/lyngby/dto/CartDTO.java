package dk.lyngby.dto;

import dk.lyngby.model.Cart;
import dk.lyngby.model.Product;
import dk.lyngby.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
@Getter
@NoArgsConstructor
public class CartDTO {
    private Integer id;
    private UserDTO user;
    public CartDTO(Cart cart){
        this.id=cart.getId();
        if (cart.getCart_products() != null){
            cart.getCart_products().forEach(product -> cart_items.add(new ProductDTO(product)));
        }
        this.user=new UserDTO(cart.getUser());
    }

    private Set<ProductDTO> cart_items = new HashSet<>();

    public static List<CartDTO> toCartDTOList(List<Cart> carts) {
        return carts.stream().map(CartDTO::new).collect(Collectors.toList());
    }
}
