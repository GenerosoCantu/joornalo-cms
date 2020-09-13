import axios from 'src/utils/axios';

class UserService {

  updateUser = (user) => new Promise((resolve, reject) => {
    console.log(user);
    axios.patch(`http://localhost:4000/users/${user._id}`, user)
      .then((response) => {
        console.log(response);
        if (response.data) {
          resolve(response.data);
        } else {
          reject('usr001');
        }
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response);
          // client received an error response (5xx, 4xx)
          reject('usr002');
        } else if (err.request) {
          console.log(err.request);
          reject('usr003');
          // client never received a response, or request never left
        } else {
          reject('usr004');
          // anything else
        }
      })
  })
}

const userService = new UserService();

export default userService;
