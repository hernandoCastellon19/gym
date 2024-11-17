export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: MembershipType;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'inactive';
}

export type MembershipType = 'basic' | 'premium' | 'platinum';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  name: string;
}