import React, { useState } from 'react';
import { MemberForm } from './components/MemberForm';
import { MemberList } from './components/MemberList';
import { useMemberStore } from './store/useMemberStore';
import { Member } from './types';

function App() {
  const { members, addMember, updateMember, deleteMember } = useMemberStore();
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const handleSubmit = (data: Omit<Member, 'id' | 'startDate' | 'endDate' | 'status'>) => {
    if (editingMember) {
      updateMember(editingMember.id, { ...data });
      setEditingMember(null);
    } else {
      const newMember: Member = {
        ...data,
        id: crypto.randomUUID(),
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: 'active',
      };
      addMember(newMember);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h2>
                <MemberForm
                  onSubmit={handleSubmit}
                  initialData={editingMember || undefined}
                />
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Members</h2>
                <MemberList
                  members={members}
                  onEdit={setEditingMember}
                  onDelete={deleteMember}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;