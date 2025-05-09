export type MasterResponse = {
    SetMasterDataResult: SetMasterDataResult;
}

export type SetMasterDataResult = {
    Data:    Data;
    Error:   boolean;
    Message: string;
}

export type Data = {
    CompanyDetails: CompanyDetails;
}

export type CompanyDetails = {
    AddressLine1:         string;
    AddressLine2:         string;
    AddressLine3:         string;
    AllowNegetiveStock:   boolean;
    AppointmentEndTime:   string;
    AppointmentInterval:  number;
    AppointmentStartTime: string;
    BillComments:         string;
    BillFooter:           string;
    BillHeader:           string;
    BranchName:           string;
    City:                 string;
    Country:              string;
    DecimalPoints:        number;
    Email:                string;
    EnableLogoOnPrint:    boolean;
    Fax:                  string;
    IsDiscountVisible:    null;
    IsSellingPriceEdit:   boolean;
    IsValidateInclusive:  boolean;
    Landline:             string;
    Logo:                 null;
    Mobile:               string;
    Name:                 string;
    State:                string;
    TRN:                  string;
    TaxApplicable:        boolean;
    ValidateCutoffRate:   boolean;
    ValidateMrp:          boolean;
    WebSite:              string;
}
