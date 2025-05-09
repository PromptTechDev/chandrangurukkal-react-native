export type PurchaseDetailsResponse = {
    GetPackageHistoryResult: PackageHistory;
}

export type PackageHistory = {
    Message:                 string;
    Error:                   boolean;
    SalesId:                 number;
    PackageId:               number;
    PackageConsumingHistory: PackageConsumingHistory[];
    ServicePendingList:      ServicePendingList[];
}

export type PackageConsumingHistory = {
    SLNo:         string;
    ConsumedDate: string;
    ServiceName:  string;
    Qty:          number;
}

export type ServicePendingList = {
    SLNo:        string;
    ServiceId:   number;
    ServiceName: string;
    TotalQty:    number;
    ConsumedQty: number;
    PendingQty:  number;
    Status:      string;
}
