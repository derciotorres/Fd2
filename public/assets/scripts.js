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

    // $('#signup').submit(function(e){
    //     e.preventDefault();
    //     var username = $('#login-username').val();
    //     console.log(username)
    //     $.ajax({
    //         url: '/signup',
    //         data: {
    //             username: username
    //         },
    //         method: 'POST',
    //         contentType: 'application/x-www-form-urlencoded',
    //         success: function(response) {
    //             alert('test')
    //             $('#demo').promise().done(function(arg) {
    //                 console.log(response)
    //                 this.append(response.username);
    //             });
    //         },
    //         error: function(err) {
    //             console.log(err);
    //         }
    //     })
    // })   
});

// $("#partloader").on("click", "#btn", function(){});
