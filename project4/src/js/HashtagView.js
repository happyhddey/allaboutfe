/*
HashtagView: hashtag DOM을 관리하기 위한 클래스
hashtag는 button tag로 구현됨
selected와 unselected 두 가지 상태를 가짐
selected state: 선택된 경우. selected class 가지고 있음. order 음수.
unselected state: 선택되지 않은 경우. selected class 없음. order 양수.
*/

export class HashtagView{

    constructor(text, order, container){
        this.$hashtag = document.createElement('button');
        this.addClass('hashtag');
        this.setText(text);
        this.setOrder(order);

        const orderScale = 50;
        const selectedMark = "checked";
        this.selectedState = new SelectedState(this, orderScale, selectedMark);
        this.unselectedState = new UnselectedState(this, orderScale, selectedMark);
        this.state = this.unselectedState;

        this.$container = container;

        this.$hashtag.onclick = () => {
            this.$container.report(text);
        }
    }

    update(){
        this.state.update();
    }

    setState(state){
        this.state = state;
    }

    getSelectedState(){
        return this.selectedState;
    }

    getUnselectedState(){
        return this.unselectedState;
    }

    setText(text){
        this.$hashtag.innerText = text;
    }

    setOrder(order){
        this.$hashtag.style.order = order;
    }

    getOrder(){
        return this.$hashtag.style.order;
    }

    addClass(...classNames){
        for (let name of classNames){
            this.$hashtag.classList.add(name);
        }
    }

    removeClass(...classNames){
        for(let name of classNames){
            this.$hashtag.classList.remove(name);
        }
    }

    getDom(){
        return this.$hashtag;
    }
}


class SelectedState{
    
    constructor(hashtagView, orderScale, selectedMark){
        this.hashtagView = hashtagView;
        this.orderScale = orderScale;
        this.selectedMark = selectedMark;
    }

    flipOrder(){
        const currentOrder = parseInt(this.hashtagView.getOrder(), 10);
        this.hashtagView.setOrder(currentOrder + this.orderScale);
    }

    setSelected(){
        this.hashtagView.removeClass(this.selectedMark);
    }

    update(){
        this.setSelected();
        this.flipOrder();
        this.hashtagView.setState(this.hashtagView.getUnselectedState());
    }
}


class UnselectedState{
    constructor(hashtagView, orderScale, selectedMark){
        this.hashtagView = hashtagView;
        this.orderScale = orderScale;
        this.selectedMark = selectedMark;
    }

    flipOrder(){
        const currentOrder = parseInt(this.hashtagView.getOrder(), 10);
        this.hashtagView.setOrder(currentOrder - this.orderScale);
    }

    setSelected(){
        this.hashtagView.addClass(this.selectedMark);
    }

    update(){
        this.setSelected();
        this.flipOrder();
        this.hashtagView.setState(this.hashtagView.getSelectedState());
    }
}