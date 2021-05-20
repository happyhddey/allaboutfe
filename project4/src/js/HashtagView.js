class HashtagView{

    constructor(text, order){
        this.$hashtag = document.createElement('button');
        this.addClass('hashtag');
        this.setText(text);
        this.setOrder(order);

        const orderScale = 50;
        const selectedMark = "selected";
        this.selectedState = new SelectedState(this, orderScale, selectedMark);
        this.unselectedState = new UnselectedState(this, orderScale, selectedMark);
        this.state = this.unselectedState;

        this.setAction();
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

    setAction(){
        this.$hashtag.onclick = () => {
            this.state.selectHashtag();
        }
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
        for (name of classNames){
            this.$hashtag.classList.add(name);
        }
    }

    removeClass(...classNames){
        for(name of classNames){
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

    selectHashtag(){
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

    selectHashtag(){
        this.setSelected();
        this.flipOrder();
        this.hashtagView.setState(this.hashtagView.getSelectedState());
    }
}