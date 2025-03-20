/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ContentLayout } from "@/components/content-layout";
import DemoLayout from "@/layouts/layout";
import React, { useEffect, useState } from "react";
import MaterialActionsTable from "@/components/MaterialActionsTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { User, userColumns, userData } from "@/columnDef/verifiers";
import { LockKeyhole, Plus, TrashIcon, UnlockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DashboardTable = () => {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blockUserModalOpen, setBlockUserModalOpen] = useState(false);
  const [unblockUserModalOpen, setUnblockUserModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const handleFetchUsers = async () => {
    try {
      setLoading(true);
      setUsersData(userData);
    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async () => {
    try {
      toast({
        title: "Success",
        description: `✅ User blocked successfully.`,
      });
      handleFetchUsers();
      setBlockUserModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "❌ Failed to block user.",
      });
    }
  };

  const handleUnblock = async () => {
    try {
      toast({
        title: "Success",
        description: `✅ User unblocked successfully.`,
      });
      handleFetchUsers();
      setUnblockUserModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "❌ Failed to unblock user.",
      });
    }
  };
  const handleDelete = async () => {
    try {
      toast({
        title: "Success",
        description: `✅ User deleted successfully.`,
      });
      handleFetchUsers();
      setDeleteUserModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "❌ Failed to delete user.",
      });
    }
  };

  useEffect(() => {
    handleFetchUsers();
    const intervalId = setInterval(handleFetchUsers, 300000); // fetch every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  // Define RowAction interface to match MaterialActionsTable expectations
  interface RowAction<T = any> {
    name: string;
    icon: React.ReactNode;
    onClick: (rowData: T) => void;
  }

  const rowActions: RowAction<User>[] = [
    {
      name: "Unblock",
      icon: <UnlockKeyhole className="text-green-500" />,
      onClick: (rowData: User) => {
        setSelectedUser(rowData);
        setUnblockUserModalOpen(true);
      },
    },
    {
      name: "Block",
      icon: <LockKeyhole className="text-red-500" />,
      onClick: (rowData: User) => {
        setSelectedUser(rowData);
        setBlockUserModalOpen(true);
      },
    },
    {
      name: "Delete",
      icon: <TrashIcon className="text-red-500" />,
      onClick: (rowData: User) => {
        setSelectedUser(rowData);
        setDeleteUserModalOpen(true);
      },
    },
  ];

  return (
    <div className=" pt-8 pb-8 px-4 sm:px-8">
      <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
        {/* Dropdown Menu */}
        <Select>
          <SelectTrigger className="w-full sm:w-[180px] h-[48px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active Verifiers</SelectItem>
            <SelectItem value="pending">Pending Verifiers</SelectItem>
            <SelectItem value="deactivated">Deactivated Verifiers</SelectItem>
          </SelectContent>
        </Select>

        {/* Input and Button Container */}
        <div className="flex flex-wrap w-full sm:w-auto items-center gap-2 sm:gap-4">
          <Input
            className="h-[48px] w-full sm:w-[240px]"
            placeholder="Name / Phone no / Location"
          />
          <Button className="h-[48px] w-full sm:w-auto bg-[#039BF0] hover:bg-blue-600 flex items-center">
            <Plus className="mr-2" /> Add New Verifier
          </Button>
        </div>
      </div>

      <MaterialActionsTable
        data={userData}
        isLoading={loading}
        columns={userColumns}
        // @ts-expect-error - mRT table
        rowActions={rowActions}
      />

      {/* Block User Modal */}
      {blockUserModalOpen && (
        <Dialog
          open={blockUserModalOpen}
          onOpenChange={() => setBlockUserModalOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center">
                Confirm User Block
              </DialogTitle>
              <DialogDescription>
                <p className="flex items-center justify-center">
                  Are you sure you want to block this user?
                </p>
                {selectedUser && (
                  <div className="my-5 flex flex-col gap-2">
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Username:</span>
                      <span className="value">{selectedUser.firstName}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Phone Number:</span>
                      <span className="value">
                        {selectedUser.phoneNumber || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Partner:</span>
                      <span className="value">
                        {selectedUser.partner || "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setBlockUserModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-red-700" onClick={handleBlock}>
                  Block User
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {/* Unblock User Modal */}
      {unblockUserModalOpen && (
        <Dialog
          open={unblockUserModalOpen}
          onOpenChange={() => setUnblockUserModalOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center">
                Confirm User Unblock
              </DialogTitle>
              <DialogDescription>
                <p className="flex items-center justify-center">
                  Are you sure you want to unblock this user?
                </p>
                {selectedUser && (
                  <div className="my-5 flex flex-col gap-2">
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Username:</span>
                      <span className="value">{selectedUser.firstName}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Phone Number:</span>
                      <span className="value">
                        {selectedUser.phoneNumber || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Partner:</span>
                      <span className="value">
                        {selectedUser.partner || "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setUnblockUserModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green-800 hover:bg-green-700"
                  onClick={handleUnblock}
                >
                  Unblock User
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete User Modal */}
      {deleteUserModalOpen && (
        <Dialog
          open={deleteUserModalOpen}
          onOpenChange={() => setDeleteUserModalOpen(false)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center">
                Confirm User Deletion
              </DialogTitle>
              <DialogDescription>
                <p className="flex items-center justify-center">
                  Are you sure you want to delete this user? This action cannot
                  be undone.
                </p>
                {selectedUser && (
                  <div className="my-5 flex flex-col gap-2">
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Username:</span>
                      <span className="value">{selectedUser.firstName}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Phone Number:</span>
                      <span className="value">
                        {selectedUser.phoneNumber || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="font-bold">Partner:</span>
                      <span className="value">
                        {selectedUser.partner || "N/A"}
                      </span>
                    </p>
                  </div>
                )}
              </DialogDescription>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDeleteUserModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-red-700" onClick={handleDelete}>
                  Delete User
                </Button>
              </DialogFooter>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
const page = () => {
  return (
    <DemoLayout>
      <ContentLayout title="Verifiers">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/verifiers">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Verifiers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </ContentLayout>
      <DashboardTable />
    </DemoLayout>
  );
};

export default page;
