// JavaScript Document

window.addEventListener("DOMContentLoaded", function() {
	clearErrors();
	
	document.querySelector('[id="submit"]').addEventListener('click', validateContactForm);
});

function clearErrors() {
	//Hides all elements with class form-error
	document.querySelectorAll('.form-error').forEach(function (item) {
		item.style.display = 'none';
	});
	
	//Removes the class input-error from any element having it
	document.querySelectorAll('.input-error').forEach(function (item) {
		item.classList.remove("input-error");
	});
}

function validateContactForm(e) {
	e.preventDefault();
	
	let name = document.querySelector('[name="first-name"]');
	let surname = document.querySelector('[name="last-name"]');
	let email = document.querySelector('[name="email"]');
	let message = document.querySelector('[name="message"]');
	
	clearErrors();
	
	let formValid = true;
	
	if(name.value.length === 0) {
		document.querySelector("#name-error").style.display = 'inline-block';
		name.classList.add('input-error');
		formValid = false;
	}
	
	if(surname.value.length === 0) {
		document.querySelector("#surname-error").style.display = 'inline-block';
		surname.classList.add('input-error');
		formValid = false;
	}
	
	if(email.value.length === 0) {
		document.querySelector("#email-error").style.display = 'inline-block';
		email.classList.add('input-error');
		formValid = false;
	}
	
	if(message.value.length === 0) {
		document.querySelector("#message-error").style.display = 'inline-block';
		message.classList.add('input-error');
		formValid = false;
	}
	
	if(formValid) {
		alert('The form is valid and will be sent!');
	}
}