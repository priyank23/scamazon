import java.io.*;
import java.sql.ResultSet;
import org.json.simple.*;

class Wishlist {
    private String username;
    private JSONArray wishlist; 
    private Database db;

    Wishlist(String username, Database db) {
        this.username = username;
        this.db = db;
        wishlist = new JSONArray();
        try {
            ResultSet rs = db.executeQuery("SELECT product_id, quantity from users_wishlist where username = \""+ username + "\";");
            if(!rs.isBeforeFirst()) {
               //pass 
            } else {
                while(rs.next()) {
                    JSONObject obj = new JSONObject();
                    JSONObject jsonObj = new JSONObject();
                    
                    ResultSet pr = db.executeQuery("select * from (select * from (select * from products natural join products_category) as p left join discounts on p.product_id = discounts.id) as a where a.product_id = \""+ rs.getString("product_id") +"\";");
                    
                    while(pr.next()) {
                        Object discount = pr.getFloat("discount");
                        jsonObj.put("id", pr.getString("product_id"));
                        jsonObj.put("name", pr.getString("name"));
                        jsonObj.put("price", pr.getFloat("price"));
                        jsonObj.put("type", pr.getString("type"));
                        jsonObj.put("isDeal", pr.getString("id") == null? false: true);
                        jsonObj.put("discount", discount == null? 0: (float)discount);
                        jsonObj.put("imgSrc", pr.getString("imgSrc"));
                    }

                    obj.put("product", jsonObj);
                    obj.put("quantity", rs.getInt("quantity"));

                    wishlist.add(obj);
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    Wishlist(String username, JSONArray wishlist, Database db) {
        this.username = username;
        this.wishlist = wishlist;
        this.db = db;
    }

    void add(JSONObject product) {
        try{
            ResultSet rs = db.executeQuery("Select * from users_wishlist where username = \"" + this.username+"\" and product_id = \"" + (String)product.get("id") + "\"" );
            if(!rs.isBeforeFirst()) {
                int r = db.executeUpdate("INSERT into users_wishlist values(\""+ this.username + "\", \"" + (String)product.get("id") + "\", 1)");
            }
            while(rs.next()) {
                int r = db.executeUpdate("UPDATE users_wishlist set quantity = " + Integer.toString(rs.getInt("quantity")+1) + " where username = \"" + this.username+"\"" + "and product_id = \"" + (String)product.get("id") + "\"" );
            }

            rs = db.executeQuery("SELECT * from user_preferences where username = \"" + this.username + "\" and product_type = \""+ (String)product.get("type") + "\" and isDeal = " + (boolean)product.get("isDeal"));
            if(!rs.isBeforeFirst()) {
                int r = db.executeUpdate("INSERT into user_preferences values(\"" + this.username + "\", \"" + (String)product.get("type") + "\", 1, " + (boolean)product.get("isDeal") + ");");
            }
            while(rs.next()) {
                int r = db.executeUpdate("UPDATE user_preferences set accesses = " + Integer.toString(rs.getInt("accesses")+1) + " whre username = \"" + this.username + "\" and product_type = \"" + (String)product.get("type") + "\"");
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    void remove(JSONObject product) {
        try{
            ResultSet rs = db.executeQuery("Select * from users_wishlist where username = \"" + this.username+"\"" + "and product_id = \"" + (String)product.get("id") + "\"" );
            while(rs.next()) {
                int r;
                if(rs.getInt("quantity") > 1) r = db.executeUpdate("UPDATE users_wishlist set quantity = " + Integer.toString(rs.getInt("quantity")-1) + " where username = \"" + this.username+"\"" + "and product_id = \"" + (String)product.get("id") + "\"" );
                else r = db.executeUpdate("DELETE from users_wishlist where username = \"" + this.username+"\"" + "and product_id = \"" + (String)product.get("id") + "\"" );
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    JSONArray getWishlist() {
        return this.wishlist;
    }

    String getUser() {
        return this.username;
    }
}