package org.example;

import java.util.Scanner;

public class App {

    private static final int ADD_STUDENT = 1;
    private static final int VIEW_STUDENTS = 2;
    private static final int SEARCH_STUDENT = 3;
    private static final int DELETE_STUDENT = 4;
    private static final int TOTAL_STUDENTS = 5;
    private static final int AVERAGE_MARKS = 6;
    private static final int SHOW_TOPPER = 7;
    private static final int EXIT = 8;

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        StudentService studentService = new StudentService();

        while (true) {

            printMenu();

            int choice = readInt(scanner, "Enter your choice: ");

            switch (choice) {

                case ADD_STUDENT:

                    int id = readInt(scanner, "Enter Student ID: ");
                    scanner.nextLine();

                    System.out.print("Enter Student Name: ");
                    String name = scanner.nextLine();

                    double marks = readDouble(scanner, "Enter Student Marks: ");

                    Student student = new Student(id, name, marks);
                    studentService.addStudent(student);
                    break;

                case VIEW_STUDENTS:
                    studentService.viewStudents();
                    break;

                case SEARCH_STUDENT:

                    int searchId = readInt(scanner, "Enter Student ID to search: ");

                    Student foundStudent = studentService.searchStudent(searchId);

                    if (foundStudent != null) {
                        System.out.println("\nStudent Found");
                        System.out.println(foundStudent);
                    } else {
                        System.out.println("Student not found.");
                    }

                    break;

                case DELETE_STUDENT:

                    int deleteId = readInt(scanner, "Enter Student ID to delete: ");

                    boolean deleted = studentService.deleteStudent(deleteId);

                    if (deleted) {
                        System.out.println("Student deleted successfully!");
                    } else {
                        System.out.println("Student not found.");
                    }

                    break;

                case TOTAL_STUDENTS:
                    System.out.println("Total Students : " + studentService.totalStudents());
                    break;

                case AVERAGE_MARKS:
                    System.out.printf("Average Marks : %.2f%n",
                            studentService.averageMarks());
                    break;

                case SHOW_TOPPER:

                    Student topper = studentService.getTopper();

                    if (topper == null) {
                        System.out.println("No students available.");
                    } else {
                        System.out.println("\nTopper");
                        System.out.println(topper);
                    }

                    break;

                case EXIT:
                    System.out.println("Thank you for using Student Management System.");
                    scanner.close();
                    System.exit(0);

                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    private static void printMenu() {

        System.out.println("\n========== Student Management System ==========");
        System.out.println("1. Add Student");
        System.out.println("2. View Students");
        System.out.println("3. Search Student");
        System.out.println("4. Delete Student");
        System.out.println("5. Total Students");
        System.out.println("6. Average Marks");
        System.out.println("7. Show Topper");
        System.out.println("8. Exit");
    }

    private static int readInt(Scanner scanner, String message) {

        while (true) {

            System.out.print(message);

            if (scanner.hasNextInt()) {
                return scanner.nextInt();
            }

            System.out.println("Invalid input! Please enter a valid number.");
            scanner.next();
        }
    }

    private static double readDouble(Scanner scanner, String message) {

        while (true) {

            System.out.print(message);

            if (scanner.hasNextDouble()) {
                return scanner.nextDouble();
            }

            System.out.println("Invalid input! Please enter a valid decimal number.");
            scanner.next();
        }
    }
}