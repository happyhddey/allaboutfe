import {HashtagView} from './HashtagView.js'

class HashtagContainerView{
    constructor(hashtagTitle, hashtagList){
        this.$container = document.createElement('div');

        this.$title = this.makeHashtagTitle(hashtagTitle);
        this.hashtagList = this.makeHashtagList(hashtagList);
        this.$container.appendChild(this.$title);
        for(let hashtagName in this.hashtagList){
            const $hashtag = this.hashtagList[hashtagName].getDom();
            this.$container.appendChild($hashtag);
        }
        this.selectHashtag();
    }

    makeHashtagTitle(title){
        const $title = document.createElement('div');
        $title.classList.add('title');
        $title.innerText = title;

        return $title;
    }

    makeHashtagList(list){
        const hashtagList = {};
        const len = list.length;
        for(let i=0; i<len; i++){
            const hashtag = list[i];
            hashtagList[hashtag.name] = new HashtagView(hashtag.name, hashtag.order);
        }

        return hashtagList;
    }

    selectHashtag(){
        for(let hashtagName in this.hashtagList){
            const hashtagView = this.hashtagList[hashtagName];
            const $hashtag = hashtagView.getDom();
            $hashtag.onclick = () => {
                hashtagView.selectHashtag();
            }
        }
    }

    getDom(){
        return this.$container;
    }
}

const body = document.getElementsByTagName("BODY")[0];
console.log(body);
const hashtagList = [{name:"good", order:3}, {name:"happy", order:38}];
const hashtagContainer = new HashtagContainerView("feeling", hashtagList);
body.appendChild(hashtagContainer.getDom());