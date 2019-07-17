$( ".credit-push" ).on( "click", function(event) {
event.preventDefault();

          $.post('submit.php', {
           data: JSON.stringify(arr),
           action: 'doFunctionOnServer',
       })
       .done(function(data){
            $( ".product-row" ).each(function() {
            let ob = {
                ProductName:$(this).children().children(".product-name").html(),
                Modification:$(this).children().children(".product-name").html(),
                Quantity:parseInt($(this).children(".product-qv").html()),
                ProductPrice:parseInt($(this).children(".product-pr").html().replace(/[^.\d]+/g,"").replace( /^([^\.]*\.)|\./g, '$1' ),10),
            }
            arr.ProductOrder.push(ob);
        });
            console.log(data);
       })
        .fail(function(xhr, status, error) {
            console.log('Error');
        });


});
