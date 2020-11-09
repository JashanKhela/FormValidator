const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const response = document.getElementById('__repsonseText');


//show input error message
const showError = (input,message) => {
    const formControl = input.parentElement;
    formControl.className = '__formControl error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = '__formControl success';
};

const checkEmail = (input) => {
    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(validEmail.test(input.value.trim())){
        showSuccess(input);
    } else {
        showError(
            email,
            'Email is not valid'
        )
    }
    return validEmail.test(String(email).toLowerCase());
};

const checkRequired = (inputArray) => {
    inputArray.forEach(input => {
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`)
        }
    });
}

//get field name of input 
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


//check length 

const checkLength = (input , min , max) => {
if(input.value.length < min ){
    showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
    );
} else if (input.value.length > max ){
    showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
    ); 
} else {
    showSuccess(input);
}
}

//check match password
const matchPassword = (input1 , input2) => {
    console.log(input2.value);
    if(input2.value === ''){
        showError(input2,'lol');
    }
    if(input1.value !== input2.value){
        showError(input2,'Passwords Do Not Match');
    } else {
        if(input2.value === ''){
            showError(input2,'Please Enter A Password To Confirm');
        }else {
            showSuccess(input2);
        }
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([username , password , password2 ,email]);
    checkLength(username , 3 , 15);
    checkLength(password , 6 , 20);
    checkEmail(email);
    matchPassword(password,password2);
    let error = document.querySelector('.error');
    console.log(error)
    if(error !== null){
        response.className = '__repsonseText failed';
        response.innerText = 'Please Correct Error(s) Above';
    } else {
        response.className = '__repsonseText succeded';
        response.innerText = 'Form Submitted';
    }

});

