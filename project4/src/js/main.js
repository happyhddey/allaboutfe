// API 에서 받아온 hashtag list
// value 순서가 중요 => hashtag를 정렬할 때 해당 순서를 기준으로 함
/*
response = {[
    {
        type : genres,
        value : [ action, adventure, ... ]
    },
    {
        type : occupation,
        value : [ other, educator, ... ]
    },
    ...
]}

request = {[
    {
        type : genres,
        value : [ action, adventure, ... ]
    },
    {
        type : occupation,
        value : [ educator, teacher, ... ]
    },
    ...
]}
*/

import {HashtagSectionListView} from './HashtagSectionListView.js'
import {HashtagData} from './HashtagData.js'

const hashtagList = [
    {
        type : "genre",
        value : ["Action", "Adventure", "Animation", "Children's", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Film-noir", "Horror", "Musical", "Mystery", "Romance", "Scifi", "Thriller", "War", "Western"],
    },
    {
        type : "gender",
        value : ["Male", "Female"],
    },
    {
        type : "age",
        value : ["0-18", "19-25", "26-35", "36-40", "41-45", "46-50", "51-55", "56-65", "65+"],
    },
    {  
        type : "occupation",
        value : ["Academic", "Educator", "Artist", "Clerical", "Admin", "College Student", "Grad Student", "Customer Service", "Doctor", "Healthcare", "Executive", "Managerial", "Farmer", "Homemaker", "K-12 Student", "Lawyer", "Programmer", "Retired", "Sales", "Marketing", "Scientist", "Self-employed", "Technician", "Engineer", "Tradesman", "Craftsman", "Unemployed", "Writer", "Other"],
    },
];


class Mediator{
    constructor(hashtagList){
        this.hashData = new HashtagData(hashtagList);
        this.hashView = new HashtagSectionListView(this.hashData.getAllHashtagList());
        this.hashData.registerObserver(this);
        this.hashView.registerObserver(this);
    }

    update(type, value){
        console.log(`event reported: ${type}, ${value}`);
        this.hashView.update(type, value);
    }

    report(type, value){
        console.log(`button clicked: ${type}, ${value}`);
        this.hashData.setSelected(type, value);
    }
}

const mediator = new Mediator(hashtagList);
