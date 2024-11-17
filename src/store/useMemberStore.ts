import { create } from 'zustand';
import { Member } from '../types';

interface MemberStore {
  members: Member[];
  addMember: (member: Member) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  members: [],
  addMember: (member) =>
    set((state) => ({ members: [...state.members, member] })),
  updateMember: (id, updatedMember) =>
    set((state) => ({
      members: state.members.map((member) =>
        member.id === id ? { ...member, ...updatedMember } : member
      ),
    })),
  deleteMember: (id) =>
    set((state) => ({
      members: state.members.filter((member) => member.id !== id),
    })),
}));