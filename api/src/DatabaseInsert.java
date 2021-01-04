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

        products.add(new Product("1", "Levis", 2000, "Men's Shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/7488102/2019/8/22/8002a744-0dad-4dbb-9481-cf0090134c3b1566454086786-Dennis-Lingo-Men-Pink-Slim-Fit-Solid-Casual-Shirt-9891566454-1.jpg"));
        products.add(new Product("2", "Pepe Jeans", 4000, "Men's Shirt", true, (float)20.5, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/7460073/2018/9/21/1c88b4ea-b2b3-4c75-b1f5-82bff7252d8b1537519651731-NA-1711537519651556-1.jpg"));
        products.add(new Product("3", "Roadster", 1499, "Men's Shirt", true, 60 , "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/13156826/2020/12/19/efddf261-fddf-4b62-823b-ab70326849bc1608381566492-Louis-Philippe-Sport-Men-Shirts-2561608381564554-1.jpg"));
        products.add(new Product("4", "Levis", 1799, "Men's Shirt", true, 35, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/2/20/d960d006-e3a0-43bf-8be5-d8fe407de7b21582150504474-1.jpg"));
        products.add(new Product("5", "Highlander", 999, "Men's Shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10328527/2019/8/6/4b411f75-f724-468e-b15c-4128bd0149661565071016363-Louis-Philippe-Sport-Men-Shirts-8481565071014708-1.jpg"));
        products.add(new Product("6", "Wrogn", 1319, "Men's Shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10401717/2019/8/23/31a275ab-ef20-4f97-a80c-64077c38a5761566552407597-Louis-Philippe-Sport-Men-Shirts-4271566552405300-1.jpg"));
        products.add(new Product("7", "Levis", 844, "Men's t-shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11165778/2020/8/28/52bd2372-8b7e-4dc7-90fa-e4e5a10987c61598600600900-Levis-Men-Tshirts-8781598600599335-1.jpg"));
        products.add(new Product("8", "Calvin Klein", 4599, "Men's t-shirt", true, 45, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11370112/2020/11/24/549538f0-5cdb-4a0e-a460-63cf3ecb19871606207422941-Calvin-Klein-Jeans-Men-Tshirts-6371606207420961-1.jpg"));
        products.add(new Product("9", "Nike", 4995, "Men's t-shirt", true, 30, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12318532/2020/10/8/ef8608cd-83c6-495f-80a7-a85311be2d891602140325286-Calvin-Klein-Jeans-Men-Tshirts-5021602140323552-1.jpg"));
        products.add(new Product("10", "Adidas", 2999, "Men's t-shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11528892/2020/5/21/032c208d-a41d-4158-b606-852897982f501590082585476JacketsADIDASMenJacketsADIDASMenJacketsADIDASMenJacketsADIDA1.jpg"));
        products.add(new Product("11", "Tommy Hilfiger", 2519, "Men's t-shirt", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12765782/2020/11/20/05bdfbe1-015e-419b-a6a8-bc73f4c769491605848451013-Tommy-Hilfiger-Men-Navy-Blue-Back-Striped-Polo-Collar-T-shir-1.jpg"));
        products.add(new Product("12", "GAP", 4599, "Men's t-shirt", true, 45, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/12/5/1e3e79e8-66f7-4a41-9ad5-cf93023f8d8e1607160154727-1.jpg"));
        products.add(new Product("13", "Highlander", 1699, "Men's Jeans", true, 50, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10064529/2019/8/23/e2101e71-8707-4110-961a-14b675a574481566552597315-Roadster-Men-Jeans-4211566552597089-1.jpg"));
        products.add(new Product("14", "Calvin Klein", 12999, "Men's Jeans", true, 45, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11165276/2020/10/7/d33366c5-9ff0-4cd2-84f8-e11c4b58d10d1602061445398-Levis-Men-Jeans-241602061442891-1.jpg"));
        products.add(new Product("15", "Gant", 9999, "Men's Jeans", true, 40, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2524977/2018/7/27/58bee568-4d0a-4dec-a364-50623789d42c1532693715068-Roadster-Men-Jeans-1371532693713186-1.jpg"));
        products.add(new Product("16", "Tommy Hilfiger", 5849, "Men's Jeans", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12358398/2020/12/18/e3ef29fe-3b49-44b4-b681-b9cac2ae9e0a1608274638327-Roadster-Men-Jeans-2451608274635560-1.jpg"));
        products.add(new Product("17", "Calvin Klein", 6599, "Men's Jeans", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2343294/2018/2/7/11518001366575-HIGHLANDER-Men-Blue-Slim-Fit-Mid-Rise-Clean-Look-Stretchable-Jeans-7081518001366381-1.jpg"));
        products.add(new Product("18", "GAP", 7599, "Men's Jeans", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/2344421/2018/8/30/c44a5caf-e123-4ba6-bb6a-cf2bfc4b05941535610456653-Moda-Rapido-Men-Black-Skinny-Fit-Mid-Rise-Slash-Knee-Stretch-1.jpg"));
        products.add(new Product("19", "Sheczzar", 24882, "Women's Dress", true, 45, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/12/4/0295d98e-02b4-4873-ab06-358ce7f8ffc51607081556515-1.jpg"));
        products.add(new Product("20", "Label", 12250, "Women's Dress", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/12924092/2020/11/26/e03820cc-25e1-40d0-adda-e2792b3975ea1606385415573-Label-Ritu-Kumar-Women-Grey--Golden-Embroidered-Fringed-Maxi-1.jpg"));
        products.add(new Product("21", "Pernia's Pop-Up Shop", 14858, "Women's Dress", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/11/30/2ee9d8d1-142a-48fa-b1c8-f1e29fb498a41575114261877-1.jpg"));
        products.add(new Product("22", "Koskii", 16990, "Women's Dress", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/1/9/008227c7-6444-42de-89b9-ac5f393399661578528999923-5.jpg"));
        products.add(new Product("23", "Puma", 16999, "Women's Dress", true, 30, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/8325091/2020/10/27/a09432a9-4323-447b-ad14-219bd9c9f3411603800077269-Levis-Women-Dresses-1281603800075176-1.jpg"));
        products.add(new Product("24", "Lacoste", 5250, "Women's top", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2020/12/8/80038a13-b59a-449b-866b-225c58cb24c61607423698369-1.jpg"));
        products.add(new Product("25", "Mango", 5590, "Women's top", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/959175/2015/12/3/11449133412579-GUESS-Coral-Orange-Sheer-Shirt-2001449133411915-1.jpg"));
        products.add(new Product("26", "Guess", 4999, "Women's top", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/v1/image/style/properties/886198/GUESS-White-Shirt_1_620483a6d4840893796cb8581d426b51.jpg"));
        products.add(new Product("27", "Mango", 6900, "Women's top", true, 30, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/productimage/2019/1/23/665c77c6-6a10-43d5-81dd-6972f7e798bc1548218362533-1.jpg"));
        products.add(new Product("28", "Gucci", 10990, "Women's top", true , 20, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/10657266/2020/9/16/8c4bf966-b067-418e-a9b4-57b8e323dd351600255803868MANGOWomenBeigeBlackStraightFitCheckedRegularTrousersTopsMAN1.jpg"));
        products.add(new Product("29", "Tokyo Talkies", 1899, "Women's Jeans", true, 55, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/9072671/2019/5/30/c1e8d724-a619-445c-a993-9d5e4d59a5891559218842602-Moda-Rapido-Women-Black-Skinny-Fit-High-Rise-Clean-Look-Stre-1.jpg" ));
        products.add(new Product("30", "Levis", 1999, "Women's Jeans", false, 0, "https://assets.myntassets.com/f_webp,dpr_1.0,q_60,w_210,c_limit,fl_progressive/assets/images/11184446/2020/9/24/7d9a49ea-43bc-4a07-9745-e0ff10b7ffaf1600938496310-Levis-Women-Jeans-9061600938493698-1.jpg"));
    }
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        Database db = (Database) getServletContext().getAttribute("db");

        PrintWriter out = res.getWriter();
        try {
            for(int i=0;i<products.size();i++) {
                Product p = products.get(i);
                int rows = db.executeUpdate("Insert into products values('" + p.getId() +"',\"" + p.getName() + "\"," + p.getPrice() +");");
                if(p.isDiscounted()) rows += db.executeUpdate("Insert into discounts values('" + p.getId() + "'," + p.getDiscountPerc() + ");");
                rows += db.executeUpdate("Insert into products_category values('" + p.getId() + "',\"" + p.getType() + "\", \""+ p.getImg()+ "\");");
                out.println("(" + p.getId() +"," + p.getName() + "," + p.getPrice() +");" + "\t" + Integer.toString(rows));
            }
        } catch(SQLException e) {
            e.printStackTrace();
        }
        out.println("It's done!");
    }
}