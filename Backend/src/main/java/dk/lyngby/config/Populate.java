package dk.lyngby.config;

import dk.lyngby.model.Product;
import jakarta.persistence.EntityManagerFactory;

import java.util.Set;

public class Populate {
    public static void main(String[] args) {

        EntityManagerFactory emf = HibernateConfig.getEntityManagerFactory();

        try (var em = emf.createEntityManager()) {
            em.getTransaction().begin();
            Product fish1 = new Product("Angelfish", "Fish", "Pterophyllum scalare", 7,"src/assets/images/angelfish.jpg");
            Product fish2 = new Product("Clownfish", "Fish", "Amphiprioninae", 15,"https://www.starfish.ch/photos/fishes-Fische/damselfishes-Riffbarsche/Amphiprion-ocellaris11.jpg");
            Product fish3 = new Product("Royal Gramma", "Fish", "Gramma loreto", 25,"https://freakincorals.com/cdn/shop/products/lg_72329_Royal_Gramma_Basslet_576x.jpg?v=1601919573");
            Product fish4 = new Product("Blue Tang", "Fish", "Paracanthurus hepatus", 30,"https://www.monaconatureencyclopedia.com/wp-content/uploads/2008/08/1-Paracanthurus-hepatus-%C2%A9-Giuseppe-Mazza.jpg");
            Product fish5 = new Product("Garryfish", "Fish", "Garryfish", 4,"http://localhost:5173/src/assets/images/garryfish.jpg");


            em.persist(fish1);
            em.persist(fish2);
            em.persist(fish3);
            em.persist(fish4);
            em.persist(fish5);

            Product jellyfish = new Product("Moon Jellyfish", "Invertebrates", "Aurelia aurita", 20, "https://www.eopugetsound.org/sites/default/files/styles/magazinewidth_592px/public/topical_article/images/moon_jellyfish.jpg?itok=Esreg6zX");
            Product anemone = new Product("Anemone", "Invertebrates", "Rose Bubble Tip", 140, "https://static.wixstatic.com/media/f14946_e93a30d15ec24361805c00b3f721ddd1~mv2.jpg/v1/fill/w_2034,h_2036,al_c,q_85/f14946_e93a30d15ec24361805c00b3f721ddd1~mv2.jpg");
            Product snail = new Product("Snail", "Invertebrates", "Astraea Turbo", 2, "https://www.abyssaquatics.co.uk/wp-content/uploads/2020/10/100073-1.jpg");
            Product shrimp = new Product("Fire Blood Shrimp", "Invertebrates", "Lysmata debelius", 65, "https://www.oceanaquarium.com/wp-content/uploads/2012/12/35_fire_shrimp.jpg");
            Product urchin = new Product("Blue Tuxedo Urchin", "Invertebrates", "Mespilia sp.", 29, "https://www.discountcoral.com/cdn/shop/products/BlueTuxedoUrchin.jpg?v=1661358001");

            em.persist(jellyfish);
            em.persist(anemone);
            em.persist(snail);
            em.persist(shrimp);
            em.persist(urchin);


            em.getTransaction().commit();
        }
    }
}
