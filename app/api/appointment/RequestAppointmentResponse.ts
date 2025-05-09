export type RequestAppointmentResponse = {
    RequestAppointmentResult: RequestAppointmentResult;
}

export type RequestAppointmentResult = {
    AppointmentRequestId: number;
    AppointmentRequestNo: string;
    Error:                boolean;
    Message:              string;
}