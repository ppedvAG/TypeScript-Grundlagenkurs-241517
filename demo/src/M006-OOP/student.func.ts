import { Course } from './student.class';

// Alternative zu Klassen
export function createStudent(firstName: string, lastName: string): Course.Student {
    const fullName = firstName + ' ' + lastName;

    return {
        firstName,
        lastName,
        fullName,
        greet: function () {
            console.log('Hello ' + this.firstName + ' ' + this.lastName);
        },
    };
}

export function createVirtualStudent(nickName: string): Course.Student {
    const student = createStudent(nickName, '');

    const virtualStudent = {
        ...student,
        greet: function () {
            console.log('Hi ' + this.fullName);
        },
    };

    return virtualStudent;
}
