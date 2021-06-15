
const passwordFieldsEqual = (match = () => {console.log("Compared password fields match")}, noMatch = () => {console.log("Compared password fields dont match")}) => {
  const passwordFieldValue = $('[name="password"]').val();
  const confirmationFieldValue = $('[name="confirmPassword"]').val();

  if(passwordFieldValue !== confirmationFieldValue){
    noMatch();
    return false;
  }

  match();
  return true;
}


const charactersIncludedInString = (string, checkedChars) => {
  let charactersIncluded = 0;
  for (char of checkedChars) {
    if(string.includes(char)) charactersIncluded++;
  }

  return charactersIncluded;
}

const minimalPasswordRequirements = (met = () => {console.log("Minimal password requirements met")}, notMet = () => {console.log("Minimal password requirements not met")}) => {

  const minimalLength = 8;
  const specialCharacters = [' ','!','"','#','$','%','&','\'','(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[','\\',']','\^','_','`','{','|','}','~']

  const passwordFieldValue = $('[name="password"]').val();

  const sufficentLength = passwordFieldValue.length >= minimalLength;
  const specialCharactersInPassword = charactersIncludedInString(passwordFieldValue, specialCharacters);

  if(!sufficentLength || specialCharactersInPassword === 0){
    notMet();
    return false;
  }

  met();
  return true;
}



$('[name="register"]').submit((event) => {
  if(passwordFieldsEqual() && minimalPasswordRequirements()) return;

  event.preventDefault();
});



$('[name="password"]').on('keyup', () => {
  passwordFieldsEqual();
  minimalPasswordRequirements();
});

$('[name="confirmPassword"]').on('keyup', () => {
  passwordFieldsEqual();
});
