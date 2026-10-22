/** Local responses used to preview the app while the service is unavailable. */
export const MOCK_API_ENABLED = true;

const ok = (Message = 'Demo data') => ({Error: false, Message});

export const getMockApiResponse = (endpoint: string, method: 'GET' | 'POST') => {
  const path = endpoint.split('?')[0];

  if (path === 'CustomerLogin') {
    return {CustomerLoginResult: {...ok('Demo login successful'), Email: 'demo@example.com', MobileNo: '9876543210', PatientId: 1001, PatientName: 'Demo Patient', PatientRegNo: 'CG-1001', Tocken: 'demo-token'}};
  }
  if (path === 'GetAllServices') {
    return {GetAllServicesResult: {...ok(), Data: [
      {Error: false, ImgUrl: '', Message: '', ServiceId: 1, ServiceName: 'Ayurvedic Consultation'},
      {Error: false, ImgUrl: '', Message: '', ServiceId: 2, ServiceName: 'Abhyanga Massage'},
      {Error: false, ImgUrl: '', Message: '', ServiceId: 3, ServiceName: 'Panchakarma Therapy'},
    ]}};
  }
  if (path === 'GetAllPackages') {
    return {GetAllPackagesResult: {...ok(), Data: [
      {Error: false, ImgUrl: '', Message: '', PackageId: 1, PackageName: 'Wellness Starter'},
      {Error: false, ImgUrl: '', Message: '', PackageId: 2, PackageName: 'Ayurveda Rejuvenation'},
      {Error: false, ImgUrl: '', Message: '', PackageId: 3, PackageName: 'Complete Panchakarma'},
    ]}};
  }
  if (path === 'GetAllBranches') {
    return {GetAllBranchesResult: {...ok(), Data: [
      {CompanyId: 1, CompanyName: 'Chandran Gurukkal – Kochi'},
      {CompanyId: 2, CompanyName: 'Chandran Gurukkal – Thrissur'},
    ]}};
  }
  if (path === 'SetMasterData') {
    return {SetMasterDataResult: { ...ok(), Data: {CompanyDetails: {
      AddressLine1: 'MG Road', AddressLine2: '', AddressLine3: '', AllowNegetiveStock: false,
      AppointmentEndTime: '17:00', AppointmentInterval: 30, AppointmentStartTime: '09:00',
      BillComments: '', BillFooter: '', BillHeader: '', BranchName: 'Kochi', City: 'Kochi',
      Country: 'India', DecimalPoints: 2, Email: 'care@example.com', EnableLogoOnPrint: false,
      Fax: '', IsDiscountVisible: null, IsSellingPriceEdit: false, IsValidateInclusive: false,
      Landline: '', Logo: null, Mobile: '9876543210', Name: 'Chandran Gurukkal', State: 'Kerala',
      TRN: '', TaxApplicable: false, ValidateCutoffRate: false, ValidateMrp: false, WebSite: '',
    }}}};
  }
  if (path === 'GetAllAppointmentRequests') {
    return {GetAllAppointmentRequestsResult: {...ok(), Data: [{
      AppointmentDate: '2026-10-25', AppointmentFromTime: '10:00', AppointmentId: 1,
      AppointmentNo: 'APT-1001', AppointmentRequestId: 1, AppointmentRequestNo: 'REQ-1001',
      AppointmentStatus: 'Confirmed', AppointmentToTime: '10:30', ConfirmedBranchId: 1,
      ConfirmedBranchName: 'Kochi', DoctorId: 1, DoctorName: 'Dr. Anjali', IsConfirmed: true,
      RequestedBranchId: 1, RequestedBranchName: 'Kochi', RequestedDate: '2026-10-21', RequestedTime: '10:00',
    }]}};
  }
  if (path === 'GetPurchaseList') {
    return {GetPurchaseListResult: { ...ok(), PatientId: 1001, PurchasedPackages: [
      {SalesId: 5001, BillDate: '2026-10-10', PackageId: 1, PackageName: 'Wellness Starter', Status: 'Active'},
      {SalesId: 5002, BillDate: '2026-09-22', PackageId: 2, PackageName: 'Ayurveda Rejuvenation', Status: 'Active'},
      {SalesId: 5003, BillDate: '2026-08-14', PackageId: 3, PackageName: 'Complete Panchakarma', Status: 'Completed'},
      {SalesId: 5004, BillDate: '2026-07-03', PackageId: 1, PackageName: 'Wellness Starter', Status: 'Active'},
    ]}};
  }
  if (path === 'GetPackageHistory') {
    const salesId = Number(endpoint.match(/SalesId(?:%22|\")?\s*:\s*(?:%22|\")?(\d+)/i)?.[1] ?? 5001);
    const packageDetails: Record<number, {PackageId: number; PackageConsumingHistory: Array<{SLNo: string; ConsumedDate: string; ServiceName: string; Qty: number}>; ServicePendingList: Array<{SLNo: string; ServiceId: number; ServiceName: string; TotalQty: number; ConsumedQty: number; PendingQty: number; Status: string}>}> = {
      5001: {PackageId: 1, PackageConsumingHistory: [{SLNo: '1', ConsumedDate: '2026-10-12', ServiceName: 'Ayurvedic Consultation', Qty: 1}], ServicePendingList: [
        {SLNo: '1', ServiceId: 1, ServiceName: 'Abhyanga Massage', TotalQty: 3, ConsumedQty: 1, PendingQty: 2, Status: 'Active'},
        {SLNo: '2', ServiceId: 2, ServiceName: 'Ayurvedic Consultation', TotalQty: 2, ConsumedQty: 1, PendingQty: 1, Status: 'Active'},
      ]},
      5002: {PackageId: 2, PackageConsumingHistory: [
        {SLNo: '1', ConsumedDate: '2026-10-02', ServiceName: 'Shirodhara Therapy', Qty: 1},
        {SLNo: '2', ConsumedDate: '2026-10-09', ServiceName: 'Abhyanga Massage', Qty: 1},
      ], ServicePendingList: [
        {SLNo: '1', ServiceId: 3, ServiceName: 'Shirodhara Therapy', TotalQty: 3, ConsumedQty: 1, PendingQty: 2, Status: 'Active'},
        {SLNo: '2', ServiceId: 4, ServiceName: 'Abhyanga Massage', TotalQty: 4, ConsumedQty: 1, PendingQty: 3, Status: 'Active'},
        {SLNo: '3', ServiceId: 5, ServiceName: 'Herbal Steam Bath', TotalQty: 2, ConsumedQty: 0, PendingQty: 2, Status: 'Active'},
      ]},
      5003: {PackageId: 3, PackageConsumingHistory: [
        {SLNo: '1', ConsumedDate: '2026-08-18', ServiceName: 'Panchakarma Consultation', Qty: 1},
        {SLNo: '2', ConsumedDate: '2026-08-22', ServiceName: 'Virechana Therapy', Qty: 1},
        {SLNo: '3', ConsumedDate: '2026-08-27', ServiceName: 'Abhyanga Massage', Qty: 2},
      ], ServicePendingList: [
        {SLNo: '1', ServiceId: 6, ServiceName: 'Panchakarma Consultation', TotalQty: 1, ConsumedQty: 1, PendingQty: 0, Status: 'Completed'},
        {SLNo: '2', ServiceId: 7, ServiceName: 'Virechana Therapy', TotalQty: 1, ConsumedQty: 1, PendingQty: 0, Status: 'Completed'},
        {SLNo: '3', ServiceId: 8, ServiceName: 'Abhyanga Massage', TotalQty: 2, ConsumedQty: 2, PendingQty: 0, Status: 'Completed'},
      ]},
      5004: {PackageId: 1, PackageConsumingHistory: [], ServicePendingList: [
        {SLNo: '1', ServiceId: 9, ServiceName: 'Ayurvedic Consultation', TotalQty: 1, ConsumedQty: 0, PendingQty: 1, Status: 'Active'},
        {SLNo: '2', ServiceId: 10, ServiceName: 'Abhyanga Massage', TotalQty: 3, ConsumedQty: 0, PendingQty: 3, Status: 'Active'},
      ]},
    };
    const detail = packageDetails[salesId] ?? packageDetails[5001];
    return {GetPackageHistoryResult: {...ok(), SalesId: salesId, ...detail}};
  }
  if (path.includes('ForgotPassword')) return {...ok('Demo: password reset request received')};
  if (path.includes('SignUp') || path.includes('Register')) return {SaveSignUpDetailsResult: {...ok('Demo: registration successful')}};
  if (path.includes('RequestAppointment')) return {RequestAppointmentResult: {AppointmentRequestId: 2001, AppointmentRequestNo: 'REQ-2001', ...ok('Demo: appointment requested')}};
  if (path.includes('BookAppointment')) return {BookAppointmentResult: { ...ok('Demo: appointment booked'), objAppointmentMaster: {
    AppointmentDate: '2026-10-25', AppointmentFromTime: '10:00', AppointmentId: 2001,
    AppointmentNo: 'APT-2001', AppointmentToTime: '10:30', CompanyId: 1, DoctorId: 1,
    DoctorName: 'Dr. Anjali', IsConfirmed: true, PatientId: 1001, PatientName: 'Demo Patient', objAppointmentDetails: [],
  }}};

  // Keep a useful success result for any remaining write screen in demo mode.
  return method === 'POST' ? {...ok('Demo: request completed')} : {};
};
