function Search(searchVM){
    
    var btnVM = searchVM.querySelector('.search-btn');
    var inputVM = searchVM.querySelector('.search-input');

    btnVM.addEventListener('click', function() {
        inputVM.focus();
    })
}

(function initSearchs(){
    var searchs = document.querySelectorAll('.search');
    for(var search = 0; search < searchs.length; search++){
        new Search(searchs[search]);
    }
})();