export type PackageResponse = {
    GetAllPackagesResult: GetAllPackagesResult;
}

export type GetAllPackagesResult = {
    Data:    Datum[];
    Error:   boolean;
    Message: string;
}

export type Datum = {
    Error:       boolean;
    ImgUrl:      string;
    Message:     string;
    PackageId:   number;
    PackageName: string;
}