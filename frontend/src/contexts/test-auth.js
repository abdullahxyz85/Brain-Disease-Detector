// This is a test file to demonstrate the working of auth context
// You can run this code in the browser console to test authentication

// Test login function
function testLogin() {
  const userData = {
    id: '123',
    name: 'Test User',
    email: 'test@example.com'
  };
  
  // Call login function from auth context
  const loginResult = window.authTestHelpers.login(userData);
  
  console.log('Login successful:', loginResult);
  console.log('User data stored in localStorage:', JSON.parse(localStorage.getItem('user')));
  
  return loginResult;
}

// Test signup function
function testSignup() {
  const userData = {
    id: '456',
    name: 'New User',
    email: 'new@example.com'
  };
  
  // Call signup function from auth context
  const signupResult = window.authTestHelpers.signup(userData);
  
  console.log('Signup successful:', signupResult);
  console.log('User data stored in localStorage:', JSON.parse(localStorage.getItem('user')));
  
  return signupResult;
}

// Test logout function
function testLogout() {
  // Call logout function from auth context
  const logoutResult = window.authTestHelpers.logout();
  
  console.log('Logout successful:', logoutResult);
  console.log('User data in localStorage after logout:', localStorage.getItem('user'));
  
  return logoutResult;
}

// Test updateUser function
function testUpdateUser() {
  // First login
  testLogin();
  
  const updatedData = {
    name: 'Updated Name',
    preferences: { theme: 'dark' }
  };
  
  // Call updateUser function from auth context
  const updateResult = window.authTestHelpers.updateUser(updatedData);
  
  console.log('User update successful:', updateResult);
  console.log('Updated user data in localStorage:', JSON.parse(localStorage.getItem('user')));
  
  return updateResult;
}

// Export test functions
export {
  testLogin,
  testSignup,
  testLogout,
  testUpdateUser
};
