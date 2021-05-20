class HashtagView{


    moveHashtag($hashtag){
        const currentOrder = $hashtag.style.order;
        let changedOrder = 0
        if(currentOrder > 0){
            changedOrder = -50 + currentOrder;
        } else{
            changedOrder = currentOrder - 50;
        }
        $hashtag.style.order = changedOrder;
    }
}

function makeHashtag(hashtagText, order){
    const $hashtag = document.createElement('button');
    $hashtag.classList.add('hashtag');
    $hashtag.innerText = hashtagText;
    
    return $hashtag;
}

function test(list){
    const $hashtagList = document.createElement('div');
    $hashtagList.classList.add('tag-list')

    for(let i=0; i<list.length; i++){
        hashtag = list[i];
        const $hashtag = makeHashtag(hashtag.name, hashtag.order);
        $hashtagList.appendChild($hashtag);
    }

    return $hashtagList;
}