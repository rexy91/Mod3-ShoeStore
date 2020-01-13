// Code your solution here
const shoes_url = "http://localhost:3000/shoes"
const shoe_list = document.querySelector('#shoe-list')
const form_container = document.querySelector('#form-container')
const review_ul = document.querySelector('#reviews-list')

function fetchShoes(){  

    // Returns promise
    return fetch(shoes_url)
    .then(res => res.json())

}

// Show one shoe for container

    fetch("http://localhost:3000/shoes/1")
    .then(res => res.json())
    .then(firstShoeObj => {
    
        const shoeImg = document.querySelector('#shoe-image')
        shoeImg.src = firstShoeObj.image
        const shoeName = document.querySelector('#shoe-name')
        shoeName.innerText = firstShoeObj.name
        const shoeDes = document.querySelector('#shoe-description')
        shoeDes.innerText = firstShoeObj.description

    })


//show shoes

fetchShoes()
.then(shoe_objects => {

    shoe_objects.forEach(shoe => {
        showShoesOnBar(shoe)
        
    })
   
})

// Create the form 

const review_form = document.createElement('form')
const content_input = document.createElement('input')
content_input.placeholder = 'reviews'
content_input.id = 'review-content'

const submit = document.createElement('input')
submit.type = 'submit'


// ONLY FORM can have form eventlistener, not the div.

review_form.append(content_input, submit)
form_container.append(review_form)


//  render functions

function showShoesOnBar(shoe){

    const shoeLi = document.createElement('li')
    shoeLi.innerText = shoe.name 
    shoe_list.append(shoeLi)

    // reviews
    shoe.reviews.forEach(review => {
   
    const review_li = document.createElement('li')
        review_li.innerText = review
    review_ul.append(review_li)

})


    shoeLi.addEventListener('click', e => {
        const shoeImg = document.querySelector('#shoe-image')
        shoeImg.src = shoe.image
        const shoeName = document.querySelector('#shoe-name')
        shoeName.innerText = shoe.name
        const shoeDes = document.querySelector('#shoe-description')
        shoeDes.innerText = shoe.description
        
         //Form submit
         review_form.addEventListener('submit', e => {
            e.preventDefault()
           
            // new_review = {'id': shoe.id, 'content': e.target['review-content'].value}
            new_review = e.target['review-content'].value
            reviews_array = shoe.reviews
            reviews_array.push(new_review)
     
            fetch(`http://localhost:3000/shoes/${shoe.id}/reviews`,{

                method: 'POST',
                headers:{
                    "Content-Type": 'application/json',
                    Accept:'application/json'
                },
                body: JSON.stringify({
                    content: new_review
                })
            }) // end of POST
            .then(res => res.json())
            .then(shoe_obj => {
                console.log(shoe_obj.content)
                // reviewOnDOM(shoe_obj)
            })
            
      }) 
        
    })

    function reviewOnDOM(obj){
        const review_li = document.createElement('li')
                review_li.innerText = obj.content
                review_ul.append(review_li)
    }
}







