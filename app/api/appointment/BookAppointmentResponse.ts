export type BookAppointmentResponse = {
    BookAppointmentResult: BookAppointmentResult;
}

export type BookAppointmentResult = {
    Error:                boolean;
    Message:              string;
    objAppointmentMaster: ObjAppointmentMaster;
}

export type ObjAppointmentMaster = {
    AppointmentDate:       string;
    AppointmentFromTime:   string;
    AppointmentId:         number;
    AppointmentNo:         string;
    AppointmentToTime:     string;
    CompanyId:             number;
    DoctorId:              number;
    DoctorName:            string;
    IsConfirmed:           boolean;
    PatientId:             number;
    PatientName:           string;
    objAppointmentDetails: ObjAppointmentDetail[];
}

export type ObjAppointmentDetail = {
    AppointmentId: number;
    Nos:           number;
    PackageCode:   string;
    PackageId:     number;
    PackageName:   string;
    ServiceCode:   string;
    ServiceId:     number;
    ServiceName:   string;
    Type:          string;
}
