import {User} from './Users.js'
export class Student extends User{
    constructor(putname,putage,dept){
        super(putname,putage)
        this.setDept(dept)
        console.log('New Student instance created')
    }
    
    setDept(dept = 'no department yet'){
        this.department = dept
    }
    getDept(){
        return this.department
    }
    getDetails(){
        let output = []
        output['age'] = this.getAge()
        output['name'] = this.getName()
        output['department'] = this.getDept()
        return output
    }

    talk(){
        alert(`Hello My name is ${this.name} and I'm a student of ${this.department}. \n I am ${this.age} years old.`) 
    }
}