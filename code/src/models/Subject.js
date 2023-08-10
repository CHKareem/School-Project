export default class Subject {
    constructor(id,name,sclass,hoursInWeek, subjectDays, allowMultiSessionsInDay,optional,weight){
        this.id = id
        this.name = name
        this.sclass = sclass
        this.hoursInWeek = hoursInWeek
        this.subjectDays = subjectDays
        this.allowMultiSessionsInDay = allowMultiSessionsInDay
        this.optional = optional
        this.weight = weight
    }
}