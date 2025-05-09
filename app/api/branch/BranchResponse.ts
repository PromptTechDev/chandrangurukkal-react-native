export type BranchResponse = {
    GetAllBranchesResult: GetAllBranchesResult;
}

export type GetAllBranchesResult = {
    Data:    Datum[];
    Error:   boolean;
    Message: string;
}

export type Datum = {
    CompanyId:   number;
    CompanyName: string;
}
