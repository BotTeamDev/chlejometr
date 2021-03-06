import { updateUserData, wrongLoginData, wrongSignUpData } from '../actions/index.js';

const { createApolloFetch } = require('apollo-fetch');

const fetch = createApolloFetch({
  uri: '/graphql'
});

export const user = dispatch => (
  state = {
    email: '',
    username: '',
    loginError: ''
  },
  { type, email, password, username, data, value, optionToChange, history, status }
) => {
  switch (type) {
    case 'LOG_IN': {
      fetch({
        //(XˣᴰkurwaˣᴰDˣᴰ)ˣᴰ
        query: `mutation {
          loginUser(email:"${email}" password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        if (res.data.loginUser?.status === 'SUCCESS') {
          history.push('/home');
          dispatch(updateUserData(res.data.loginUser));
        } else {
          dispatch(wrongLoginData());
        }
      });
      return { ...state };
    }

    case 'LOG_OUT': {
      fetch({
        query: `mutation{
          logOut
        }`
      });
      return { ...state };
    }

    case 'SIGN_UP': {
      fetch({
        query: `mutation {
          registerUser(username:"${username}" email:"${email}" password:"${password}"){
            status
            username
            email
          }
        }`
      }).then(res => {
        if (res.data.registerUser?.status === 'SUCCESS') {
          history.push('/home');
          dispatch(updateUserData(res.data.registerUser));
        } else {
          dispatch(wrongSignUpData(res.data.registerUser.status));
        }
      });
      return { ...state };
    }

    case 'WRONG_LOGIN_DATA': {
      state.loginError = 'Wrong email or password';
      return { ...state };
    }

    case 'ERROR_SIGN_UP': {
      if (!RegExp('.@.').test(email)) state.signUpTextError = 'Please enter a valid e-mail';
      else if (password.length < 6)
        state.signUpTextError = 'Password must have at least 6 characters';
      else state.signUpTextError = 'Username must have at least 4 characters';
      return { ...state };
    }

    case 'WRONG_SIGN_UP_DATA': {
      if (status === 'EMAIL_IS_ENGAGED') {
        state.signUpTextError = 'This email is already in use.';
      } else if (status === 'USERNAME_IS_ENGAGED') {
        state.signUpTextError = 'This username is already in use.';
      } else {
        state.signUpTextError = 'Username and email are already in use.';
      }
      return { ...state };
    }

    case 'UPDATE_USER_DATA': {
      return { ...state, ...data };
    }

    case 'CHANGE_USER_DATA': {
      // if (optionToChange === 'age' || optionToChange === 'height' || optionToChange === 'weight') {
      console.log(`mutation {
            updateUserData(${optionToChange}:${value})
          }
          `);

      fetch({
        query: `mutation {
            updateUserData(${optionToChange}:${value})
          }
          `
      }).then(res => {
        dispatch(updateUserData({ [optionToChange]: value }))
      })
      // } else {
      //   fetch({
      //     query: `mutation {
      //     uppdateUserData(${optionToChange}:"${value}")
      //   }
      //   `
      //   });
      // }
    }

    case 'GET_USER_INFO': {
      fetch({
        query: `query{
          user(email:"${state.email}"){
            _id
            email
            username
            weight
            gender
            height
            age
            isPrivate
            friends{
              username
            }
            friendInvitations{
              username
            }
          }
        }`
      }).then(res => {
        dispatch(updateUserData(res.data.user));
      });
      return { ...state };
    }

    case 'GET_INFO_ABOUT_PARTIES': {
      fetch({
        query: `query{
          parties{
            _id
            name
            isPartyOver
          }
        }`
      }).then(res => {
        dispatch(updateUserData(res.data));
      });
      return { ...state };
    }

    case 'CREATE_PARTY': {
      fetch({
        query: `mutation{
          createParty(name:"${value}")
        }`
      });
      return { ...state };
    }

    case 'CHECK_IS_USER_LOGGED': {
      fetch({
        query: `query{
          isUserLogined{
            status
            username
          }
        }`
      }).then(res => {
        if (res.data.isUserLogined.status === 'USER_IS_LOGINED') {
          dispatch(updateUserData(res.data.isUserLogined));
        } else {
          history.push('/');
        }
      });
      return { ...state };
    }

    case 'SET_PARTY_ID': {
      state.currentPartyId = value;
      return { ...state };
    }

    default:
      return state;
  }
};
