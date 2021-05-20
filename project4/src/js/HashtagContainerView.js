import {HashtagView} from './HashtagView.js'

/*
HashtagContainerView: property 별 hashtag 섹션을 관리하는 클래스
title, list DOM을 만들어서 관리함
list를 받아와서 hashtag list를 만듦
report: button click event 발생 시 해당 함수가 호출됨. title 정보를 덧붙여서 다시 전달.
click: 데이터에 변화가 생기면 해당 함수가 호출됨. HashtagView에 전달.
*/

export class HashtagContainerView{
    constructor(hashtagTitle, hashtagList, containerList){
        this.hashtagList = {};
        this.hashtagTitle = hashtagTitle;
        this.containerList = containerList;

        this.$container = this.makeHashtagContainer(hashtagTitle);
        this.$title = this.makeHashtagTitle(hashtagTitle);
        this.$list = this.makeHashtagList(hashtagList);
        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$list);
    }

    makeHashtagContainer(title){
        const $container = document.createElement('div');
        $container.classList.add('hashtag-container');
        $container.classList.add(title);

        return $container;
    }

    makeHashtagTitle(title){
        const $title = document.createElement('div');
        $title.classList.add('hashtag-title');
        $title.innerText = title.toUpperCase();

        return $title;
    }

    makeHashtagList(list){
        const $list = document.createElement('div');
        $list.classList.add('hashtag-list');
        for(let hashtag of list){
            // DOM을 만드는 부분과 list를 만드는 부분이 섞여있음
            const $hashtag = new HashtagView(hashtag.name, hashtag.order, this);
            this.hashtagList[hashtag.name] = $hashtag;
            $list.appendChild($hashtag.getDom());
        }

        return $list;
    }

    report(hashtagName){
        this.containerList.report(this.hashtagTitle, hashtagName);
    }

    update(hashtagName){
        this.hashtagList[hashtagName].update();
    }

    getDom(){
        return this.$container;
    }
}
