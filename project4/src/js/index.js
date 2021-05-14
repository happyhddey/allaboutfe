

class HashTag {
    constructor(hashTagName){
        this.selected = false;
        this.name = hashTagName;
    }
}

class HashTagList {
    constructor(hashTagNameList){
        this.hashTagList = [];
        this.makeHashTagList(hashTagNameList);
    }

    makeHashTagList(hashTagNameList){
        for(let hashTagName of hashTagNameList){
            this.hashTagList.push(new HashTag("#" + hashTagName));
        }
    }

    getHashTagByName(hashTagName){
        for(let hashTag of this.hashTagList){
            if(hashTag.name === hashTagName){
                return hashTag;
            }
        }
    }

    isClicked(hashTagName){
        const clickedHashTag = this.getHashTagByName(hashTagName);
        clickedHashTag.selected = !clickedHashTag.selected;
    }

    // sort by the following properties: selected and name
    // 1. selected: true, false
    // 2. name: alphabetical ascending order
    sortBySelectedAndName(a, b){
        if(a.selected === b.selected){
            if(a.name < b.name){
                return -1;
            } else if(a.name > b.name){
                return 1;
            } else{
                return 0;
            }
        } else{
            if(a.selected){
                return -1;
            } else{
                return 1;
            }
        }
        
    }

    getOrderedList(){
        this.hashTagList.sort((a, b) => {
            return this.sortBySelectedAndName(a, b);
        });
        const tempList = [];
        this.hashTagList.forEach((hashTag) => {
            tempList.push(hashTag);
        });
        return tempList;
    }

    printList(){
        this.hashTagList.sort((a, b) => {
            return this.sortBySelectedAndName(a, b);
        });
        for(let hashTag of this.hashTagList){
            console.log(hashTag.name);
        }
    }
}

class HashTagBox {
    constructor(){
        this.hashTagBox = {};
    }

    addHashTagBox(hashTagTitle, hashTagNameList){
        const hashTagList = new HashTagList(hashTagNameList);
        this.hashTagBox[hashTagTitle] = hashTagList;
    }

    getHashTagList(hashTagTitle){
        return this.hashTagBox[hashTagTitle].printList();
    }
}





class HashTagView{
    constructor(hashTagText, order){
        this.$hashTag = document.createElement('button');
        this.$hashTag.classList.add("tag-button");
        this.$hashTag.innerHTML = hashTagText;
        this.checked = false;
        this.setOrder(order);
    }

    setOrder(order){
        this.$hashTag.style.order = order;
    }

    setChecked(){
        if(this.checked){
            this.checked = false;
            this.$hashTag.classList.remove("checked");
        } else{
            this.checked = true;
            this.$hashTag.classList.add("checked");
        }
    }

    getDom(){
        return this.$hashTag;
    }
}

class HashTagListView {
    constructor(hashTagOrderList){
        this.$tagList = document.createElement('div');
        this.$tagList.classList.add("tag-list");
        this.hashTagViewList = {};

        for(let i=0; i<hashTagOrderList.length; i++){
            const hashTagText = hashTagOrderList[i].name;
            const hashTagView = this.makeHashTagView(hashTagText, i);
            this.hashTagViewList[hashTagText] = hashTagView;
            this.appendHashTagDom(hashTagView.getDom())
        }
    }

    makeHashTagView(hashTagText, order){
        return new HashTagView(hashTagText, order);
    }

    appendHashTagDom(hashTagDom){
        this.$tagList.appendChild(hashTagDom);
    }

    reorderHashTagView(hashTagOrderList){
        for(let i=0; i<hashTagOrderList.length; i++){
            const hashTagText = hashTagOrderList[i].name;
            this.hashTagViewList[hashTagText].setOrder(i);
        }
    }

    setChecked(hashTagText){
        this.hashTagViewList[hashTagText].setChecked();
    }

    getList(){
        return this.hashTagViewList;
    }

    getDom(){
        return this.$tagList;
    }
}





const genre = ["Action", "Adventure", "Animation", "Children's", "Comedy", "Crime", "Documentary", "Drama", "Fantasy", "Film-noir", "Horror", "Musical", "Mystery", "Romance", "Scifi", "Thriller", "War", "Western"];
const gender = ["Male", "Female"];
const occupation = ["Other", "Academic", "Educator", "Artist", "Clerical", "Admin", "College Student", "Grad Student", "Customer Service", "Doctor", "Healthcare", "Executive", "Managerial", "Farmer", "Homemaker", "K-12 Student", "Lawyer", "Programmer", "Retired", "Sales", "Marketing", "Scientist", "Self-employed", "Technician", "Engineer", "Tradesman", "Craftsman", "Unemployed", "Writer"];

const array = [[genre, ".genres"], [gender, ".gender"], [occupation, ".occupation"]];
for(let a of array){
    const tagList = new HashTagList(a[0]);
    const tagViewList = new HashTagListView(tagList.getOrderedList());
    
    const $tagBox = document.querySelector(a[1]);
    $tagBox.appendChild(tagViewList.getDom());
    
    const list = tagViewList.getList();
    for(let tagText in list){
        const view = list[tagText].getDom();
        view.onclick = () => {
            list[tagText].setChecked();
            tagList.isClicked(tagText);
            tagViewList.reorderHashTagView(tagList.getOrderedList());
        };
    }
}

