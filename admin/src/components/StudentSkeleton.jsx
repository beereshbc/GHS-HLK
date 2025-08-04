import { GraduationCap, Book, User } from "lucide-react";

const StudentSkeleton = () => {
  return (
    <div className="w-full max-w-md mx-auto p-4 rounded-lg bg-white animate-pulse space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
          <User className="text-gray-400" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-300 rounded w-1/2" />
        </div>
      </div>

      {/* Content line blocks */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Book className="text-gray-400" />
          <div className="h-3 bg-gray-300 rounded w-4/5" />
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="text-gray-400" />
          <div className="h-3 bg-gray-300 rounded w-3/4" />
        </div>
        <div className="flex items-center space-x-2">
          <Book className="text-gray-400" />
          <div className="h-3 bg-gray-300 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default StudentSkeleton;
