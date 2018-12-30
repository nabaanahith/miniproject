function createNewProfile(profile) {
    const formData = new FormData();//scema
    formData.append('first_name', profile.firstName);
    formData.append('last_name', profile.lastName);
    formData.append('email', profile.email);
    return fetch('http://example.com/api/v1/registration', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
}
module.exports=createNewProfile;