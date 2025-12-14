const Submission = () => {
    return (
        <div>
            <h2>submittion</h2>
        </div>
    );
};

export default Submission;

class Student {
    constructor(name, age, roll, result) {
        this.name = name;
        this.age = age;
        this.roll = roll;
        this.result = result;
    }
    getStudent() {
        return `${this.name},${this.age},${this.roll},${this.result}`;
    }
}

const newStudent = new Student("imran", 23, 1158024473, 5.0);
const pass = newStudent.getStudent();
console.log(pass);
