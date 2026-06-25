package org.example;

import java.util.ArrayList;

public class StudentService {

    private ArrayList<Student> students = new ArrayList<>();

    // Add Student
    // Add Student
    public void addStudent(Student student) {

        for (Student s : students) {
            if (s.getId() == student.getId()) {
            System.out.println("Student ID already exists!");
            return;
            }
        }

        students.add(student);
        System.out.println("Student added successfully!");
    }

    // View All Students
    public void viewStudents() {
        if (students.isEmpty()) {
            System.out.println("No students found.");
            return;
        }

        for (Student student : students) {
            System.out.println(student);
        }
    }

    // Search Student by ID
    public Student searchStudent(int id) {

        for (Student student : students) {
            if (student.getId() == id) {
            return student;
            }
        }

        return null;
    }

    public boolean deleteStudent(int id) {

        var iterator = students.iterator();

        while (iterator.hasNext()) {

            Student student = iterator.next();

            if (student.getId() == id) {
            iterator.remove();
            return true;
            }
        }

        return false;
    }

    // Total Students
    public int totalStudents() {
        return students.size();
    }

    // Average Marks
    public double averageMarks() {

        if (students.isEmpty()) {
            return 0;
        }

        double total = 0;

        for (Student student : students) {
            total += student.getMarks();
        }

        return total / students.size();
    }

    // Show Topper
    public Student getTopper() {

        if (students.isEmpty()) {
            return null;
        }

        Student topper = students.get(0);

        for (Student student : students) {

            if (student.getMarks() > topper.getMarks()) {
                topper = student;
            }

        }

        return topper;
    }

    public ArrayList<Student> getStudents() {
        return students;
    }
}