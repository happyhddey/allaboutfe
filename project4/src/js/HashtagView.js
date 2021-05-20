class HashtagView{

    constructor(text, order){
        this.$hashtag = document.createElement('button');
        this.addClass('hashtag');
        this.setText(text);
        this.setOrder(order);
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

    containClass(...classNames){
        let containAll = true;
        for(name of classNames){
            if(!this.$hashtag.classList.contains(name)){
                containAll = false;
            }
        }
        return containAll;
    }

    setText(text){
        this.$hashtag.innerText = text;
    }

    setOrder(order){
        this.$hashtag.style.order = order;
    }

    setSelected(){
        const selectedMark = "selected";
        if(this.containClass(selectedMark)){
            this.removeClass(selectedMark);
        } else{
            this.addClass(selectedMark);
        }
    }

    flipOrder(){
        const currentOrder = parseInt(this.$hashtag.style.order, 10);
        const changedOrder = currentOrder > 0 ? (currentOrder - 50) : (currentOrder + 50);
        this.setOrder(changedOrder);
    }

    getDom(){
        return this.$hashtag;
    }
}

class HashtagView2{

    constructor(){
        this.$hashtag = document.createElement('button');
        this.selectedState = new SelectedState(this);
        this.unselectedState = new UnselectedState(this);
    }

    setOrder(){
        this.state.setOrder();
    }
}

class SelectedState{
    
    constructor(hashtagView){
        this.hashtagView = hashtagView;
        this.orderScale = 50;
        this.selectedMark = "selected";
    }

    flipOrder(){
        const currentOrder = parseInt(this.$hashtag.style.order, 10);
        this.hashtagView.setOrder(currentOrder + this.orderScale);
    }

    setSelected(){
        this.hashtagView.removeClass(selectedMark);
    }
}

class UnselectedState{
    constructor(hashtagView){
        this.hashtagView = hashtagView;
        this.orderScale = 50;
        this.selectedMark = "selected";
    }

    flipOrder(){
        const currentOrder = parseInt(this.$hashtag.style.order, 10);
        this.hashtagView.setOrder(currentOrder - this.orderScale);
    }

    setSelected(){
        this.hashtagView.addClass(selectedMark);
    }
}


const hashtagView = new HashtagView("good", 3);
const hashtag = hashtagView.getDom();
hashtagView.setSelected();
hashtagView.setSelected();
hashtagView.flipOrder();
console.log(hashtag);
