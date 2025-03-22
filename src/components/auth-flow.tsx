"use client";

import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import PendingModal from "./auth/pending-modal";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Upload } from "lucide-react";

const businessInfoSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessEmail: z.string().email("Please enter a valid email address"),
  businessPhone: z.string().min(1, "Business phone is required"),
  businessCategory: z.string().min(1, "Please select a business category"),
  accountNo: z.string().min(1, "Account number is required"),
});

const contactInfoSchema = z
  .object({
    houseNumber: z.string().min(1, "House number is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    contactName: z.string().min(1, "Contact name is required"),
    contactPhone: z.string().min(1, "Contact phone is required"),
    contactEmail: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type BusinessInfoSchema = z.infer<typeof businessInfoSchema>;
type ContactInfoSchema = z.infer<typeof contactInfoSchema>;

const XpressRewardsSignup: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showPendingModal, setShowPendingModal] = useState<boolean>(false);
  const [logo, setLogo] = useState<File | null>(null);

  // Form for step 1
  const businessInfoForm = useForm<BusinessInfoSchema>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      businessCategory: "",
      accountNo: "",
    },
  });

  // Form for step 2
  const contactInfoForm = useForm<ContactInfoSchema>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      houseNumber: "",
      street: "",
      city: "",
      state: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && files[0].size <= 10 * 1024 * 1024) {
      // 10MB limit
      setLogo(files[0]);
    } else {
      toast({
        title: "File Size Error",
        description: "File size exceeds 10MB limit",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setLogo(file);
    } else {
      toast({
        title: "File Size Error",
        description: "File size exceeds 10MB limit",
      });
    }
  };

  const onBusinessInfoSubmit = () => {
    setCurrentStep(2);
  };

  const onContactInfoSubmit = (contactData: ContactInfoSchema) => {
    const combinedData = {
      ...businessInfoForm.getValues(),
      ...contactData,
      logo,
    };

    console.log("Form submitted:", combinedData);
    setShowPendingModal(true);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleModalClose = () => {
    setShowPendingModal(false);
    router.push("/signin");
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#039BF0] mb-1">
        Welcome to Xpress Rewards
      </h2>
      <p className="text-gray-600 mb-6">
        Complete the form below to get started
      </p>

      {currentStep === 1 ? (
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-[#039BF0]">
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...businessInfoForm}>
              <form
                onSubmit={businessInfoForm.handleSubmit(onBusinessInfoSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={businessInfoForm.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="businessEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter business email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="businessPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter business phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="businessCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="food">Food & Beverage</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={businessInfoForm.control}
                  name="accountNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account No</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Image (Logo)</FormLabel>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded p-6 text-center"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex justify-center mb-4">
                      <Upload className="w-12 h-12 text-[#039BF0]" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag here or click the button below to upload
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
                      className="inline-flex items-center"
                    >
                      Choose file
                    </Button>
                    <input
                      type="file"
                      id="fileInput"
                      className="hidden"
                      accept="image/jpeg"
                      onChange={handleFileChange}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Maximum upload size: 10MB (.jpg)
                    </p>
                    {logo && (
                      <p className="text-sm text-green-600 mt-2">
                        File selected: {logo.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-8">
                  <Button className="bg-[#039BF0]" type="submit">
                    Next
                  </Button>
                  <span className="text-gray-500">Step 1 of 2</span>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-none shadow-none">
          <CardContent>
            <Form {...contactInfoForm}>
              <form
                onSubmit={contactInfoForm.handleSubmit(onContactInfoSubmit)}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-[#039BF0] font-medium mb-4">
                    Business Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={contactInfoForm.control}
                      name="houseNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>House Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter house number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactInfoForm.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter street" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormField
                      control={contactInfoForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={contactInfoForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Lagos">Lagos</SelectItem>
                              <SelectItem value="Abuja">Abuja</SelectItem>
                              <SelectItem value="Ogun">Ogun</SelectItem>
                              {/* Add more states as needed */}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-[#039BF0] font-medium mb-4">
                    Contact Person Information
                  </h3>

                  <FormField
                    control={contactInfoForm.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter contact name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactInfoForm.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Contact Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Enter contact phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactInfoForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Contact Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter contact email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-[#039BF0] font-medium mb-4">Password</h3>

                  <FormField
                    control={contactInfoForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={contactInfoForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center justify-between mt-8">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button className="bg-[#039BF0]" type="submit">
                      Submit
                    </Button>
                  </div>
                  <span className="text-gray-500">Step 2 of 2</span>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      <PendingModal isOpen={showPendingModal} onClose={handleModalClose} />
    </div>
  );
};

export default XpressRewardsSignup;
