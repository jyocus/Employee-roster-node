// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    getEmail() {
        return this.email;

    }

    getRole() {
        return "Employee";
    }

}

// var ob = new Employee("Justin", 1, "j@j.com");
// var ob2 = new Employee("Kyle", 2, "k@k.com");
// console.log(ob, ob2);
// ob.getName();

module.exports = Employee;