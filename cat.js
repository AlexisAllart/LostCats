class Cat{
    constructor(id,name,breed,size,weight,age,date,location,image,comment,found){
        this.id=id;
        this.name=name;
        this.breed=breed;
        this.size=size;
        this.weight=weight;
        this.age=age;
        this.date=date;
        this.location=location;
        this.image=image;
        this.comment=comment;
        this.found=found;
    }
    getId(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getBreed(){
        return this.breed;
    }
    getSize(){
        return this.size;
    }
    getWeight(){
        return this.weight;
    }
    getAge(){
        return this.age;
    }
    getDate(){
        return this.date;
    }
    getLocation(){
        return this.location;
    }
    getImage(){
        return this.image;
    }
    getComment(){
        return this.comment;
    }
    getFound(){
        return this.found;
    }
    setId(param){
        this.id=param;
    }
    setName(param){
        this.name=param;
    }
    setBreed(param){
        this.breed=param;
    }
    setSize(param){
        this.size=param;
    }
    setWeight(param){
        this.weight=param;
    }
    setAge(param){
        this.age=param;
    }
    setDate(param){
        this.date=param;
    }
    setLocation(param){
        this.location=param;
    }
    setImage(param){
        this.image=param;
    }
    setComment(param){
        this.comment=param;
    }
    setFound(param){
        this.found=param;
    }
}
module.exports=Cat;