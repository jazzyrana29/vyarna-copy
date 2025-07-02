export class ContactLinksDto {
  bounceLogs: string;
  contactAutomations: string;
  contactData: string;
  contactGoals: string;
  contactLists: string;
  contactLogs: string;
  contactTags: string;
  contactDeals: string;
  deals: string;
  fieldValues: string;
  geoIps: string;
  notes: string;
  organization: string;
  plusAppend: string;
  trackingLogs: string;
  scoreValues: string;
  accountContacts: string;
  automationEntryCounts: string;
}

export class ContactDto {
  email: string;
  firstName: string;
  lastName: string;
  cdate: string;
  udate: string;
  phone: string;
  orgid: string;
  orgname: string;
  links: ContactLinksDto;
  id: string;
  organization: any;
}

export class ContactResponseDto {
  contact: ContactDto;
}
