const registrationState = {
  userPhoto: 'https://i.dlpng.com/static/png/1244305--profile-png-512_512_preview.png',
  userName: 'Mark',
  userEmail: '',
  userPassword: '',
  userGender: '',
  userInterests: '',
  userHelp: ''
};

export const registrationReducer = (state = registrationState, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'ADD_USEREMAIL': {
      newState.userEmail = action.email;
      break;
    }
    case 'ADD_USERNAME': {
      newState.userName = 'Mark';
      break;
    }
    case 'ADD_USERPHOTO': {
      newState.userPhoto = action.photo;
      break;
    }
    case 'ADD_USERPASSWORD': {
      newState.userPassword = action.password;
      break;
    }
    case 'ADD_USERGENDER': {
      newState.userGender = action.gender;
      break;
    }
    case 'ADD_USERINTERESTS': {
      newState.userInterests = action.interests;
      break;
    }
    case 'ADD_USERHELP': {
      newState.userHelp = action.help;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
