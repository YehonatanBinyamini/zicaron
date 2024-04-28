class Niftar {
    constructor(firstName, lastName, parentsName, isMale, deathDate, id){
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.parentsName = parentsName; 
        this.isMale = isMale; 
        this.deathDate = deathDate;
        this.id = id;
    }

    toString(){
        return `${this.deathDate.date} ${this.deathDate.month} ${this.deathDate.year}: ${this.firstName} ${this.lastName} ${this.isMale ? "בן" : "בת"} ${this.parentsName} ז"ל`
    }

    tooltipString(){
        return `${this.firstName} ${this.lastName} ${this.isMale ? "בן" : "בת"} ${this.parentsName} ז"ל`
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }

    getDeathDate(){
        return `:${this.deathDate.date} ${this.deathDate.month} ${this.deathDate.year}`;
    }

    getRestOfString(){
        return `${this.isMale ? "בן" : "בת"} ${this.parentsName} ז"ל`;
    }

    setId(id){
        this.id = id;
    }
}

export default Niftar;