export type AppointListResponse = {
    GetAllAppointmentRequestsResult: GetAllAppointmentRequestsResult;
}

export type GetAllAppointmentRequestsResult = {
    Data:    Datum[];
    Error:   boolean;
    Message: string;
}

export type Datum = {
    AppointmentDate:      string;
    AppointmentFromTime:  string;
    AppointmentId:        number;
    AppointmentNo:        string;
    AppointmentRequestId: number;
    AppointmentRequestNo: string;
    AppointmentStatus:    string;
    AppointmentToTime:    string;
    ConfirmedBranchId:    number;
    ConfirmedBranchName:  string;
    DoctorId:             number;
    DoctorName:           string;
    IsConfirmed:          boolean;
    RequestedBranchId:    number;
    RequestedBranchName:  string;
    RequestedDate:        string;
    RequestedTime:        string;
}