var bookTracker = document.querySelectorAll(".bookTracker");
var trash = document.getElementsByClassName("fa-trash");

Array.from(bookTracker).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.childNodes[1].innerText
        const author = this.parentNode.childNodes[3].innerText
        const comment = this.parentNode.childNodes[5].innerText
        fetch('update', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'date': date,
            'author': author,
            'comment': comment,
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
    });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.parentNode.childNodes[1].innerText
        const author = this.parentNode.parentNode.parentNode.childNodes[3].innerText
        const comment = this.parentNode.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'author': author,
            'comment': comment,
          })
        }).then(function (response) {
          window.location.reload()
        })
    });
});
