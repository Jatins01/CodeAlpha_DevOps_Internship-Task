package org.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

public class StudentServiceTest {

    @Test
    void testAddStudent() {

        StudentService service = new StudentService();

        Student student = new Student(101, "Jatin", 95);

        service.addStudent(student);

        assertEquals(1, service.getStudents().size());
    }

    @Test
    void testDuplicateStudent() {

        StudentService service = new StudentService();

        service.addStudent(new Student(101, "Jatin", 95));
        service.addStudent(new Student(101, "Rahul", 88));

        assertEquals(1, service.getStudents().size());
    }

    @Test
    void testSearchStudent() {

        StudentService service = new StudentService();

        Student student = new Student(101, "Jatin", 95);

        service.addStudent(student);

        assertNotNull(service.searchStudent(101));
    }

    @Test
    void testSearchStudentNotFound() {

        StudentService service = new StudentService();

        assertNull(service.searchStudent(999));
    }

    @Test
    void testDeleteStudent() {

        StudentService service = new StudentService();

        service.addStudent(new Student(101, "Jatin", 95));

        assertTrue(service.deleteStudent(101));
    }

    @Test
    void testDeleteStudentNotFound() {

        StudentService service = new StudentService();

        assertFalse(service.deleteStudent(500));
    }

    @Test
    void testTotalStudents() {

        StudentService service = new StudentService();

        service.addStudent(new Student(101, "A", 80));
        service.addStudent(new Student(102, "B", 90));

        assertEquals(2, service.totalStudents());
    }

    @Test
    void testAverageMarks() {

        StudentService service = new StudentService();

        service.addStudent(new Student(101, "A", 80));
        service.addStudent(new Student(102, "B", 100));

        assertEquals(90.0, service.averageMarks());
    }

    @Test
    void testGetTopper() {

        StudentService service = new StudentService();

        service.addStudent(new Student(101, "Jatin", 90));
        service.addStudent(new Student(102, "Rahul", 98));

        Student topper = service.getTopper();

        assertEquals(102, topper.getId());
    }

    
}