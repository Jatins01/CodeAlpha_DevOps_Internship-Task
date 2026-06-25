package org.example;

public class Student {

    private int id;
    private String name;
    private double marks;

    public Student(int id, String name, double marks) {
        this.id = id;
        this.name = name;
        this.marks = marks;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getMarks() {
        return marks;
    }

    @Override
    public String toString() {
    return """
            ----------------------------
            ID    : %d
            Name  : %s
            Marks : %.2f
            ----------------------------
            """.formatted(id, name, marks);
    }
}