import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import axios from 'axios';

const Register = () => {
  const { createUser, updateUser, googleLogin, facebookLogin } =
    useContext(AuthContext);

  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/users').then(data => {
      console.log(data);
      setAllUser(data.data);
    });
  }, []);

  const handleRegister = e => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    console.log(name, photo, email, password);

    createUser(email, password)
      .then(result => {
        updateUser(name, photo);
        const user = result.user;
        const createDate = user.metadata?.creationTime;
        const signInTime = user.metadata?.lastSignInTime;

        const userData = { name, email, createDate, signInTime };
        console.log(userData);
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
          .then(res => res.json())
          .then(data => console.log(data));
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const googleSignIn = () => {
    googleLogin()
      .then(result => {
        const user = result.user;
        const email = user.email;
        const createDate = user?.metadata?.creationTime;
        const signInTime = user?.metadata?.lastSignInTime;
        const name = user?.displayName;

        const isExist = allUser.find(newUser => newUser.email == email);
        if (isExist) {
          const userData = { email, signInTime };
          console.log(userData);
          fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then(res => res.json())
            .then(data => console.log(data));
        } else {
          const userData = { name, email, createDate, signInTime };
          console.log(userData);
          fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then(res => res.json())
            .then(data => console.log(data));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  const facebookSignIn = () => {
    facebookLogin()
      .then(result => {
        const user = result.user;
        const email = user.email;
        const createDate = user?.metadata?.creationTime;
        const signInTime = user?.metadata?.lastSignInTime;
        const name = user?.displayName;

        const isExist = allUser.find(newUser => newUser.email == email);
        if (isExist) {
          const userData = { email, signInTime };
          console.log(userData);
          fetch('http://localhost:5000/users', {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then(res => res.json())
            .then(data => console.log(data));
        } else {
          const userData = { name, email, createDate, signInTime };
          console.log(userData);
          fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(userData),
          })
            .then(res => res.json())
            .then(data => console.log(data));
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="hero max-w-7xl  container mx-auto  bg-base-200 my-16">
      <div className="hero-content w-1/2 mx-auto flex-col ">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">PhotoURL</span>
              </label>
              <input
                name="photo"
                type="text"
                placeholder="PhotoURL"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
          <div className="flex flex-col justify-center items-center w-full mb-5 px-5">
            <button
              onClick={googleSignIn}
              className="btn bg-blue-600 mb-3 text-white"
            >
              Continue with Google
            </button>
            <button
              onClick={facebookSignIn}
              className="btn bg-blue-600 text-white"
            >
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
