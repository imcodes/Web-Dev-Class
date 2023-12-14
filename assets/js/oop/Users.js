export class User {
    constructor(name,age){
        this.setName(name)
        this.setAge(age)
        // console.log('New User instance created')
    }
     
    setName(name){
        this.name = name
    }
    setAge(age){
        this.age = age
    }

    getName(){
        return this.name
    }

    getAge(){
        return this.age
    }

    talk(){
        alert(`Hello My name is ${this.name} and I'm ${this.age} years old`) 
    }
}




