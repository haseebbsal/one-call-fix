export enum COMPLAINT_STATUS {
  OPEN,
  RESOLVED,
}

export enum TRADES {
  PLUMBER = 1,
  ELECTRICIAN = 2,
}

export enum ROLES {
  HOMEOWNER = "HomeOwner",
  TRADESPERSON = "TradesPerson",
}

export enum HomeOwnerJobTypes {
  CURRENT = 1,
  COMPLETED = 2,
}

export enum TradesPersonProfile {
  PROFILE = 1,
  Reviews,
  Offer
}


export enum EstimatedBudget {
  Under_100 = "Under £100",
  Under_250 = "Under £250",
  Under_500 = "Under £500",
  Under_1000 = "Under £1000",
  Under_2000 = "Under £2000",
  Under_4000 = "Under £4000",
  Under_8000 = "Under £8000",
  Under_15000 = "Under £15000",
  Under_30000 = "Under £30000",
  Over_30000 = "Over £30000",
  NotSure = "Not Sure",
}

export enum JobCompletion {
  ASAP = "As Soon As Possible",
  ThisWeek = "This Week",
  WithinTwoWeeks = "Within Two Weeks",
  WithinThisMonth = "Within This Month",
  WithinNextTwoMonths = "Within The Next Two Months",
  Flexible = "Flexible",
}

export enum QuoteType {
  HomeVisit = 1, // No
  Direct = 2, // Yes
}

export enum JobTimelineType {
  Day = 1, //Days
  Hour = 2, // Hours
}

export enum TradesPersonJobTypes {
  Available = 1,
  Pending = 2,
  Shortlisted = 3,
  My = 4,
}


export enum Symbols{
  none='',
  pound='$',
  percent='%'
}