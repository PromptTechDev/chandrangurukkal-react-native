export type PurchaseResponse = {
    GetPurchaseListResult: GetPurchaseListResult;
}

export type GetPurchaseListResult = {
    Message:           string;
    Error:             boolean;
    PatientId:         number;
    PurchasedPackages: PurchasedPackage[];
}

export type PurchasedPackage = {
    SalesId:     number;
    BillDate:    string;
    PackageId:   number;
    PackageName: string;
    Status:      string;
}