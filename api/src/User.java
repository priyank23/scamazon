import java.io.*;

class User {
    private String username;
    private String name;
    private int age;
    private char gender;
    private String email;
    private String password;

    User(String username, String name, int age, char gender, String email, String password) {
        this.username = username;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.password = password;
    }

    String getUsername() {
        return this.username;
    }

    String getName() {
        return this.name;
    }

    int getAge() {
        return this.age;
    }

    char getGender() {
        return this.getGender();
    }

    String getEmail() {
        return this.email;
    }

    String getPassword() {
        return this.password;
    }
}