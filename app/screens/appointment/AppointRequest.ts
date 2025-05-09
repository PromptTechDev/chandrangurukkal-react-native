export type VariableState = {
  RequestedBranch: {Id: number; name: string};
  RequestedDate: string;
  RequestedTime: string;
  SalesId: number;
  RequestedServicesOrPackages: {
    PackageId: number;
    requestedServices: {ServiceId: number}[];
  }[];
  AppointmentRequestId: number;
};

const initialState: VariableState = {
  RequestedBranch: {Id: 0, name: ''},
  RequestedDate: '',
  RequestedTime: '',
  SalesId: 0,
  RequestedServicesOrPackages: [],
  AppointmentRequestId: 0,
};

const SET_REQUESTED_BRANCH = 'SET_REQUESTED_BRANCH';
const SET_REQUESTED_DATE = 'SET_REQUESTED_DATE';
const SET_REQUESTED_TIME = 'SET_REQUESTED_TIME';
const SET_SALES_ID = 'SET_SALES_ID';
const SET_REQUESTED_SERVICES_OR_PACKAGES = 'SET_REQUESTED_SERVICES_OR_PACKAGES';
const SET_REQUEST_ID = 'SET_REQUEST_ID';
const CLEAR_ALL_VARIABLES = 'CLEAR_ALL_VARIABLES';

const AppointRequest = (
  state = initialState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case SET_REQUESTED_BRANCH:
      return {
        ...state,
        RequestedBranch: action.payload,
      };
    case SET_REQUESTED_DATE:
      return {
        ...state,
        RequestedDate: action.payload,
      };
    case SET_REQUESTED_TIME:
      return {
        ...state,
        RequestedTime: action.payload,
      };
    case SET_SALES_ID:
      return {
        ...state,
        SalesId: action.payload,
      };
    case SET_REQUESTED_SERVICES_OR_PACKAGES:
      return {
        ...state,
        RequestedServicesOrPackages: action.payload,
      };
    case SET_REQUEST_ID:
      return {
        ...state,
        AppointmentRequestId: action.payload,
      };

    case CLEAR_ALL_VARIABLES:
      return initialState;

    default:
      return state;
  }
};

export default AppointRequest;
