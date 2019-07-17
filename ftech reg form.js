let reg__form =document.querySelector('#popmake-784 .wpcf7-form');
let pas1 = reg__form.querySelector('.pas1 input').placeholder ='Your password';
 let pas2 = reg__form.querySelector('.pas2 input').placeholder ='Confirm password';
let submit = document.querySelector('#popmake-784 .wpcf7-submit');
let country ="";
let er__block = document.querySelector('.err__block');
fetch(' https://api.blue-lable.com/users/meta/geoip')
  .then(function(response) {
        return response.json();
   })
  .then(function(data) {
    country = data.response.country.toLowerCase();
    $("#country__list").countrySelect({
        defaultCountry: country,
        responsiveDropdown: true
            });
  })
  .catch( console.log );

			  submit.addEventListener('click', function(e){
				    let first_name = reg__form.querySelector('input[name="first-name"]').value,
                    last_name = reg__form.querySelector('input[name="last-name"]').value,
                    email = reg__form.querySelector('input[name="your-email"]').value,
                    password = reg__form.querySelector('input[name="password"]').value,
                    phone = reg__form.querySelector('input[name="phone"]').value,
                    country = reg__form.querySelector('.country.active').getAttribute('data-country-code'),
                    pas1 = reg__form.querySelector('.pas1 input').value,
                    pas2 = reg__form.querySelector('.pas2 input').value;
                    
                    if(pas1 == pas2){
                        er__block.innerHTML ="";
                            fetch('https://api.blue-lable.com/users/auth/register', {method: 'POST',body:JSON.stringify({
                                        first_name,
                                        last_name,
                                        email,
                                        password,
                                        phone,
                                        country
                                                }),headers:{'content-type': 'application/json'}})
                                                .then(function (response) {
                                                         console.log(response.status);
                                                         return response.json();
                                                })
                                                .then(function (data) {
                                                if(data.errors == null){
													document.location.href = data.response.return_url;
													}
                                            for (let value of data.errors) {
                                                er__block.innerHTML+=value +'<br>';
                                            }
                                                                console.log(data);
                                                    
                                                })
                                                .catch(function() {
                                                    
                });
                    }
                    else{
                        er__block.innerHTML ="Passwords do not match";
                    }
        
        });
			
