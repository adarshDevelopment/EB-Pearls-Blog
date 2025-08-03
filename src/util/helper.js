/*
  generates a random string 
  parameters: 
    - length: the length of the random string to  generate
    
  returns: 
    a random string
*/
const generateRandomString = (length = 150) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = ''; 
  for (let i = 0; i <= length; i++ ) {
    // selcts the nth position of `chars` which is calculated by multipling the lenght by a random number between 0-1 and using the same number without decimals
    result +=chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


module.exports = {
  generateRandomString
}

