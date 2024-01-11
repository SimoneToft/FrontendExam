package dk.lyngby.dto;

import dk.lyngby.model.User;

import java.util.HashSet;
import java.util.Set;

public class OrderDTO {
    private Integer id;

    private User user;

    private Set<ProductDTO> order_items = new HashSet<>();
}
