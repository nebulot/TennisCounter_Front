// Show error message
export const setErrorMessage = (element, message) => {
    element.parentElement.setAttribute('data-error-visible', 'true');
    element.parentElement.setAttribute('data-error', message);  
};

// Hide error message
export const hideErrorMessage = element => {
    element.parentElement.removeAttribute('data-error-visible','false');
    element.parentElement.removeAttribute('data-error');   
};

// Check input value
export function checkInputValue(regex, element, message) {
    console.log(element.value);
    if (!regex.test(element.value)) {
        setErrorMessage(element, message);
        element.classList.add('invalid');
        element.classList.remove('valid'); 
       
        
        return false;
    } 
    hideErrorMessage(element);  
    element.classList.add('valid');
    element.classList.remove('invalid');  
  
   
    return true; 
};

