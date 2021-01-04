import java.io.*;
import org.json.simple.*;

class Product {
    private String id;
    private String name;
    private float price;
    private String type;
    private boolean discounted;
    private float discountPerc;
    private String imgSrc;
    private JSONObject jsonObj;

    Product(String id, String name, float price, String type, boolean discounted, float discountPerc, String imgSrc) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.type = type;
        this.discounted = discounted;
        this.discountPerc = discountPerc;
        this.imgSrc = imgSrc;

        jsonObj = new JSONObject();
        jsonObj.put("id", id);
        jsonObj.put("name", name);
        jsonObj.put("price", price);
        jsonObj.put("type", type);
        jsonObj.put("isDeal", discounted);
        jsonObj.put("discount", discountPerc);
        jsonObj.put("imgSrc", imgSrc);
    }

    String getId() {
        return this.id;
    }

    String getName() {
        return this.name;
    }
    
    Float getPrice() {
        return this.price;
    }

    String getType() {
        return this.type;
    }

    String getImg() {
        return this.imgSrc;
    }
    boolean isDiscounted() {
        return this.discounted;
    }

    float getDiscountPerc() {
        if(this.isDiscounted()) return this.discountPerc;
        return 0;
    }

    void setDiscount(float discount) {
        this.discounted = true;
        this.discountPerc = discount;
    }

    JSONObject getJson() {
        return jsonObj;
    }

}