import {HashtagContainerView} from './HashtagContainerView.js'


class HashtagContainerList{
    constructor(hashtagTitle, hashtagList){
        this.hashtagContainer = {};
        this.hashtagContainer[hashtagTitle] = new HashtagContainerView(hashtagTitle, hashtagList, this);
        const body = document.getElementsByClassName("hashtag-container-list")[0];
        body.appendChild(this.hashtagContainer[hashtagTitle].getDom());
    }

    report(hashtagTitle, hashtagName){
        console.log(hashtagTitle, hashtagName);
    }

    click(hashtagTitle, hashtagName){
        this.hashtagContainer[hashtagTitle].click(hashtagName);
    }
}