import type { ReactNode } from "react";

export interface breadcrumbs {
  maintitle: ReactNode;
  title: string;
  subtitle: string;
}

export interface allCourt {
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  img: string;
}
export interface coachRequests {
  [x: string]: ReactNode;
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  img: string;
  date: string;
  time: string;
}
export interface activeCourts {
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  img: string;
  date: string;
  time: string;
}
export interface coachWallets {
  refID: string;
  transactionFor: string;
  date: string;
  time: string;
  payment: string;
  status: string;
  img: string;
}
export interface coachEarning {
  courtName: string;
  img1: string;
  img2: string;
  courtNo: string;
  bookingDate: string;
  playerName: string;
  dateTime1: string;
  dateTime2: string;
  payment: string;
  additionalGuests: string;
  paidOn: string;
  download: string;
}
export interface inactiveCourts {
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  img: string;
}
export interface userCoaches {
  coachName: ReactNode;
  bookedOn: ReactNode;
  dateAndTime: ReactNode;
  time: ReactNode;
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  img: string;
  text: string;
}
export interface userComplete {
  bookingDate: string;
  coachName: string;
  courtName: string;
  courtNo: string;
  date: string;
  time: string;
  payment: string;
  details: string;
  status: string;
  img: string;
}
export interface userInvoice {
  id: string;
  courtName: string;
  courtNo: string;
  date: string;
  time: string;
  payment: string;
  paidOn: string;
  status: string;
  download: string;
  img: string;
}
export interface userOngoing {
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  court: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  image: string;
  content: string;
  date: string;
  time: string;
  bookingtype: string;
  coachName: string;
  image2: string;
  bookeddata: string;
}
export interface userCancelledInterface {
  img: string;
  courtName: string;
  courtNo: string;
  location: string;
  amount: string;
  court: string;
  maxGuest: string;
  additionalGuests: string;
  addedOn: string;
  details: string;
  status: string;
  image: string;
  content: string;
  date: string;
  time: string;
  bookingtype: string;
  coachName: string;
  image2: string;
  bookeddata: string;
}
