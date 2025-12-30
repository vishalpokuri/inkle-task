import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { ThreeBallLoader } from "@/components/ui/ThreeBallLoader";
import { Button } from "@/components/ui/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NormalizedUserData } from "@/types/declaration";

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: NormalizedUserData | null;
  countries: string[];
  onSave?: (updatedUser: NormalizedUserData) => void;
}

export function EditCustomerModal({
  isOpen,
  onClose,
  user,
  countries,
  onSave,
}: EditCustomerModalProps) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setCountry(user.country);
    }
  }, [user]);

  const handleSave = async () => {
    if (user && name.trim()) {
      setIsSaving(true);
      try {
        const updatedUser: NormalizedUserData = {
          ...user,
          name: name.trim(),
          country,
        };

        // Make PUT request to update user
        const response = await fetch(
          `https://685013d7e7c42cfd17974a33.mockapi.io/taxes/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.trim(),
              country,
              countryId: user.countryId,
              gender: user.gender.toLowerCase(),
              entity: user.entity,
              tax: user.tax,
              requestDate: user.requestDate,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        toast.success("Customer updated successfully!");
        onSave?.(updatedUser);
        onClose();
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Failed to update customer. Please try again.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 font-reg">
        <DialogHeader className="px-6 pt-3 pb-2 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-sb">Edit Customer</DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-6 py-3 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm text-gray-700 font-reg block"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-4 py-2 border rounded-md  text-sm font-reg "
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="country"
              className="text-sm text-gray-700 font-reg block"
            >
              Country
            </label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-9 px-3 py-2 text-sm rounded-md border border-input bg-transparent font-reg flex items-center hover:bg-gray-50 cursor-pointer"
                >
                  {country || "Select country..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0 font-reg">
                <Command className="font-reg">
                  <CommandInput
                    placeholder="Search country..."
                    className="font-reg"
                  />
                  <CommandList className="max-h-[300px] overflow-y-auto">
                    <CommandEmpty className="font-reg">
                      No country found.
                    </CommandEmpty>
                    <CommandGroup className="font-reg">
                      {countries.map((countryOption) => (
                        <CommandItem
                          key={countryOption}
                          value={countryOption}
                          onSelect={(currentValue: string) => {
                            setCountry(
                              currentValue === country ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                          className="font-reg"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country === countryOption
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {countryOption}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-reg cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!name.trim() || isSaving}
            className="bg-[#5622FF] hover:bg-[#4518CC] font-reg cursor-pointer"
          >
            {isSaving ? <ThreeBallLoader /> : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
