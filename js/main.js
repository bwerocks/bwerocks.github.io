;(function() {
    document.body.addEventListener && document.body.addEventListener('click',
        function(e) {
            if(e.target.tagName === 'A') {
                e.preventDefault();
                window.open(e.target.href);
            }
        }
    );
}());
