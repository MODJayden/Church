import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  Plus,
  Users,
  Eye,
  Loader2,
  DoorOpen,
  Search,
  Gauge,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {
  addGate,
  getAllGates,
  updateGate,
  deleteGate,
  addGateMember,
  deleteGateMember,
} from "../../../store/gateSlice";

const AddGate = () => {
  // State management
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGateId, setCurrentGateId] = useState(null);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [selectedGate, setSelectedGate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { gates, isLoading } = useSelector((state) => state.gate);
  const dispatch = useDispatch();

  // Sample data - replace with API calls
  const [newGate, setNewGate] = useState({
    name: "",
    description: "",
    meetingTime: "",
    location: "",
    gateLeader: "",
    gateMembers: [],
  });

  useEffect(() => {
    dispatch(getAllGates()).then((res) => {
      console.log(res);
    });
  }, [dispatch]);

  const [newMember, setNewMember] = useState({
    name: "",
  });

  // Filter gates based on search term
  const filteredGates = gates?.filter(
    (gate) =>
      gate?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gate?.gateLeader?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gate?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGate((prev) => ({ ...prev, [name]: value }));
  };

  const handleMemberInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission for gate
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEditMode) {
      // Update existing gate
      dispatch(updateGate({ data: newGate, id: currentGateId })).then((res) => {
        if (res?.payload?.success) {
          dispatch(getAllGates());
          toast("Gate updated successfully");
        }
      });
    } else {
      // Create new gate
      dispatch(addGate(newGate)).then((res) => {
        console.log(res);
        if (res?.payload?.success) {
          dispatch(getAllGates())
          toast("Gate created successfully");
        }
      });
    }

    resetForm();
    setIsSubmitting(false);
  };

  // Add new member to gate
  const handleAddMember = (e) => {
    e.preventDefault();
    dispatch(addGateMember({ data: newMember.name, id: selectedGate._id })).then((res) => {
      if (res?.payload?.success) {
        dispatch(getAllGates());
        toast("Member added successfully");
      }
    });
    setNewMember({ name: ""});
    setIsMemberDialogOpen(false);
  };

  // Edit gate

  const handleEditGate = (gate) => {
    setIsEditMode(true);
    setCurrentGateId(gate._id);
    setNewGate({
      name: gate?.name || "",
      description: gate?.description || "",
      meetingTime: gate?.meetingTime || "",
      location: gate?.location || "",
      gateLeader: gate?.gateLeader || "",
      gateMembers: gate?.gateMembers || [], // Preserve existing members
    });
    setIsSheetOpen(true);
  };

  // Delete gate
  const handleDeleteGate = (id) => {
    dispatch(deleteGate(id)).then((res) => {
      console.log(res);
      
      if (res?.payload?.success) {
        dispatch(getAllGates());
        toast("Gate deleted successfully");
      }
    });
  };
  const handleDeleteMember = (index) => {
    dispatch(deleteGateMember({ gateId: selectedGate._id, index })).then((res) => {
      console.log(res);
      
      if (res?.payload?.success) {
        dispatch(getAllGates());
        toast("Member deleted successfully");
        setIsMemberDialogOpen(false);
      }
    });
  };

  // Reset form
  const resetForm = () => {
    setNewGate({
      name: "",
      description: "",
      meetingTime: "",
      location: "",
      gateLeader: "",
    });
    setIsEditMode(false);
    setCurrentGateId(null);
    setIsSheetOpen(false);
  };

  // Calculate statistics
  const calculateStats = () => {
    return {
      totalGates: gates?.length,
      totalMembers: gates?.reduce(
        (sum, gate) => sum + gate?.gateMembers?.length,
        0
      ),
      avgMembers:
        Math.round(
          gates?.reduce((sum, gate) => sum + gate?.gateMembers?.length, 0) /
            gates?.length
        ) || 0,
      mostActive:
        gates?.reduce(
          (max, gate) => (gate?.gateMembers?.length > max.gateMembers ? gate : max),
          {
            members: 0,
          }
        ).name || "None",
    };
  };

  const stats = calculateStats();

  return (
    <section className="bg-white py-24 md:py-24">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex items-center gap-3">
            <DoorOpen className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
              Church Gates
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search gates..."
                className="pl-9 w-full sm:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Add Gate Button */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Gate
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <div className="p-8">
                  <SheetHeader>
                    <SheetTitle>
                      {isEditMode ? "Edit Gate" : "Create New Gate"}
                    </SheetTitle>
                  </SheetHeader>

                  {/* Gate Creation/Edit Form */}
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    {/* Form fields same as before */}

                    <div>
                      <Label className={"py-1.5"} htmlFor="name">
                        Gate Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={newGate.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <Label className={"py-1.5"} htmlFor="description">
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newGate.description}
                        onChange={handleInputChange}
                        rows={3}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className={"py-1.5"} htmlFor="meetingTime">
                          Meeting Time *
                        </Label>
                        <Input
                          id="meetingTime"
                          name="meetingTime"
                          value={newGate.meetingTime}
                          onChange={handleInputChange}
                          placeholder="e.g. Every Friday, 6:00 PM"
                          required
                        />
                      </div>

                      <div>
                        <Label className={"py-1.5"} htmlFor="location">
                          Location *
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          value={newGate.location}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label className={"py-1.5"} htmlFor="gateLeader">
                        Gate Leader *
                      </Label>
                      <Input
                        id="gateLeader"
                        name="gateLeader"
                        value={newGate.gateLeader}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetForm}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEditMode ? "Updating..." : "Creating..."}
                          </>
                        ) : isEditMode ? (
                          "Update Gate"
                        ) : (
                          "Create Gate"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border rounded-lg p-4 bg-blue-50">
            <div className="flex items-center gap-3">
              <Gauge className="h-6 w-6 text-blue-600" />
              <h3 className="font-medium">Total Gates</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.totalGates}</p>
          </div>

          <div className="border rounded-lg p-4 bg-green-50">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <h3 className="font-medium">Total Members</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.totalMembers}</p>
          </div>

          <div className="border rounded-lg p-4 bg-purple-50">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-purple-600" />
              <h3 className="font-medium">Avg Members/Gate</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{stats.avgMembers}</p>
          </div>

          <div className="border rounded-lg p-4 bg-yellow-50">
            <div className="flex items-center gap-3">
              <DoorOpen className="h-6 w-6 text-yellow-600" />
              <h3 className="font-medium">Most Active Gate</h3>
            </div>
            <p className="text-xl font-bold mt-2 truncate">
              {stats.mostActive}
            </p>
          </div>
        </div>

        {/* Gates List */}
        <div className="space-y-6">
          {filteredGates.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <DoorOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                {searchTerm
                  ? "No matching gates found"
                  : "No gates created yet"}
              </h3>
              {!searchTerm && (
                <p className="mt-1 text-gray-500">
                  Get started by creating your first church gate.
                </p>
              )}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead>Gate Name</TableHead>
                    <TableHead>Leader</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredGates.map((gate) => (
                    <TableRow key={gate.id}>
                      <TableCell className="font-medium">{gate.name}</TableCell>
                      <TableCell>{gate.gateLeader}</TableCell>
                      <TableCell>{gate.location}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700"
                        >
                          {gate.gateMembers?.length} members
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedGate(gate);
                            setIsMemberDialogOpen(true);
                          }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Members
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditGate(gate)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGate(gate._id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Member Management Dialog */}
        <Dialog open={isMemberDialogOpen} onOpenChange={setIsMemberDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>
                {selectedGate?.name} Members ({selectedGate?.gateMembers?.length})
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Add Member Form */}
              <form  className="flex gap-2">
                <Input
                  name="name"
                  value={newMember.name}
                  onChange={handleMemberInputChange}
                  placeholder="Member name"
                  required
                  className="flex-1"
                />
               
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700" onClick={handleAddMember}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </form>

              {/* Members List */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedGate?.gateMembers?.map((member,index) => (
                      <TableRow key={index}>
                        <TableCell>{member}</TableCell>
                       
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Attendance Statistics */}
             {/*  <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Weekly</p>
                  <p className="text-xl font-bold">
                    {selectedGate?.attendance.weekly}
                  </p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Monthly</p>
                  <p className="text-xl font-bold">
                    {selectedGate?.attendance.monthly}
                  </p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">Yearly</p>
                  <p className="text-xl font-bold">
                    {selectedGate?.attendance.yearly}
                  </p>
                </div>
              </div> */}
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={() => setIsMemberDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AddGate;
