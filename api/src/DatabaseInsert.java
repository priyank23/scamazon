import java.io.*;
import java.util.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;

@WebServlet(value={"/insert"})
public class DatabaseInsert extends HttpServlet {
    private ArrayList<Product> products;

    public DatabaseInsert() {
        products = new ArrayList<Product>();

        products.add(new Product("1", "Levis", 2000, "Men's Shirt", false, 0));
        products.add(new Product("2", "Pepe Jeans", 4000, "Men's Shirt", true, (float)20.5));
        products.add(new Product("3", "Roadster", 1499, "Men's Shirt", true, 60 ));
        products.add(new Product("4", "Levis", 1799, "Men's Shirt", true, 35));
        products.add(new Product("5", "Highlander", 999, "Men's Shirt", false, 0));
        products.add(new Product("6", "Wrogn", 1319, "Men's Shirt", false, 0));
        products.add(new Product("7", "Levis", 844, "Men's t-shirt", false, 0));
        products.add(new Product("8", "Calvin Klein", 4599, "Men's t-shirt", true, 45));
        products.add(new Product("9", "Nike", 4995, "Men's t-shirt", true, 30));
        products.add(new Product("10", "Adidas", 2999, "Men's t-shirt", false, 0));
        products.add(new Product("11", "Tommy Hilfiger", 2519, "Men's t-shirt", false, 0));
        products.add(new Product("12", "GAP", 4599, "Men's t-shirt", true, 45));
        products.add(new Product("13", "Highlander", 1699, "Men's Jeans", true, 50));
        products.add(new Product("14", "Calvin Klein", 12999, "Men's Jeans", true, 45));
        products.add(new Product("15", "Gant", 9999, "Men's Jeans", true, 40));
        products.add(new Product("16", "Tommy Hilfiger", 5849, "Men's Jeans", false, 0));
        products.add(new Product("17", "Calvin Klein", 6599, "Men's Jeans", false, 0));
        products.add(new Product("18", "GAP", 7599, "Men's Jeans", false, 0));
        products.add(new Product("19", "Sheczzar", 24882, "Women's Dress", true, 45));
        products.add(new Product("20", "Label", 12250, "Women's Dress", false, 0));
        products.add(new Product("21", "Pernia's Pop-Up Shop", 14858, "Women's Dress", false, 0));
        products.add(new Product("22", "Koskii", 16990, "Women's Dress", false, 0));
        products.add(new Product("23", "Puma", 16999, "Women's Dress", true, 30));
        products.add(new Product("24", "Lacoste", 5250, "Women's top", false, 0));
        products.add(new Product("25", "Mango", 5590, "Women's top", false, 0));
        products.add(new Product("26", "Guess", 4999, "Women's top", false, 0));
        products.add(new Product("27", "Mango", 6900, "Women's top", true, 30));
        products.add(new Product("28", "Gucci", 10990, "Women's top", true , 20));
        products.add(new Product("29", "Tokyo Talkies", 1899, "Women's Jeans", true, 55 ));
        products.add(new Product("30", "Levis", 1999, "Women's Jeans", false, 0));
    }
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        Database db = (Database) getServletContext().getAttribute("db");

        PrintWriter out = res.getWriter();
        try {
            for(int i=0;i<products.size();i++) {
                Product p = products.get(i);
                int rows = db.executeUpdate("Insert into products values('" + p.getId() +"',\"" + p.getName() + "\"," + p.getPrice() +");");
                if(p.isDiscounted()) rows += db.executeUpdate("Insert into discounts values('" + p.getId() + "'," + p.getDiscountPerc() + ");");
                rows += db.executeUpdate("Insert into products_category values('" + p.getId() + "',\"" + p.getType() + "\");");
                out.println("(" + p.getId() +"," + p.getName() + "," + p.getPrice() +");" + "\t" + Integer.toString(rows));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        out.println("It's done!");
    }
}