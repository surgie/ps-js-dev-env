import './index.css';
import { getUsers, deleteUser } from './api/userApi';

getUsers().then(results => {
    let usersBody = '';

    results.forEach(user => {
        usersBody += `
            <tr>
                <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
            </tr>
        `;
    });

    global.document.getElementById('users').innerHTML = usersBody;

    const deleteLinks = global.document.getElementsByClassName('deleteUser');

    Array.from(deleteLinks, link => {
        link.onclick = function (event) {
            const el = event.target;
            event.preventDefault();
            deleteUser(el.attributes['data-id'].value);
            const row = el.parentNode.parentNode;
            row.parentNode.removeChild(row);
        };
    });
});
