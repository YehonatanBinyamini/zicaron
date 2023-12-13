class Niftar {
    constructor(firstName, lastName, parentsName, isMale, deathDate){
        this.firstName = firstName; 
        this.lastName = lastName; 
        this.parentsName = parentsName; 
        this.isMale = isMale; 
        this.deathDate = deathDate;
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

}

export default Niftar;