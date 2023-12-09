const apiBase = 'https://randomuser.me/api/'
const userCount = 500
const table = document.querySelector('#user-list')

const Users = fetch(apiBase+'?results='+userCount)
    .then(response => {return response.json()})
    .catch(err => console.log(err))

Users.then(users => {
    // console.log(users)
    tableHeader = `<thead><tr>
    <th>S/N</th>
    <th>image</th>
    <th>Fullname</th>
    <th>Age</th>
    <th>Phone</th>
    <th>Email</th>
    <th>Location</th>
    </tr></thead>`

    tbody = document.createElement('tbody')

    
    table.innerHTML = tableHeader
    let rows = ''
    
    users.results.map((User, i) =>{
        const {picture,name,phone,email,dob,location} = User //destructure the properties we want to use for each user
        rows += `<tr>
        <td>${i+1}</td>
        <td><img src='${picture.thumbnail}' class='rounded-circle'/></td>
        <td>${name.first} ${name.last}</td>
        <td>${dob.age}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>${location.street.number} ${location.city} ${location.state} ${location.country}</td>
        </tr>`

    })
    tbody.innerHTML = rows
    table.appendChild(tbody)
    $('table').DataTable({
        dom: 'Bfrtip',
        responsive:true,
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    })
    

})
