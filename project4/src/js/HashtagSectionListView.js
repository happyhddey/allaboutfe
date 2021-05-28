import {HashtagSectionView} from './HashtagSectionView.js'


export class HashtagSectionListView{
    constructor(hashtagData){
        this.observers = [];

        this.hashtagSection = {};
        const $div = document.getElementsByClassName("hashtag-container-list")[0];
        for(let hashtagTitle in hashtagData){
            const hashtagSectionView = new HashtagSectionView(hashtagTitle, hashtagData[hashtagTitle], this);
            this.hashtagSection[hashtagTitle] = hashtagSectionView;
            $div.appendChild(hashtagSectionView.getDom());
            const $hr = document.createElement('hr');
            $div.appendChild($hr);
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
        this.hashtagSection[hashtagTitle].update(hashtagName);
    }
}