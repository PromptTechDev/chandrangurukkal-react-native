export type VariableState = {
  IsNetConnected: Boolean;
  PatientId: number;
  PatientName: string;
  PatientRegNo: string;
  UserEmail: string;
};

const initialState: VariableState = {
  IsNetConnected: false,
  PatientId: 0,
  PatientName: '',
  PatientRegNo: '',
  UserEmail: '',
};

const SET_NET_CONNECTION = 'SET_NET_CONNECTION';
const SET_PATIENT_ID = 'SET_PATIENT_ID';
const SET_PATIENT_NAME = 'SET_PATIENT_NAME';
const SET_PATIENT_REG_NO = 'SET_PATIENT_REG_NO';
const SET_USER_EMAIL = 'SET_USER_EMAIL';

const GlobalVariables = (
  state = initialState,
  action: {type: any; payload: any},
) => {
  switch (action.type) {
    case SET_NET_CONNECTION:
      return {
        ...state,
        IsNetConnected: action.payload,
      };

    case SET_PATIENT_ID:
      return {
        ...state,
        PatientId: action.payload,
      };

    case SET_PATIENT_NAME:
      return {
        ...state,
        PatientName: action.payload,
      };

    case SET_PATIENT_REG_NO:
      return {
        ...state,
        PatientRegNo: action.payload,
      };

    case SET_USER_EMAIL:
      return {
        ...state,
        UserEmail: action.payload,
      };

    default:
      return state;
  }
};

export default GlobalVariables;
