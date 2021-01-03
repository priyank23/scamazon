import java.util.ArrayList;
import java.sql.*;

class Products {
    private ArrayList<Product> products;
    Products(Database db) {
        products = new ArrayList<Product>();
        try {
            ResultSet resultSet = db.executeQuery("select * from (select * from products natural join products_category) as p left join discounts on p.product_id = discounts.id;");
            while (resultSet.next()){
                Object discount = resultSet.getFloat("discount");
                products.add(new Product(resultSet.getString("product_id"), resultSet.getString("name"), resultSet.getFloat("price"), resultSet.getString("type"), resultSet.getString("id") == null? false: true, discount == null? 0: (float)discount));
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    ArrayList<Product> getProducts() {
        return products;
    }
}