// API 에서 받아온 hashtag list
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
        value : ["Other", "Academic", "Educator", "Artist", "Clerical", "Admin", "College Student", "Grad Student", "Customer Service", "Doctor", "Healthcare", "Executive", "Managerial", "Farmer", "Homemaker", "K-12 Student", "Lawyer", "Programmer", "Retired", "Sales", "Marketing", "Scientist", "Self-employed", "Technician", "Engineer", "Tradesman", "Craftsman", "Unemployed", "Writer"],
    },
];


const data = new HashtagData(hashtagList).getHashtagList();
