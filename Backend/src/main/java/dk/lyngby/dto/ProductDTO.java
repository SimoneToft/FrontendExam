package dk.lyngby.dto;

import dk.lyngby.model.Product;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class ProductDTO {
    private Integer id;
    private String productName;
    private Integer productPrice;
    private String productCategory;
    private String productText;
    private String productImage;

    public ProductDTO(Product product){
        this.id=product.getProductId();
        this.productName=product.getProductName();
        this.productPrice=product.getProductPrice();
        this.productCategory=product.getProductCategory();
        this.productText=product.getProductText();
        this.productImage=product.getProductImage();
    }
    public static List<ProductDTO> toProductDTOList(List<Product> products) {
        return products.stream().map(ProductDTO::new).collect(Collectors.toList());
    }

}
