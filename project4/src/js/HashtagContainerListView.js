import {HashtagContainerView} from './HashtagContainerView.js'


export class HashtagContainerListView{
    constructor(hashtagData){
        this.observers = [];

        this.hashtagContainer = {};
        const $div = document.getElementsByClassName("hashtag-container-list")[0];
        for(let hashtagTitle in hashtagData){
            const hashtagContainerView = new HashtagContainerView(hashtagTitle, hashtagData[hashtagTitle], this);
            this.hashtagContainer[hashtagTitle] = hashtagContainerView;
            $div.appendChild(hashtagContainerView.getDom());
        }
    }

    registerObserver(observer){
        this.observers.push(observer);
    }

    notifyingObservers(type, value){
        for(let observer of this.observers){
            observer.report(type, value);
        }
    }

    report(hashtagTitle, hashtagName){
        this.notifyingObservers(hashtagTitle, hashtagName);
    }

    update(hashtagTitle, hashtagName){
        this.hashtagContainer[hashtagTitle].update(hashtagName);
    }
}