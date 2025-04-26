import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gift, Cross, Hammer, Wallet, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast }  from "sonner";


const Giving = () => {
  const [formData, setFormData] = useState({
    type: "tithe",
    amount: "",
    paymentMethod: "mobile",
    project: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sample projects - replace with your actual projects
  const projects = [
    { id: "building", name: "Church Building Project" },
    { id: "missions", name: "Missions Fund" },
    { id: "youth", name: "Youth Ministry" },
    { id: "outreach", name: "Community Outreach" },
  ];

  const paymentMethods = [
    { id: "mobile", name: "Mobile Money" },
    { id: "bank", name: "Bank Transfer" },
    { id: "card", name: "Credit/Debit Card" },
    { id: "cash", name: "Cash" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Giving submitted:", formData);
      setIsSubmitting(false);
      setFormData({
        type: "tithe",
        amount: "",
        paymentMethod: "mobile",
        project: "",
        message: "",
      });

      toast({
        title: "Thank you for your giving!",
        description: "Your contribution has been received successfully.",
        action: <CheckCircle className="text-green-500" />,
      });
    }, 1500);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-blue-500">
              Give to the Ministry
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a cheerful
            giver." - 2 Corinthians 9:7
          </p>
        </div>

        {/* Giving Form */}
        <div className="bg-gray-50 rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Giving Type */}
            <div>
              <Label className="block mb-4">What would you like to give?</Label>
              <RadioGroup
                defaultValue="tithe"
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
                value={formData.type}
              >
                <div>
                  <RadioGroupItem
                    value="tithe"
                    id="tithe"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="tithe"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
                  >
                    <Cross className="h-6 w-6 mb-2 text-blue-500" />
                    <span>Tithe (10%)</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="offering"
                    id="offering"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="offering"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
                  >
                    <Wallet className="h-6 w-6 mb-2 text-blue-500" />
                    <span>Offering</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="project"
                    id="project"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="project"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 bg-white p-4 hover:bg-gray-50 hover:text-gray-900 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50"
                  >
                    <Hammer className="h-6 w-6 mb-2 text-blue-500" />
                    <span>Project</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Project Selection (conditional) */}
            {formData.type === "project" && (
              <div>
                <Label htmlFor="project">Select Project *</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, project: value }))
                  }
                  value={formData.project}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount *</Label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  ₵
                </span>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  className="pl-8"
                  placeholder="0.00"
                  required
                  min="1"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label htmlFor="paymentMethod">Payment Method *</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, paymentMethod: value }))
                }
                value={formData.paymentMethod}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.id} value={method.id}>
                      {method.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Special Instructions */}
            <div>
              <Label htmlFor="message">Special Instructions (Optional)</Label>
              <Input
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="E.g. For thanksgiving offering"
              />
            </div>

            {/* Submission */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Give Now"
                )}
              </Button>
            </div>

            {/* Security Note */}
            <p className="text-sm text-gray-500 text-center">
              All transactions are secure and encrypted. Your giving records are
              kept confidential.
            </p>
          </form>
        </div>

        {/* Giving Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-6 text-center">
            <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Cross className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">Tithes</h3>
            <p className="text-gray-600 text-sm">
              Faithfully returning 10% of your income to honor God and support
              the church.
            </p>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">Offerings</h3>
            <p className="text-gray-600 text-sm">
              Voluntary gifts beyond tithes to support various ministries and
              needs.
            </p>
          </div>
          <div className="border rounded-lg p-6 text-center">
            <div className="bg-blue-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Hammer className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="font-bold mb-2">Projects</h3>
            <p className="text-gray-600 text-sm">
              Specific initiatives like building funds, missions, and outreach
              programs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Giving;
