$(document).ready(function() {
    $('#search').submit(function(e) {
        e.preventDefault();
        var mySearch = $('#mySearch').val();
        $.ajax({
            url: '/search',
            data: {
                text: mySearch
            },
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                alert(response.products.toString())
                $('#productLoader').promise().done(function(arg) {
                    this.append(response.products.toString());
                });
            },
            error: function(err) {
                console.log(err);
            }
        })
    })

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        var username = $('#username').val();
        console.log(username)
        $.ajax({
            url: '/signup',
            data: {
                text: username         
            },
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                console.log(response, 'herhehehehe')
                alert('test')
                $('#fNameTxt').val(response.username)
            },
            error: function(err) {
                console.log(err);
            }
        })
    });

    $('#signup').submit(function(e){
        e.preventDefault();
        var username = $('#username').val();
        console.log(username)
        $.ajax({
            url: '/signup',
            data: {
                text: username
         
            },
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            success: function(response) {
                alert('test')
                $('#demo').promise().done(function(arg) {
                    onsole.log(username);
                    console.log(response)
                    this.append(response.username);
                });
            },
            error: function(err) {
                console.log(err);
            }
        })
    })  
    
    




});

// $("#partloader").on("click", "#btn", function(){});
