
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Field {
  name: string;
  label: string;
  type: string;
  options?: { value: string; label: string }[];
}

interface EntityModalProps {
  title: string;
  description: string;
  fields: Field[];
  onSave: (data: any) => void;
  triggerButton?: React.ReactNode;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EntityModal({
  title,
  description,
  fields,
  onSave,
  triggerButton,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen
}: EntityModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [open, setOpen] = useState(false);

  // For controlled mode
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;
  const setIsOpen = isControlled ? setControlledOpen : setOpen;

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const defaultData: Record<string, any> = {};
      fields.forEach(field => {
        defaultData[field.name] = "";
      });
      setFormData(defaultData);
    }
  }, [initialData, fields, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsOpen(false);
  };

  const content = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={field.name} className="text-right">
                {field.label}
              </Label>
              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  className="col-span-3 border rounded-md p-2"
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="col-span-3"
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );

  return triggerButton ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      {content}
    </Dialog>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {content}
    </Dialog>
  );
}
