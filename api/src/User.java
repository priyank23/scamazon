import java.io.*;
import java.util.Date;
import java.sql.*;
import org.json.simple.*;

class User {
    private String username;
    private String name;
    private String age;
    private char gender;
    private String email;
    private String scamazon_age;
    private JSONObject jsonObj;
    private Database db;
    private boolean authenticated;

    User(String username, Database db) {
        this.username = username;
        this.db = db;
        this.authenticated = fetchUser();
    }

    boolean fetchUser() { 
        try {
            ResultSet rs = db.executeQuery(String.format("SELECT * from users where username=\"%s\"", username));
            while(rs.next()) {
                // if(!password.equals(rs.getString("password"))) return false;

                this.name = rs.getString("name");
                this.gender = rs.getString("gender").charAt(0);
                this.email = rs.getString("email");

                Date dob = new Date(rs.getDate("dob").getTime());
                Date join_date = new Date(rs.getDate("join_date").getTime());

                long age = ((new Date()).getTime() - dob.getTime()) / 1000 / 60 / 60/ 24;
                long scamazon_age = ((new Date()).getTime() - join_date.getTime()) / 1000 / 60 / 60/ 24;

                this.age = String.format("%dyr %dmo", (int)age/365, ((int)age%365)/30);
                this.scamazon_age = String.format("%dmo %dday", (int)scamazon_age/30, ((int)scamazon_age%30));
            }
        } catch(SQLException e) {
            e.printStackTrace();
            return false;
        }
        jsonObj = new JSONObject();
        jsonObj.put("username", username);
        jsonObj.put("name", name);
        jsonObj.put("age", age);
        jsonObj.put("gender", Character.toString(gender));
        jsonObj.put("email", email);
        jsonObj.put("scamazon_age", scamazon_age);
        jsonObj.put("authenticated", true);

        return true;
    }

    String getUsername() {
        return this.username;
    }

    String getName() {
        return this.name;
    }

    String getAge() {
        return this.age;
    }

    char getGender() {
        return this.gender;
    }

    String getEmail() {
        return this.email;
    }

    JSONObject getJson() {
        return this.jsonObj;
    }

    boolean isCorrect() {
        return this.authenticated;
    }
}