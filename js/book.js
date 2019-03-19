new Vue({
    el: '#app',
    data: {
        bookInfo: {},
        recommendedBooks: {},
    },
    // Function run when the webpage loads. sends a request to get information for the book
    // page and sets it as a variable in the vue instance
    created: function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                this.bookInfo = JSON.parse(xhttp.response);
            }
        }
        
        xhttp.open('POST', "/moreBookInfo", true);
        xhttp.setRequestHeader("Content-type", "text");
        xhttp.send("load");

        var xhttpRecommend = new XMLHttpRequest();
        xhttpRecommend.onreadystatechange = () => {
            if (xhttpRecommend.readyState == 4 && xhttpRecommend.status == 200) {
                this.recommendedBooks = JSON.parse(xhttpRecommend.response);
            }
        }
        
        xhttpRecommend.open("POST", "/recommendedBooks");
        xhttpRecommend.setRequestHeader("Content-type", "text");
        xhttpRecommend.send("load");
    },

    methods: {
        // method to go view other book information
        moreInfo: function(book_name) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.response == "failure") {
                        alert("Cannot find book information");
                    } else {
                        window.location.href = "/book.html";
                    }
                }
            }
            xhttp.open('POST', '/moreInfo');
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({title: book_name}));
        }
    }
})